import { useMemo } from 'react'
import { Copy, Check, Download } from 'lucide-react'
import { useState } from 'react'
import './ImplementationPlan.css'

function ImplementationPlan({ mappings, leftJson, rightJson }) {
  const [copied, setCopied] = useState(false)

  const implementationPlanText = useMemo(() => {
    if (!Object.keys(mappings).length) {
      return '## Field Mappings\n\nNo field mappings configured yet. Create mappings in the table above to generate the implementation plan.'
    }

    let plan = '## Field Mappings\n\n'
    plan += '| Source Field (Left) | Target Field (Right) | Status |\n'
    plan += '|---|---|---|\n'

    Object.entries(mappings).forEach(([sourceField, targetField]) => {
      if (targetField) {
        const status = targetField ? '✓ Mapped' : '○ Pending'
        plan += `| \`${sourceField}\` | \`${targetField}\` | ${status} |\n`
      }
    })

    return plan
  }, [mappings])

  const handleCopy = () => {
    navigator.clipboard.writeText(implementationPlanText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([implementationPlanText], { type: 'text/markdown' })
    element.href = URL.createObjectURL(file)
    element.download = 'field-mapping-plan.md'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  if (!leftJson.trim() && !rightJson.trim()) {
    return null
  }

  return (
    <div className="implementation-plan-container">
      <div className="plan-header">
        <h3>Implementation Plan</h3>
        <div className="plan-actions">
          <button onClick={handleCopy} className="plan-btn copy-btn">
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button onClick={handleDownload} className="plan-btn download-btn">
            <Download size={16} />
            Download
          </button>
        </div>
      </div>
      
      <textarea 
        value={implementationPlanText}
        readOnly
        className="plan-output"
        spellCheck="false"
      />
    </div>
  )
}

export default ImplementationPlan
