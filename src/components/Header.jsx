import { Play, Code2, Eye } from 'lucide-react'

const Header = ({ activeTab, setActiveTab, onRunCode }) => {
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
