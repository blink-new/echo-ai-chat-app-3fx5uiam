import { useState } from 'react'
import { Settings, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CanvasArea } from './CanvasArea'
import { ChatBar } from './ChatBar'
import { InterviewsFAB } from './InterviewsFAB'
import { IntegrationsDrawer } from './IntegrationsDrawer'
import { InterviewsSheet } from './InterviewsSheet'

interface WorkspaceProps {
  user: any
}

export function Workspace({ user }: WorkspaceProps) {
  const [integrationsOpen, setIntegrationsOpen] = useState(false)
  const [interviewsOpen, setInterviewsOpen] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleFileUpload = (file: File) => {
    setUploadedFile(file)
  }

  const handleRemoveFile = () => {
    setUploadedFile(null)
  }

  return (
    <div className="gradient-bg-simplified min-h-screen relative">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <h1 className="text-2xl font-bold text-white">Echo</h1>
        
        <Button
          onClick={() => setIntegrationsOpen(true)}
          variant="ghost"
          size="icon"
          className="text-white/70 hover:text-white hover:bg-white/10"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </header>

      {/* Main Canvas Area */}
      <div className="px-6 pb-32">
        <CanvasArea 
          onFileUpload={handleFileUpload}
          uploadedFile={uploadedFile}
          onRemoveFile={handleRemoveFile}
        />
      </div>

      {/* Chat Bar - Fixed to bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/20 to-transparent backdrop-blur-sm">
        <ChatBar uploadedFile={uploadedFile} />
      </div>

      {/* Interviews FAB */}
      <InterviewsFAB onClick={() => setInterviewsOpen(true)} />

      {/* Drawers */}
      <IntegrationsDrawer 
        open={integrationsOpen}
        onOpenChange={setIntegrationsOpen}
      />
      
      <InterviewsSheet
        open={interviewsOpen}
        onOpenChange={setInterviewsOpen}
      />
    </div>
  )
}