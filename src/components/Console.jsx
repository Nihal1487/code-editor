import { useState, useImperativeHandle, forwardRef } from 'react'
import { Terminal, Trash2, Copy } from 'lucide-react'

const Console = forwardRef((props, ref) => {
  const [logs, setLogs] = useState([])

  useImperativeHandle(ref, () => ({
    addLog: (type, message, timestamp = new Date()) => {
      setLogs(prev => [...prev, {
        id: Date.now() + Math.random(),
        type,
        message,
        timestamp
      }])
    },
    clear: () => setLogs([])
  }))

  const clearLogs = () => {
    setLogs([])
  }

  const copyLogs = () => {
    const logText = logs.map(log => 
      `[${log.timestamp.toLocaleTimeString()}] ${log.type.toUpperCase()}: ${log.message}`
    ).join('\n')
    navigator.clipboard.writeText(logText)
  }

  const getLogIcon = (type) => {
    switch (type) {
      case 'error':
        return '❌'
      case 'warn':
        return '⚠️'
      case 'info':
        return 'ℹ️'
      default:
        return '📝'
    }
  }

  const getLogColor = (type) => {
    switch (type) {
      case 'error':
        return '#e53e3e'
      case 'warn':
        return '#d69e2e'
      case 'info':
        return '#3182ce'
      default:
        return '#4a5568'
    }
  }

  return (
    <div className="console-panel">
      <div className="console-header">
        <div className="console-title">
          <Terminal size={16} />
          Console Output
          {logs.length > 0 && <span className="log-count">({logs.length})</span>}
        </div>
        
        <div className="console-controls">
          <button 
            className="console-btn" 
            onClick={copyLogs}
            title="Copy logs"
            disabled={logs.length === 0}
          >
            <Copy size={14} />
          </button>
          <button 
            className="console-btn" 
            onClick={clearLogs}
            title="Clear console"
            disabled={logs.length === 0}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      
      <div className="console-content">
        {logs.length === 0 ? (
          <div className="console-empty">
            No console output yet. Run your code to see logs here.
          </div>
        ) : (
          logs.map(log => (
            <div 
              key={log.id} 
              className="console-log"
              style={{ borderLeftColor: getLogColor(log.type) }}
            >
              <span className="log-icon">{getLogIcon(log.type)}</span>
              <span className="log-time">
                {log.timestamp.toLocaleTimeString()}
              </span>
              <span 
                className="log-message"
                style={{ color: getLogColor(log.type) }}
              >
                {log.message}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
})

Console.displayName = 'Console'

export default Console
