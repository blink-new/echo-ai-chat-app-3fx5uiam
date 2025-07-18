import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { VoiceButton } from './VoiceButton'
import { StoryboardCard } from './StoryboardCard'

interface StoryboardItem {
  id: string
  type: 'tech-grid' | 'timeline' | 'list' | 'chart' | 'image' | 'url-card' | 'message'
  content: any
  timestamp: Date
}

interface StoryboardCanvasProps {
  role: 'candidate' | 'recruiter'
  uploadedFile: File | null
}

export function StoryboardCanvas({ role, uploadedFile }: StoryboardCanvasProps) {
  const [storyboardItems, setStoryboardItems] = useState<StoryboardItem[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (canvasRef.current) {
      canvasRef.current.scrollTop = canvasRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [storyboardItems])

  // Add initial welcome message
  useEffect(() => {
    const welcomeItem: StoryboardItem = {
      id: '1',
      type: 'message',
      content: {
        text: role === 'candidate' 
          ? "Welcome! Share your work story and I'll help build your professional narrative visually."
          : "Welcome to this candidate's professional portal. Ask specific questions to explore their experience."
      },
      timestamp: new Date()
    }
    
    setStoryboardItems([welcomeItem])
  }, [role])

  const generateStoryboardResponse = (query: string): StoryboardItem => {
    const lowerQuery = query.toLowerCase()
    
    // Include file context if available
    const fileContext = uploadedFile ? `\n\nNote: User has uploaded "${uploadedFile.name}" (${(uploadedFile.size / 1024 / 1024).toFixed(1)} MB)` : ''
    
    // Tech skills query
    if (lowerQuery.includes('tech') || lowerQuery.includes('skill') || lowerQuery.includes('language') || lowerQuery.includes('framework')) {
      return {
        id: Date.now().toString(),
        type: 'tech-grid',
        content: {
          title: 'Technical Competencies',
          technologies: [
            { name: 'TypeScript', icon: '⚡', level: 'Expert', years: '4+' },
            { name: 'React', icon: '⚛️', level: 'Expert', years: '5+' },
            { name: 'Node.js', icon: '🟢', level: 'Advanced', years: '3+' },
            { name: 'PostgreSQL', icon: '🐘', level: 'Advanced', years: '3+' },
            { name: 'Redis', icon: '🔴', level: 'Intermediate', years: '2+' },
            { name: 'Docker', icon: '🐳', level: 'Intermediate', years: '2+' },
            { name: 'AWS', icon: '☁️', level: 'Intermediate', years: '2+' },
            { name: 'GraphQL', icon: '🔗', level: 'Advanced', years: '2+' }
          ]
        },
        timestamp: new Date()
      }
    }
    
    // Experience/timeline query
    if (lowerQuery.includes('experience') || lowerQuery.includes('work') || lowerQuery.includes('career') || lowerQuery.includes('history')) {
      return {
        id: Date.now().toString(),
        type: 'timeline',
        content: {
          title: 'Professional Experience',
          events: [
            {
              title: 'Senior Frontend Engineer',
              company: 'TechCorp',
              period: '2022 - Present',
              description: 'Led development of React-based dashboard serving 10k+ users',
              achievements: ['Reduced load time by 40%', 'Mentored 3 junior developers']
            },
            {
              title: 'Full Stack Developer',
              company: 'StartupXYZ',
              period: '2020 - 2022',
              description: 'Built scalable web applications using Node.js and React',
              achievements: ['Launched 5 major features', 'Improved API performance by 60%']
            },
            {
              title: 'Frontend Developer',
              company: 'WebAgency',
              period: '2019 - 2020',
              description: 'Developed responsive websites for various clients',
              achievements: ['Delivered 15+ projects on time', 'Achieved 98% client satisfaction']
            }
          ]
        },
        timestamp: new Date()
      }
    }
    
    // Projects query
    if (lowerQuery.includes('project') || lowerQuery.includes('portfolio') || lowerQuery.includes('built')) {
      return {
        id: Date.now().toString(),
        type: 'list',
        content: {
          title: 'Key Projects',
          items: [
            {
              name: 'E-commerce Platform',
              description: 'Full-stack marketplace with 50k+ active users',
              tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
              impact: '$2M+ in transactions processed'
            },
            {
              name: 'Analytics Dashboard',
              description: 'Real-time data visualization for business metrics',
              tech: ['Vue.js', 'D3.js', 'Python', 'Redis'],
              impact: '40% improvement in decision-making speed'
            },
            {
              name: 'Mobile App',
              description: 'Cross-platform productivity app',
              tech: ['React Native', 'Firebase', 'TypeScript'],
              impact: '25k+ downloads, 4.8★ rating'
            }
          ]
        },
        timestamp: new Date()
      }
    }
    
    // Default message response
    return {
      id: Date.now().toString(),
      type: 'message',
      content: {
        text: `I understand you're asking about "${query}". Let me help you explore this candidate's background in that area. Feel free to ask more specific questions about their technical skills, experience, or projects.${fileContext}`
      },
      timestamp: new Date()
    }
  }

  const handleSendMessage = async (messageContent: string) => {
    if (!messageContent.trim() || isLoading) return

    setIsLoading(true)

    // Add user query as a message
    const userItem: StoryboardItem = {
      id: Date.now().toString(),
      type: 'message',
      content: { text: messageContent, isUser: true },
      timestamp: new Date()
    }

    setStoryboardItems(prev => [...prev, userItem])
    setInput('')

    // Simulate processing time
    setTimeout(() => {
      const responseItem = generateStoryboardResponse(messageContent)
      setStoryboardItems(prev => [...prev, responseItem])
      setIsLoading(false)
    }, 1500)
  }

  const handleVoiceTranscript = (transcript: string) => {
    setInput(transcript)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(input)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Canvas Area */}
      <div 
        ref={canvasRef}
        className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6 min-h-[50vh] sm:min-h-[60vh] max-h-[70vh]"
      >
        {storyboardItems.map((item) => (
          <StoryboardCard key={item.id} item={item} />
        ))}
        
        {isLoading && (
          <div className="flex justify-center py-4 sm:py-8">
            <div className="glass-card p-4 sm:p-6 rounded-2xl">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-white/70 text-xs sm:text-sm">Building your storyboard...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chat Input - Fixed at bottom */}
      <div className="p-3 sm:p-4 lg:p-6 border-t border-white/10">
        <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={role === 'candidate' ? "Tell me about your work, projects, or skills..." : "Ask about this candidate's experience, skills, or projects..."}
              className="w-full bg-white/5 border border-white/10 rounded-full px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent backdrop-blur-sm"
              disabled={isLoading}
            />
          </div>
          
          <VoiceButton 
            onTranscript={handleVoiceTranscript}
            disabled={isLoading}
          />
          
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 sm:p-4 flex-shrink-0"
          >
            <Send className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}