import { useState, useRef, useEffect } from 'react'
import JsonTree from './JsonTree'
import { Copy, Check, AlertCircle } from 'lucide-react'
import '../assets/css/JsonPanel.css'

function JsonPanel({ title, jsonString, onJsonChange }) {
  const [mode, setMode] = useState('text') // 'text' or 'tree'
  const [parsedData, setParsedData] = useState(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const textareaRef = useRef(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      const scrollHeight = textareaRef.current.scrollHeight
      textareaRef.current.style.height = Math.min(scrollHeight, 600) + 'px'
    }
  }, [jsonString])

  // Parse JSON
  useEffect(() => {
    if (!jsonString.trim()) {
      setParsedData(null)
      setError('')
      return
    }

    try {
      const parsed = JSON.parse(jsonString)
      setParsedData(parsed)
      setError('')
    } catch (err) {
      setError(err.message)
      setParsedData(null)
    }
  }, [jsonString])

  const handleChange = (e) => {
    onJsonChange(e.target.value)
  }

  const handleBeautify = () => {
    try {
      const parsed = JSON.parse(jsonString)
      const beautified = JSON.stringify(parsed, null, 2)
      onJsonChange(beautified)
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(jsonString)
      const minified = JSON.stringify(parsed)
      onJsonChange(minified)
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClear = () => {
    onJsonChange('')
  }

  return (
    <div className="json-panel">
      <div className="panel-header">
        <h2>{title}</h2>
        <div className="panel-controls">
          <button 
            className={`mode-toggle ${mode === 'text' ? 'active' : ''}`}
            onClick={() => setMode('text')}
            title="Raw text mode"
          >
            Text
          </button>
          <button 
            className={`mode-toggle ${mode === 'tree' ? 'active' : ''}`}
            onClick={() => setMode('tree')}
            disabled={!parsedData}
            title="Tree view mode"
          >
            Tree
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {mode === 'text' && (
        <div className="text-mode">
          <textarea
            ref={textareaRef}
            value={jsonString}
            onChange={handleChange}
            placeholder="Paste your JSON here..."
            className="json-input"
            spellCheck="false"
          />
          <div className="actions">
            <button onClick={handleBeautify} className="action-btn primary">
              Beautify
            </button>
            <button onClick={handleMinify} className="action-btn">
              Minify
            </button>
            <button onClick={handleCopy} className="action-btn">
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button onClick={handleClear} className="action-btn danger">
              Clear
            </button>
          </div>
        </div>
      )}

      {mode === 'tree' && parsedData && (
        <div className="tree-mode">
          <JsonTree data={parsedData} dataKey="root" level={0} />
        </div>
      )}
    </div>
  )
}

export default JsonPanel
