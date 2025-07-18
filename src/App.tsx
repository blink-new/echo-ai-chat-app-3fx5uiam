import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { RoleToggle } from '@/components/RoleToggle'
import { IntegrationsDrawer } from '@/components/IntegrationsDrawer'
import { DropZone } from '@/components/DropZone'
import { StoryboardCanvas } from '@/components/StoryboardCanvas'
import { InterviewsFAB } from '@/components/InterviewsFAB'
import { InterviewsSheet } from '@/components/InterviewsSheet'
import { ProjectsFAB } from '@/components/ProjectsFAB'
import { ProjectsSheet } from '@/components/ProjectsSheet'
import { Zap } from 'lucide-react'

function App() {
  const [role, setRole] = useState<'candidate' | 'recruiter'>('candidate')
  const [integrationsOpen, setIntegrationsOpen] = useState(false)
  const [interviewsOpen, setInterviewsOpen] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleFileUpload = (file: File) => {
    setUploadedFile(file)
  }

  const handleRemoveFile = () => {
    setUploadedFile(null)
  }

  return (
    <div className="gradient-bg min-h-screen relative">
      {/* Role Toggle */}
      <RoleToggle role={role} onRoleChange={setRole} />
      
      {/* Connect Button */}
      <div className="fixed top-4 sm:top-6 right-3 sm:right-6 z-50">
        <Button
          onClick={() => setIntegrationsOpen(true)}
          className="glass-card border-white/20 text-white hover:bg-white/10 px-3 sm:px-4 py-2 text-sm"
          variant="outline"
        >
          <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Connect</span>
        </Button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl h-screen flex flex-col">
        {/* Header */}
        <div className="text-center space-y-4 sm:space-y-6 mb-6 sm:mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 sm:mb-4 tracking-tight">
            Echo
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light px-4">
            {role === 'candidate' 
              ? 'Share your work story. Build your professional narrative as you go.'
              : 'Access this candidate\'s professional portal. Ask specific questions about their experience.'
            }
          </p>
        </div>

        {/* File Upload - Always visible but compact when file uploaded */}
        <div className="mb-4 sm:mb-6">
          <DropZone 
            onFileUpload={handleFileUpload}
            uploadedFile={uploadedFile}
            onRemoveFile={handleRemoveFile}
            role={role}
          />
        </div>

        {/* Storyboard Canvas - Takes remaining space */}
        <div className="flex-1 min-h-0">
          <StoryboardCanvas role={role} uploadedFile={uploadedFile} />
        </div>
      </div>

      {/* FAB Buttons */}
      <InterviewsFAB onClick={() => setInterviewsOpen(true)} />
      <ProjectsFAB onClick={() => setProjectsOpen(true)} />

      {/* Drawers/Sheets */}
      <IntegrationsDrawer 
        open={integrationsOpen} 
        onOpenChange={setIntegrationsOpen} 
      />
      <InterviewsSheet 
        open={interviewsOpen} 
        onOpenChange={setInterviewsOpen} 
      />
      <ProjectsSheet 
        open={projectsOpen} 
        onOpenChange={setProjectsOpen} 
      />
    </div>
  )
}

export default App