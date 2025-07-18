import { useState, useEffect } from 'react'
import { FolderOpen, Github, Figma, Globe, Plus, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'

interface Project {
  id: string
  name: string
  type: 'github' | 'figma' | 'website' | 'other'
  url: string
  description: string
  status: 'active' | 'completed' | 'archived'
  lastUpdated: string
}

interface ProjectsSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProjectsSheet({ open, onOpenChange }: ProjectsSheetProps) {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    // Mock data - in real app this would come from Blink DB
    const mockProjects: Project[] = [
      {
        id: '1',
        name: 'E-commerce Dashboard',
        type: 'github',
        url: 'https://github.com/user/ecommerce-dashboard',
        description: 'React-based admin dashboard with real-time analytics',
        status: 'active',
        lastUpdated: '2025-07-15T10:30:00Z'
      },
      {
        id: '2',
        name: 'Mobile App Design System',
        type: 'figma',
        url: 'https://figma.com/file/mobile-design-system',
        description: 'Complete design system for iOS and Android apps',
        status: 'completed',
        lastUpdated: '2025-07-10T14:20:00Z'
      },
      {
        id: '3',
        name: 'Portfolio Website',
        type: 'website',
        url: 'https://johndoe.dev',
        description: 'Personal portfolio showcasing recent work and projects',
        status: 'active',
        lastUpdated: '2025-07-12T09:15:00Z'
      }
    ]
    
    setProjects(mockProjects)
  }, [])

  const getProjectIcon = (type: string) => {
    switch (type) {
      case 'github': return <Github className="h-4 w-4 text-gray-400" />
      case 'figma': return <Figma className="h-4 w-4 text-purple-400" />
      case 'website': return <Globe className="h-4 w-4 text-blue-400" />
      default: return <FolderOpen className="h-4 w-4 text-green-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400'
      case 'completed': return 'bg-blue-500/20 text-blue-400'
      case 'archived': return 'bg-gray-500/20 text-gray-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="glass-card border-white/10 text-white w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              Projects
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {projects.length === 0 ? (
            <div className="text-center py-12 text-white/60">
              <FolderOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No projects added yet</p>
              <Button
                variant="outline"
                className="mt-4 border-white/20 text-white hover:bg-white/10"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </div>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      {getProjectIcon(project.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white flex items-center gap-2">
                        {project.name}
                        <ExternalLink 
                          className="h-3 w-3 text-white/40 opacity-0 group-hover:opacity-100 transition-opacity" 
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(project.url, '_blank')
                          }}
                        />
                      </h3>
                      <p className="text-white/70 text-sm">{project.description}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-white/60 text-sm">
                  <span className="capitalize">{project.type}</span>
                  <span>Updated {formatDate(project.lastUpdated)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}