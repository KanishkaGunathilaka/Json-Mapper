import { useState } from 'react'
import JsonPanel from './components/JsonPanel'
import MappingTable from './components/MappingTable'
import ImplementationPlan from './components/ImplementationPlan'
import './assets/css/App.css'

function App() {
  const [leftJson, setLeftJson] = useState('')
  const [rightJson, setRightJson] = useState('')
  const [mappings, setMappings] = useState({})

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>JSON Mapper</h1>
        <p>Side-by-side JSON comparison and visualization</p>
      </header>
      
      <div className="split-view">
        <JsonPanel 
          title="Source JSON"
          jsonString={leftJson}
          onJsonChange={setLeftJson}
        />
        <JsonPanel 
          title="Target JSON"
          jsonString={rightJson}
          onJsonChange={setRightJson}
        />
      </div>

      <MappingTable 
        leftJson={leftJson} 
        rightJson={rightJson} 
        mappings={mappings}
        onMappingsChange={setMappings}
      />

      <ImplementationPlan mappings={mappings} leftJson={leftJson} rightJson={rightJson} />
    </div>
  )
}

export default App
