import CampaignBuilder from './CampaignBuilder/CampaignBuilder'
import { ReactFlowProvider } from '@xyflow/react'

function App() {
  return (
    <ReactFlowProvider>
      <div style={ { width: "100vw", height: "100vh", position: "relative" } }>
        <CampaignBuilder />
      </div>
    </ReactFlowProvider>
  )
}

export default App
