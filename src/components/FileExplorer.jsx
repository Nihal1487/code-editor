import { FileText, FileCode, Palette } from 'lucide-react'

const FileExplorer = ({ files, activeFile, onFileSelect }) => {
  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase()
    switch (extension) {
      case 'html':
        return <FileText size={16} color="#e34c26" />
      case 'css':
        return <Palette size={16} color="#1572b6" />
      case 'js':
        return <FileCode size={16} color="#f7df1e" />
      default:
        return <FileText size={16} />
    }
  }

  return (
    <div className="file-explorer">
      <h3>Explorer</h3>
      {Object.entries(files).map(([fileName, file]) => (
        <button
          key={fileName}
          className={`file-item ${activeFile === fileName ? 'active' : ''}`}
          onClick={() => onFileSelect(fileName)}
        >
          <span className="file-icon">
            {getFileIcon(fileName)}
          </span>
          {file.name}
        </button>
      ))}
    </div>
  )
}

export default FileExplorer
