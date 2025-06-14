import CampaignBuilder from './CampaignBuilder/CampaignBuilder'
import { ReactFlowProvider } from '@xyflow/react'
import EmailEditor from './CampaignBuilder/EmailEditor'

function App() {
  return (
    <ReactFlowProvider>
      <div style={ { width: "100vw", height: "100vh", position: "relative" } }>
        {/* <CampaignBuilder /> */}
        <EmailEditor />
      </div>
    </ReactFlowProvider>
  )
}

export default App
