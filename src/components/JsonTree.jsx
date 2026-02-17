import { useState } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'
import '../assets/css/JsonTree.css'

function JsonTree({ data, dataKey = 'root', level = 0 }) {
  const [expanded, setExpanded] = useState(level < 2) // Auto-expand first 2 levels

  const isObject = (val) => val !== null && typeof val === 'object'
  const isArray = Array.isArray(data)
  const isEmpty = isArray ? data.length === 0 : Object.keys(data).length === 0

  const toggleExpand = () => {
    setExpanded(!expanded)
  }

  if (!isObject(data)) {
    // Primitive value
    return (
      <div className="json-node primitive">
        <span className="json-key">{dataKey}:</span>
        <span className={`json-value ${typeof data}`}>
          {typeof data === 'string' ? `"${data}"` : String(data)}
        </span>
      </div>
    )
  }

  const entries = isArray 
    ? data.map((item, idx) => [idx, item])
    : Object.entries(data)

  return (
    <div className="json-node object" style={{ paddingLeft: level === 0 ? 0 : '20px' }}>
      <div className="node-header" onClick={toggleExpand} style={{ cursor: 'pointer' }}>
        <span className="expand-icon">
          {isEmpty ? (
            <span className="placeholder"></span>
          ) : (
            expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
          )}
        </span>
        <span className="json-key">{dataKey}:</span>
        <span className="json-type">
          {isArray ? `[${data.length}]` : `{${Object.keys(data).length}}`}
        </span>
      </div>

      {expanded && !isEmpty && (
        <div className="node-children">
          {entries.map(([key, value], index) => (
            <div key={index} className="child-node">
              {isObject(value) ? (
                <JsonTree data={value} dataKey={key} level={level + 1} />
              ) : (
                <div className="json-node primitive">
                  <span className="json-key">{key}:</span>
                  <span className={`json-value ${typeof value}`}>
                    {typeof value === 'string' ? `"${value}"` : String(value)}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {expanded && isEmpty && (
        <div className="node-empty">
          {isArray ? '[]' : '{}'}
        </div>
      )}
    </div>
  )
}

export default JsonTree
