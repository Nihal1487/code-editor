import { useEffect, useRef } from "react";
import MonacoEditor from "@monaco-editor/react";

const CodeEditor = ({ file, theme = 'vs-dark', onChange }) => {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    // Define custom themes
    monaco.editor.defineTheme('monokai', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: '', foreground: 'f8f8f2' },
        { token: 'comment', foreground: '75715e', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'f92672' },
        { token: 'keyword.control', foreground: 'f92672' },
        { token: 'keyword.operator', foreground: 'f92672' },
        { token: 'string', foreground: 'e6db74' },
        { token: 'string.quoted', foreground: 'e6db74' },
        { token: 'number', foreground: 'ae81ff' },
        { token: 'constant', foreground: 'ae81ff' },
        { token: 'constant.numeric', foreground: 'ae81ff' },
        { token: 'type', foreground: '66d9ef' },
        { token: 'type.identifier', foreground: '66d9ef' },
        { token: 'identifier', foreground: 'f8f8f2' },
        { token: 'identifier.class', foreground: 'a6e22e' },
        { token: 'identifier.function', foreground: 'a6e22e' },
        { token: 'tag', foreground: 'f92672' },
        { token: 'tag.id', foreground: 'a6e22e' },
        { token: 'tag.class', foreground: 'a6e22e' },
        { token: 'attribute.name', foreground: 'a6e22e' },
        { token: 'attribute.value', foreground: 'e6db74' },
        { token: 'operator', foreground: 'f92672' },
        { token: 'delimiter', foreground: 'f8f8f2' },
        { token: 'delimiter.bracket', foreground: 'f8f8f2' },
        { token: 'delimiter.parenthesis', foreground: 'f8f8f2' },
        { token: 'variable', foreground: 'f8f8f2' },
        { token: 'variable.predefined', foreground: 'ae81ff' },
        { token: 'metatag', foreground: 'f92672' },
        { token: 'metatag.content', foreground: 'e6db74' },
      ],
      colors: {
        'editor.background': '#272822',
        'editor.foreground': '#f8f8f2',
        'editorLineNumber.foreground': '#75715e',
        'editorLineNumber.activeForeground': '#f8f8f2',
        'editor.selectionBackground': '#49483e',
        'editor.lineHighlightBackground': '#3e3d32',
        'editorCursor.foreground': '#f8f8f0',
        'editor.selectionHighlightBackground': '#49483e75',
        'editorIndentGuide.background': '#3e3d32',
        'editorIndentGuide.activeBackground': '#75715e',
      }
    });

    monaco.editor.defineTheme('github-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: '', foreground: 'e6edf3' },
        { token: 'comment', foreground: '6e7681', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'ff7b72' },
        { token: 'keyword.control', foreground: 'ff7b72' },
        { token: 'keyword.operator', foreground: 'ff7b72' },
        { token: 'string', foreground: 'a5c261' },
        { token: 'string.quoted', foreground: 'a5c261' },
        { token: 'number', foreground: '79c0ff' },
        { token: 'constant', foreground: '79c0ff' },
        { token: 'constant.numeric', foreground: '79c0ff' },
        { token: 'type', foreground: 'ffa657' },
        { token: 'type.identifier', foreground: 'ffa657' },
        { token: 'identifier', foreground: 'e6edf3' },
        { token: 'identifier.class', foreground: '7ee787' },
        { token: 'identifier.function', foreground: 'd2a8ff' },
        { token: 'tag', foreground: '7ee787' },
        { token: 'tag.id', foreground: 'ffa657' },
        { token: 'tag.class', foreground: 'ffa657' },
        { token: 'attribute.name', foreground: '79c0ff' },
        { token: 'attribute.value', foreground: 'a5c261' },
        { token: 'operator', foreground: 'ff7b72' },
        { token: 'delimiter', foreground: 'e6edf3' },
        { token: 'delimiter.bracket', foreground: 'e6edf3' },
        { token: 'delimiter.parenthesis', foreground: 'e6edf3' },
        { token: 'variable', foreground: 'e6edf3' },
        { token: 'variable.predefined', foreground: '79c0ff' },
        { token: 'metatag', foreground: '7ee787' },
        { token: 'metatag.content', foreground: 'a5c261' },
      ],
      colors: {
        'editor.background': '#0d1117',
        'editor.foreground': '#e6edf3',
        'editorLineNumber.foreground': '#6e7681',
        'editorLineNumber.activeForeground': '#e6edf3',
        'editor.selectionBackground': '#264f78',
        'editor.lineHighlightBackground': '#21262d',
        'editorCursor.foreground': '#e6edf3',
        'editor.selectionHighlightBackground': '#264f7850',
        'editorIndentGuide.background': '#21262d',
        'editorIndentGuide.activeBackground': '#6e7681',
      }
    });

    monaco.editor.defineTheme('dracula', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: '', foreground: 'f8f8f2' },
        { token: 'comment', foreground: '6272a4', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'ff79c6' },
        { token: 'keyword.control', foreground: 'ff79c6' },
        { token: 'keyword.operator', foreground: 'ff79c6' },
        { token: 'string', foreground: 'f1fa8c' },
        { token: 'string.quoted', foreground: 'f1fa8c' },
        { token: 'number', foreground: 'bd93f9' },
        { token: 'constant', foreground: 'bd93f9' },
        { token: 'constant.numeric', foreground: 'bd93f9' },
        { token: 'type', foreground: '8be9fd' },
        { token: 'type.identifier', foreground: '8be9fd' },
        { token: 'identifier', foreground: 'f8f8f2' },
        { token: 'identifier.class', foreground: '50fa7b' },
        { token: 'identifier.function', foreground: '50fa7b' },
        { token: 'tag', foreground: 'ff79c6' },
        { token: 'tag.id', foreground: '50fa7b' },
        { token: 'tag.class', foreground: '50fa7b' },
        { token: 'attribute.name', foreground: '50fa7b' },
        { token: 'attribute.value', foreground: 'f1fa8c' },
        { token: 'operator', foreground: 'ff79c6' },
        { token: 'delimiter', foreground: 'f8f8f2' },
        { token: 'delimiter.bracket', foreground: 'f8f8f2' },
        { token: 'delimiter.parenthesis', foreground: 'f8f8f2' },
        { token: 'variable', foreground: 'f8f8f2' },
        { token: 'variable.predefined', foreground: 'bd93f9' },
        { token: 'metatag', foreground: 'ff79c6' },
        { token: 'metatag.content', foreground: 'f1fa8c' },
      ],
      colors: {
        'editor.background': '#282a36',
        'editor.foreground': '#f8f8f2',
        'editorLineNumber.foreground': '#6272a4',
        'editorLineNumber.activeForeground': '#f8f8f2',
        'editor.selectionBackground': '#44475a',
        'editor.lineHighlightBackground': '#44475a75',
        'editorCursor.foreground': '#f8f8f0',
        'editor.selectionHighlightBackground': '#44475a50',
        'editorIndentGuide.background': '#44475a',
        'editorIndentGuide.activeBackground': '#6272a4',
      }
    });

    // Apply the theme immediately after defining
    monaco.editor.setTheme(theme);

    // Configure Monaco Editor options
    editor.updateOptions({
      fontSize: 18,
      lineHeight: 1.6,
      fontFamily: "'JetBrains Mono', 'Monaco', 'Menlo', monospace",
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 2,
      insertSpaces: true,
      wordWrap: "on",
      lineNumbers: "on",
      glyphMargin: false,
      folding: true,
      lineDecorationsWidth: 0,
      lineNumbersMinChars: 3,
      renderLineHighlight: "gutter",
      cursorBlinking: "smooth",
      cursorSmoothCaretAnimation: true,
      smoothScrolling: true,
      contextmenu: true,
      multiCursorModifier: "ctrlCmd",
      formatOnPaste: true,
      formatOnType: true,
      // Enhanced suggestion settings
      suggestOnTriggerCharacters: true,
      acceptSuggestionOnCommitCharacter: true,
      acceptSuggestionOnEnter: "on",
      tabCompletion: "on",
      wordBasedSuggestions: "matchingDocuments",
      quickSuggestions: {
        other: "on",
        comments: "on",
        strings: "on",
      },
      quickSuggestionsDelay: 0,
      parameterHints: {
        enabled: true,
        cycle: true,
      },
      hover: {
        enabled: true,
        delay: 100,
      },
      suggest: {
        showSnippets: true,
        showClasses: true,
        showColors: true,
        showConstants: true,
        showConstructors: true,
        showDeprecated: true,
        showEnums: true,
        showEvents: true,
        showFields: true,
        showFiles: true,
        showFolders: true,
        showFunctions: true,
        showInterfaces: true,
        showIssues: true,
        showKeywords: true,
        showMethods: true,
        showModules: true,
        showOperators: true,
        showProperties: true,
        showReferences: true,
        showStructs: true,
        showTypeParameters: true,
        showUnits: true,
        showUsers: true,
        showValues: true,
        showVariables: true,
        showWords: true,
      },
    });

    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      console.log("Auto-saved!");
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      const runEvent = new CustomEvent("runCode");
      window.dispatchEvent(runEvent);
    });

    // Enhanced language-specific configurations
    if (file?.language === "html") {
      monaco.languages.html.htmlDefaults.setOptions({
        format: {
          tabSize: 2,
          insertSpaces: true,
          wrapLineLength: 120,
          unformatted: "default",
          contentUnformatted: "pre,code,textarea",
          indentInnerHtml: false,
          preserveNewLines: true,
          maxPreserveNewLines: undefined,
          indentHandlebars: false,
          endWithNewline: false,
          extraLiners: "head, body, /html",
          wrapAttributes: "auto",
        },
        suggest: {
          html5: true,
          angular1: false,
          ionic: false,
        },
      });

      // Add custom HTML snippets
      monaco.languages.registerCompletionItemProvider("html", {
        provideCompletionItems: () => {
          return {
            suggestions: [
              {
                label: "html5",
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: [
                  "<!DOCTYPE html>",
                  '<html lang="en">',
                  "<head>",
                  '    <meta charset="UTF-8">',
                  '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
                  "    <title>${1:Document}</title>",
                  "</head>",
                  "<body>",
                  "    ${2}",
                  "</body>",
                  "</html>",
                ].join("\n"),
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: "HTML5 boilerplate",
              },
            ],
          };
        },
      });
    }

    if (file?.language === "css") {
      monaco.languages.css.cssDefaults.setOptions({
        validate: true,
        lint: {
          compatibleVendorPrefixes: "ignore",
          vendorPrefix: "warning",
          duplicateProperties: "warning",
          emptyRules: "warning",
          importStatement: "ignore",
          boxModel: "ignore",
          universalSelector: "ignore",
          zeroUnits: "ignore",
          fontFaceProperties: "warning",
          hexColorLength: "error",
          argumentsInColorFunction: "error",
          unknownProperties: "warning",
          ieHack: "ignore",
          unknownVendorSpecificProperties: "ignore",
          propertyIgnoredDueToDisplay: "warning",
          important: "ignore",
          float: "ignore",
          idSelector: "ignore",
        },
      });

      // Add CSS snippets
      monaco.languages.registerCompletionItemProvider("css", {
        provideCompletionItems: () => {
          return {
            suggestions: [
              {
                label: "flexbox",
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: [
                  "display: flex;",
                  "justify-content: ${1:center};",
                  "align-items: ${2:center};",
                ].join("\n"),
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: "Flexbox layout",
              },
              {
                label: "grid",
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: [
                  "display: grid;",
                  "grid-template-columns: ${1:repeat(3, 1fr)};",
                  "gap: ${2:1rem};",
                ].join("\n"),
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: "CSS Grid layout",
              },
            ],
          };
        },
      });
    }

    if (file?.language === "javascript") {
      monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ES2020,
        allowNonTsExtensions: true,
        moduleResolution:
          monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        module: monaco.languages.typescript.ModuleKind.CommonJS,
        noEmit: true,
        esModuleInterop: true,
        jsx: monaco.languages.typescript.JsxEmit.React,
        reactNamespace: "React",
        allowJs: true,
        typeRoots: ["node_modules/@types"],
        lib: ["ES2020", "DOM", "DOM.Iterable"],
      });

      monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: false,
        noSyntaxValidation: false,
        noSuggestionDiagnostics: false,
      });

      // Add extra libraries for better IntelliSense
      monaco.languages.typescript.javascriptDefaults.addExtraLib(
        `
        // Console API
        declare var console: {
          log(...args: any[]): void;
          error(...args: any[]): void;
          warn(...args: any[]): void;
          info(...args: any[]): void;
          debug(...args: any[]): void;
          trace(...args: any[]): void;
          clear(): void;
          count(label?: string): void;
          time(label?: string): void;
          timeEnd(label?: string): void;
        };
        
        // Document API
        declare var document: {
          getElementById(id: string): HTMLElement | null;
          querySelector(selector: string): HTMLElement | null;
          querySelectorAll(selector: string): NodeListOf<HTMLElement>;
          createElement(tagName: string): HTMLElement;
          createTextNode(data: string): Text;
          addEventListener(type: string, listener: EventListener): void;
          removeEventListener(type: string, listener: EventListener): void;
          body: HTMLElement;
          head: HTMLElement;
          title: string;
          cookie: string;
          readyState: string;
          location: Location;
        };
        
        // Window API
        declare var window: {
          addEventListener(type: string, listener: EventListener): void;
          removeEventListener(type: string, listener: EventListener): void;
          setTimeout(callback: Function, delay: number): number;
          setInterval(callback: Function, delay: number): number;
          clearTimeout(id: number): void;
          clearInterval(id: number): void;
          alert(message?: string): void;
          confirm(message?: string): boolean;
          prompt(message?: string, defaultText?: string): string | null;
          location: Location;
          history: History;
          localStorage: Storage;
          sessionStorage: Storage;
          fetch(url: string, options?: RequestInit): Promise<Response>;
        };
        
        // HTML Element API
        declare interface HTMLElement {
          innerHTML: string;
          textContent: string;
          innerText: string;
          style: CSSStyleDeclaration;
          className: string;
          classList: DOMTokenList;
          id: string;
          src: string;
          href: string;
          value: string;
          checked: boolean;
          disabled: boolean;
          addEventListener(type: string, listener: EventListener): void;
          removeEventListener(type: string, listener: EventListener): void;
          click(): void;
          focus(): void;
          blur(): void;
          appendChild(child: Node): Node;
          removeChild(child: Node): Node;
          getAttribute(name: string): string | null;
          setAttribute(name: string, value: string): void;
          removeAttribute(name: string): void;
          parentNode: Node | null;
          children: HTMLCollection;
          firstChild: Node | null;
          lastChild: Node | null;
          nextSibling: Node | null;
          previousSibling: Node | null;
        }
        
        // Event API
        declare interface Event {
          type: string;
          target: EventTarget | null;
          preventDefault(): void;
          stopPropagation(): void;
        }
        
        // Common APIs
        declare var JSON: {
          parse(text: string): any;
          stringify(value: any, replacer?: Function | Array<string | number>, space?: string | number): string;
        };
        
        declare var Math: {
          PI: number;
          abs(x: number): number;
          max(...args: number[]): number;
          min(...args: number[]): number;
          random(): number;
          round(x: number): number;
          floor(x: number): number;
          ceil(x: number): number;
          pow(x: number, y: number): number;
          sqrt(x: number): number;
        };
        
        declare var Date: {
          new(): Date;
          now(): number;
        };
        
        declare interface Date {
          getTime(): number;
          getFullYear(): number;
          getMonth(): number;
          getDate(): number;
          getHours(): number;
          getMinutes(): number;
          getSeconds(): number;
          toDateString(): string;
          toTimeString(): string;
          toLocaleString(): string;
          toISOString(): string;
        }
        
        // Array methods
        declare interface Array<T> {
          push(...items: T[]): number;
          pop(): T | undefined;
          length: number;
          forEach(callback: (value: T, index: number, array: T[]) => void): void;
          map<U>(callback: (value: T, index: number, array: T[]) => U): U[];
          filter(callback: (value: T, index: number, array: T[]) => boolean): T[];
          find(callback: (value: T, index: number, array: T[]) => boolean): T | undefined;
          indexOf(searchElement: T): number;
          includes(searchElement: T): boolean;
          join(separator?: string): string;
          slice(start?: number, end?: number): T[];
          splice(start: number, deleteCount?: number, ...items: T[]): T[];
        }
      `,
        "dom.d.ts"
      );

      // Add JavaScript snippets
      monaco.languages.registerCompletionItemProvider("javascript", {
        provideCompletionItems: () => {
          return {
            suggestions: [
              {
                label: "function",
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: [
                  "function ${1:functionName}(${2:params}) {",
                  "    ${3:// function body}",
                  "}",
                ].join("\n"),
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: "Function declaration",
              },
              {
                label: "arrow",
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText:
                  "const ${1:functionName} = (${2:params}) => {\n    ${3:// function body}\n}",
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: "Arrow function",
              },
              {
                label: "addEventListener",
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText:
                  "addEventListener('${1:click}', (${2:event}) => {\n    ${3:// event handler}\n})",
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: "Add event listener",
              },
              {
                label: "fetch",
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: [
                  "fetch('${1:url}')",
                  "    .then(response => response.json())",
                  "    .then(data => {",
                  "        ${2:// handle data}",
                  "    })",
                  "    .catch(error => {",
                  "        console.error('Error:', error);",
                  "    });",
                ].join("\n"),
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: "Fetch API call",
              },
            ],
          };
        },
      });
    }
  };

  useEffect(() => {
    const handleRunCode = () => {
      // This will be handled by the parent component
    };

    window.addEventListener("runCode", handleRunCode);
    return () => window.removeEventListener("runCode", handleRunCode);
  }, []);

  // Effect to handle theme changes after initial mount
  useEffect(() => {
    if (editorRef.current) {
      const monaco = window.monaco;
      if (monaco) {
        monaco.editor.setTheme(theme);
      }
    }
  }, [theme]);

  if (!file) {
    return (
      <div className="code-editor">
        <div className="loading">Select a file to start editing</div>
      </div>
    );
  }

  return (
    <div className="code-editor">
      <div className="code-editor-header">
        <span className="code-editor-title">{file.name}</span>
        <span className="language-indicator">{file.language}</span>
      </div>

      <MonacoEditor
        height="calc(100% - 48px)"
        language={file.language}
        value={file.value}
        onChange={(value) => onChange(value || "")}
        onMount={handleEditorDidMount}
        theme={theme}
        options={{
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: false,
          cursorStyle: "line",
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
