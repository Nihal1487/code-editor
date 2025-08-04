# Code Canvas 🎨

A modern, feature-rich web-based code editor built with React and Monaco Editor. Write HTML, CSS, and JavaScript with syntax highlighting, auto-completion, and live preview functionality.

![Code Canvas](https://img.shields.io/badge/React-18-blue.svg)
![Monaco Editor](https://img.shields.io/badge/Monaco-Editor-green.svg)
![Vite](https://img.shields.io/badge/Vite-5-purple.svg)

## ✨ Features

- **🎯 Multi-language Support**: HTML, CSS, JavaScript with syntax highlighting
- **🧠 Smart Auto-completion**: IntelliSense powered by Monaco Editor (VS Code's editor)
- **👀 Live Preview**: Real-time preview with multiple viewport modes (Mobile, Tablet, Desktop)
- **📁 File Explorer**: Organize your code files with an intuitive file tree
- **⚡ Fast & Responsive**: Built with Vite for lightning-fast development
- **🎨 Modern UI**: Clean, dark theme interface similar to VS Code
- **⌨️ Keyboard Shortcuts**: 
  - `Ctrl/Cmd + S`: Auto-save
  - `Ctrl/Cmd + Enter`: Run code
- **📱 Responsive Design**: Works on all screen sizes
- **🔧 Advanced Editor Features**:
  - Line numbers and syntax highlighting
  - Code folding and minimap
  - Error detection and warnings
  - Multiple cursors support
  - Find and replace
  - Auto-formatting

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd code-canvas
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Usage

1. **File Explorer**: Use the left sidebar to switch between HTML, CSS, and JavaScript files
2. **Code Editor**: Write your code with full syntax highlighting and auto-completion
3. **Live Preview**: Click "Show Preview" to see your code in action
4. **Run Code**: Click "Run" or press `Ctrl/Cmd + Enter` to update the preview
5. **Viewport Modes**: Toggle between Desktop, Tablet, and Mobile views in the preview panel

## 🏗️ Project Structure

```
src/
├── components/
│   ├── CodeEditor.jsx      # Monaco editor wrapper with language support
│   ├── FileExplorer.jsx    # File tree navigation
│   ├── Header.jsx          # Top navigation bar
│   └── PreviewPanel.jsx    # Live preview with responsive modes
├── App.jsx                 # Main application component
├── App.css                 # Application styles
├── index.css               # Global styles
└── main.jsx               # React entry point
```

## 🎨 Default Files

The editor comes pre-loaded with sample files to get you started:

- **index.html**: Basic HTML structure with interactive elements
- **style.css**: Modern CSS with gradients and animations
- **script.js**: JavaScript with event handlers and modern ES6+ features

## 🧩 Technologies Used

- **React 18**: Modern React with hooks and functional components
- **Monaco Editor**: The same editor that powers VS Code
- **Vite**: Fast build tool and development server
- **Lucide React**: Beautiful, customizable icons
- **Split Panes**: Resizable layout panels

## 📦 Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Monaco Editor team for the amazing code editor
- React team for the fantastic framework
- Vite team for the blazing fast build tool

---

**Happy Coding! 🚀**+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
