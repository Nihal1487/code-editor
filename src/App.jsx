import { useState, useRef, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import CodeEditor from "./components/CodeEditor";
import FileExplorer from "./components/FileExplorer";
import PreviewPanel from "./components/PreviewPanel";
import Header from "./components/Header";
import "./App.css";

const initialFiles = {
  "index.html": {
    name: "index.html",
    language: "html",
    value: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Canvas - Live Preview</title>
    <style id="custom-styles">
        /* Your CSS will be injected here */
    </style>
</head>
<body>
    <h1>Hello World!</h1>
    <script id="custom-script">
        // Your JavaScript will be injected here
    </script>
</body>
</html>`,
  },
  "style.css": {
    name: "style.css",
    language: "css",
    value: `/* Code Canvas Styles */
body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  
}

`,
  },
  "script.js": {
    name: "script.js",
    language: "javascript",
    value: `// Code Canvas JavaScript
`,
  },
};

// Local Storage Keys
const STORAGE_KEY = 'codecanvas_files';
const ACTIVE_FILE_KEY = 'codecanvas_active_file';
const ACTIVE_TAB_KEY = 'codecanvas_active_tab';

function App() {
  // Load files from localStorage on startup
  const [files, setFiles] = useState(() => {
    try {
      const savedFiles = localStorage.getItem(STORAGE_KEY);
      if (savedFiles) {
        console.log('📁 Loaded saved code from localStorage');
        return JSON.parse(savedFiles);
      }
    } catch (error) {
      console.warn('Failed to load saved files:', error);
    }
    console.log('🆕 Using default template');
    return initialFiles;
  });

  const [activeFile, setActiveFile] = useState(() => {
    try {
      const savedActiveFile = localStorage.getItem(ACTIVE_FILE_KEY);
      return savedActiveFile || "index.html";
    } catch (error) {
      return "index.html";
    }
  });

  const [activeTab, setActiveTab] = useState(() => {
    try {
      const savedActiveTab = localStorage.getItem(ACTIVE_TAB_KEY);
      return savedActiveTab || "code";
    } catch (error) {
      return "code";
    }
  });

  const [currentTheme, setCurrentTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('codecanvas_theme');
      return savedTheme || 'vs-dark';
    } catch (error) {
      return 'vs-dark';
    }
  });

  const [saveStatus, setSaveStatus] = useState('saved'); // 'saving', 'saved', 'error'
  const previewRef = useRef(null);
  const saveTimeoutRef = useRef(null);
  const saveToastRef = useRef(null);

  // Function to save files to localStorage
  const saveFiles = async () => {
    try {
      // Dismiss any existing save toast
      if (saveToastRef.current) {
        toast.dismiss(saveToastRef.current);
      }

      setSaveStatus('saving');
      saveToastRef.current = toast.loading('Saving code...');

      localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
      localStorage.setItem('codecanvas_last_save', new Date().toISOString());
      setSaveStatus('saved');
      
      // Dismiss loading toast and show success
      toast.dismiss(saveToastRef.current);
      toast.success('Code saved!', { duration: 2000 });
      console.log('💾 Code saved successfully');
    } catch (error) {
      console.error('Failed to save files:', error);
      setSaveStatus('error');
      
      // Try to clear some space and save again
      try {
        // Remove old saves if storage is full
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('old_codecanvas_')) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
        
        // Try saving again
        localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
        setSaveStatus('saved');
        
        // Show success after clearing old data
        toast.dismiss(saveToastRef.current);
        toast.success('Code saved!', { duration: 2000 });
        console.log('💾 Saved after clearing old data');
      } catch (clearError) {
        console.error('Critical: Unable to save code:', clearError);
        setSaveStatus('error');
        
        // Show error toast
        toast.dismiss(saveToastRef.current);
        toast.error('Failed to save code', { duration: 3000 });
      }
    }
  };

  // Auto-save files to localStorage whenever they change (after 8 seconds)
  useEffect(() => {
    // Clear previous timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Debounce the save operation (save after 8 seconds of no changes)
    saveTimeoutRef.current = setTimeout(() => {
      saveFiles();
    }, 8000); // 8 seconds

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [files]);

  // Handle Ctrl+S keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check for Ctrl+S (or Cmd+S on Mac)
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault(); // Prevent browser's default save dialog
        
        // Clear any pending auto-save and save immediately
        if (saveTimeoutRef.current) {
          clearTimeout(saveTimeoutRef.current);
        }
        
        saveFiles();
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [files]); // Include files in dependency to ensure latest data is saved

  // Save active file and tab when they change
  useEffect(() => {
    try {
      localStorage.setItem(ACTIVE_FILE_KEY, activeFile);
    } catch (error) {
      console.warn('Failed to save active file:', error);
    }
  }, [activeFile]);

  useEffect(() => {
    try {
      localStorage.setItem(ACTIVE_TAB_KEY, activeTab);
    } catch (error) {
      console.warn('Failed to save active tab:', error);
    }
  }, [activeTab]);

  // Save theme when it changes
  useEffect(() => {
    try {
      localStorage.setItem('codecanvas_theme', currentTheme);
    } catch (error) {
      console.warn('Failed to save theme:', error);
    }
  }, [currentTheme]);

  const updateFile = (fileName, newValue) => {
    setFiles((prev) => ({
      ...prev,
      [fileName]: {
        ...prev[fileName],
        value: newValue,
      },
    }));
  };

  const generatePreviewContent = () => {
    const html = files["index.html"]?.value || "";
    const css = files["style.css"]?.value || "";
    const js = files["script.js"]?.value || "";

    return html
      .replace("/* Your CSS will be injected here */", css)
      .replace("// Your JavaScript will be injected here", js);
  };

  return (
    <div className="app">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid #2a2a2a',
          },
          success: {
            iconTheme: {
              primary: '#16a34a',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#dc2626',
              secondary: '#fff',
            },
          },
          loading: {
            iconTheme: {
              primary: '#1e40af',
              secondary: '#fff',
            },
          },
        }}
      />

      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        saveStatus={saveStatus}
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
        onRunCode={() => {
          if (previewRef.current) {
            previewRef.current.refreshPreview();
          }
        }}
      />

      <div className="app-body">
        {activeTab === "code" ? (
          <div className="editor-section">
            <FileExplorer
              files={files}
              activeFile={activeFile}
              onFileSelect={setActiveFile}
            />

            <CodeEditor
              file={files[activeFile]}
              theme={currentTheme}
              onChange={(newValue) => updateFile(activeFile, newValue)}
            />
          </div>
        ) : (
          <PreviewPanel
            ref={previewRef}
            content={generatePreviewContent()}
            isFullView={true}
          />
        )}
      </div>
    </div>
  );
}

export default App;
