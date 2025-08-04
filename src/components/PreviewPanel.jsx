import { forwardRef, useImperativeHandle, useState, useRef, useEffect } from 'react'
import { RefreshCw, ExternalLink, Smartphone, Monitor, Tablet } from 'lucide-react'

const PreviewPanel = forwardRef(({ content, isFullView = false }, ref) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [viewMode, setViewMode] = useState('desktop') // desktop, tablet, mobile
  const iframeRef = useRef(null)

  useImperativeHandle(ref, () => ({
    refreshPreview: () => {
      refreshPreview()
    }
  }))

  const refreshPreview = () => {
    setIsLoading(true)
    setError(null)
    
    try {
      if (iframeRef.current) {
        const iframe = iframeRef.current
        const doc = iframe.contentDocument || iframe.contentWindow.document
        
        doc.open()
        doc.write(content)
        doc.close()
        
        // Allow console output to show in browser dev tools
        const iframeWindow = iframe.contentWindow
        
        // Preserve original console for iframe debugging
        if (!iframeWindow.originalConsole) {
          iframeWindow.originalConsole = {
            log: iframeWindow.console.log.bind(iframeWindow.console),
            error: iframeWindow.console.error.bind(iframeWindow.console),
            warn: iframeWindow.console.warn.bind(iframeWindow.console),
            info: iframeWindow.console.info.bind(iframeWindow.console)
          }
          
          // Override console to also log to parent window (your browser dev tools)
          iframeWindow.console.log = function(...args) {
            iframeWindow.originalConsole.log(...args)
            console.log('[Preview]', ...args) // This will show in your browser dev tools
          }
          
          iframeWindow.console.error = function(...args) {
            iframeWindow.originalConsole.error(...args)
            console.error('[Preview Error]', ...args)
          }
          
          iframeWindow.console.warn = function(...args) {
            iframeWindow.originalConsole.warn(...args)
            console.warn('[Preview Warning]', ...args)
          }
          
          iframeWindow.console.info = function(...args) {
            iframeWindow.originalConsole.info(...args)
            console.info('[Preview Info]', ...args)
          }
        }
        
        // Handle JavaScript errors in the iframe
        iframe.contentWindow.onerror = (message, source, lineno, colno, error) => {
          const errorMsg = `JavaScript Error: ${message} at line ${lineno}`
          setError(errorMsg)
          console.error('[Preview JavaScript Error]', errorMsg)
          return true
        }
        
        // Handle unhandled promise rejections
        iframe.contentWindow.addEventListener('unhandledrejection', (event) => {
          const errorMsg = `Unhandled Promise Rejection: ${event.reason}`
          setError(errorMsg)
          console.error('[Preview Promise Rejection]', errorMsg)
        })
      }
    } catch (err) {
      const errorMsg = `Preview Error: ${err.message}`
      setError(errorMsg)
      console.error('[Preview Error]', errorMsg)
    } finally {
      setTimeout(() => setIsLoading(false), 500)
    }
  }

  useEffect(() => {
    refreshPreview()
  }, [content])

  const getViewportStyles = () => {
    switch (viewMode) {
      case 'mobile':
        return { width: '375px', height: '667px', margin: '0 auto' }
      case 'tablet':
        return { width: '768px', height: '1024px', margin: '0 auto' }
      default:
        return { width: '100%', height: '100%' }
    }
  }

  const openInNewTab = () => {
    const newWindow = window.open()
    newWindow.document.write(content)
    newWindow.document.close()
  }

  return (
    <div className={`preview-panel ${isFullView ? 'full-view' : ''}`}>
      <div className="preview-header">
        <div className="preview-title">
          Live Preview
          {isLoading && <span style={{ marginLeft: '8px', color: '#667eea' }}>Loading...</span>}
        </div>
        
        <div className="preview-controls">
          <button
            className="btn-secondary"
            onClick={() => setViewMode('mobile')}
            title="Mobile View"
            style={{
              background: viewMode === 'mobile' ? '#667eea' : 'transparent',
              color: viewMode === 'mobile' ? 'white' : '#666'
            }}
          >
            <Smartphone size={14} />
          </button>
          
          <button
            className="btn-secondary"
            onClick={() => setViewMode('tablet')}
            title="Tablet View"
            style={{
              background: viewMode === 'tablet' ? '#667eea' : 'transparent',
              color: viewMode === 'tablet' ? 'white' : '#666'
            }}
          >
            <Tablet size={14} />
          </button>
          
          <button
            className="btn-secondary"
            onClick={() => setViewMode('desktop')}
            title="Desktop View"
            style={{
              background: viewMode === 'desktop' ? '#667eea' : 'transparent',
              color: viewMode === 'desktop' ? 'white' : '#666'
            }}
          >
            <Monitor size={14} />
          </button>
          
          <button
            className="btn-secondary"
            onClick={refreshPreview}
            disabled={isLoading}
            title="Refresh Preview"
          >
            <RefreshCw size={14} className={isLoading ? 'spin' : ''} />
          </button>
          
          <button
            className="btn-secondary"
            onClick={openInNewTab}
            title="Open in New Tab"
          >
            <ExternalLink size={14} />
          </button>
        </div>
      </div>
      
      {error && (
        <div className="error">
          {error}
        </div>
      )}
      
      <div 
        className="preview-content"
        style={{ 
          flex: 1, 
          overflow: 'auto', 
          background: '#f8f9fa',
          display: 'flex',
          justifyContent: 'center',
          alignItems: viewMode !== 'desktop' ? 'flex-start' : 'stretch',
          padding: viewMode !== 'desktop' ? '20px' : '0'
        }}
      >
        <iframe
          ref={iframeRef}
          className="preview-iframe"
          style={{
            ...getViewportStyles(),
            border: viewMode !== 'desktop' ? '1px solid #ddd' : 'none',
            borderRadius: viewMode !== 'desktop' ? '8px' : '0',
            boxShadow: viewMode !== 'desktop' ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
          }}
          title="Code Preview"
          sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
        />
      </div>
    </div>
  )
})

PreviewPanel.displayName = 'PreviewPanel'

export default PreviewPanel
