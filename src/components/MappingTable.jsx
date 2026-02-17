import { useMemo } from 'react'
import '../assets/css/MappingTable.css'

function MappingTable({ leftJson, rightJson, mappings = {}, onMappingsChange }) {

  // Helper function to format field path as JSON node hierarchy
  const formatFieldAsNode = (fieldPath) => {
    const parts = fieldPath.split('.')
    const depth = parts.length - 1
    // Use non-breaking space and tree characters for hierarchy
    const indent = '┗\u00A0'.repeat(depth)
    const lastKey = parts.pop()
    return { display: `${indent}${lastKey}`, sortKey: fieldPath }
  }

  // Extract all unique field names from left JSON (only leaf nodes)
  const leftFields = useMemo(() => {
    if (!leftJson.trim()) return []
    
    try {
      const parsed = JSON.parse(leftJson)
      const fields = new Set()
      
      const extractFields = (obj, prefix = '') => {
        if (obj === null || obj === undefined) return
        
        if (typeof obj === 'object') {
          if (Array.isArray(obj)) {
            obj.forEach((item, index) => {
              extractFields(item, prefix ? `${prefix}[${index}]` : `[${index}]`)
            })
          } else {
            Object.keys(obj).forEach(key => {
              const fieldPath = prefix ? `${prefix}.${key}` : key
              const value = obj[key]
              // Only add if it's a leaf node (primitive value)
              if (value === null || typeof value !== 'object') {
                fields.add(fieldPath)
              } else {
                // Recurse into objects and arrays
                extractFields(value, fieldPath)
              }
            })
          }
        } else {
          // Add primitive values
          if (prefix) {
            fields.add(prefix)
          }
        }
      }
      
      extractFields(parsed)
      return Array.from(fields).sort()
    } catch (err) {
      return []
    }
  }, [leftJson])

  // Extract all field names from right JSON for mapping (all nodes with metadata)
  const rightFieldsData = useMemo(() => {
    if (!rightJson.trim()) return { fields: [], containers: new Set() }
    
    try {
      const parsed = JSON.parse(rightJson)
      const fields = new Set()
      const containers = new Set()
      
      const extractFields = (obj, prefix = '') => {
        if (obj === null || obj === undefined) return
        
        if (typeof obj === 'object') {
          if (Array.isArray(obj)) {
            // Mark array node as container if it has a prefix
            if (prefix) {
              containers.add(prefix)
              fields.add(prefix)
            }
            obj.forEach((item, index) => {
              extractFields(item, prefix ? `${prefix}[${index}]` : `[${index}]`)
            })
          } else {
            Object.keys(obj).forEach(key => {
              const fieldPath = prefix ? `${prefix}.${key}` : key
              const value = obj[key]
              // Check if this is an object/array (container)
              if (value !== null && typeof value === 'object') {
                containers.add(fieldPath)
                fields.add(fieldPath)
                // Recurse into objects and arrays
                extractFields(value, fieldPath)
              } else {
                // Leaf node
                fields.add(fieldPath)
              }
            })
          }
        } else {
          // Add primitive values
          if (prefix) {
            fields.add(prefix)
          }
        }
      }
      
      extractFields(parsed)
      return { fields: Array.from(fields).sort(), containers }
    } catch (err) {
      return { fields: [], containers: new Set() }
    }
  }, [rightJson])

  const rightFields = rightFieldsData.fields
  const containerFields = rightFieldsData.containers

  const handleFieldSelect = (leftField, rightField) => {
    const newMappings = {
      ...mappings,
      [leftField]: rightField === mappings[leftField] ? '' : rightField
    }
    if (onMappingsChange) {
      onMappingsChange(newMappings)
    }
  }

  if (leftFields.length === 0) {
    return null
  }

  return (
    <div className="mapping-table-container">
      <div className="mapping-header">
        <h3>Field Mapping</h3>
        <p>{leftFields.length} fields detected</p>
      </div>
      
      <div className="table-wrapper">
        <table className="mapping-table">
          <thead>
            <tr>
              <th>Source Fields (Left)</th>
              <th>Target Fields (Right)</th>
            </tr>
          </thead>
          <tbody>
            {leftFields.map((field, index) => (
              <tr key={index}>
                <td className="source-field">
                  <span className="field-name">{field}</span>
                </td>
                <td className="target-field">
                  <select 
                    value={mappings[field] || ''}
                    onChange={(e) => handleFieldSelect(field, e.target.value)}
                    className="field-select"
                  >
                    <option value="">-- Select field --</option>
                    {rightFields.map((rField, rIdx) => {
                      const nodeInfo = formatFieldAsNode(rField)
                      const isContainer = containerFields.has(rField)
                      return (
                        <option 
                          key={rIdx} 
                          value={rField} 
                          title={rField}
                          disabled={isContainer}
                          className={isContainer ? 'container-option' : ''}
                        >
                          {nodeInfo.display}
                        </option>
                      )
                    })}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MappingTable
