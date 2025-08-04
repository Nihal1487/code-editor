import { Play, Code2, Eye, Palette } from 'lucide-react'

const Header = ({ activeTab, setActiveTab, currentTheme, setCurrentTheme, onRunCode }) => {
  const themes = [
    { value: 'vs-dark', label: 'VS Code Dark', description: 'Default VS Code dark theme' },
    { value: 'github-dark', label: 'GitHub Dark', description: 'GitHub dark theme' },
    { value: 'monokai', label: 'Monokai', description: 'Classic Monokai theme' },
    { value: 'dracula', label: 'Dracula', description: 'Popular Dracula theme' },
    { value: 'hc-black', label: 'High Contrast Dark', description: 'High contrast dark theme' },
  ];

  return (
    <div className="header">
      <div className="header-left">
        <div className="logo">
          <Code2 size={20} style={{ display: 'inline', marginRight: '8px' }} />
          Code Canvas
        </div>
        
        <div className="tab-switcher">
          <button 
            className={`tab-button ${activeTab === 'code' ? 'active' : ''}`}
            onClick={() => setActiveTab('code')}
          >
            <Code2 size={16} />
            Code
          </button>
          <button 
            className={`tab-button ${activeTab === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            <Eye size={16} />
            Preview
          </button>
        </div>
      </div>
      
      <div className="header-right">
        <div className="theme-selector">
          <Palette size={16} />
          <select 
            value={currentTheme} 
            onChange={(e) => setCurrentTheme(e.target.value)}
            className="theme-dropdown"
            title="Change editor theme"
          >
            {themes.map(theme => (
              <option key={theme.value} value={theme.value}>
                {theme.label}
              </option>
            ))}
          </select>
        </div>
        
        <button 
          className="btn-primary" 
          onClick={onRunCode}
          title="Run Code (Ctrl+Enter)"
        >
          <Play size={16} />
          Run
        </button>
      </div>
    </div>
  )
}

export default Header
