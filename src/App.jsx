import { useState, useRef } from "react";
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

function App() {
  const [files, setFiles] = useState(initialFiles);
  const [activeFile, setActiveFile] = useState("index.html");
  const [activeTab, setActiveTab] = useState("code"); // 'code' or 'preview'
  const previewRef = useRef(null);

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
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
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
