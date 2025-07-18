import { useState, useRef, useEffect } from 'react'
import { Send, User, Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { VoiceButton } from './VoiceButton'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatInterfaceProps {
  role: 'candidate' | 'recruiter'
  uploadedFile: File | null
}

export function ChatInterface({ role, uploadedFile }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Add initial message based on role
  useEffect(() => {
    const initialMessage: Message = {
      id: '1',
      role: 'assistant',
      content: role === 'candidate' 
        ? "Hi! I'm here to help you build and share your professional story. Tell me about what you're working on, projects you've completed, or experiences you'd like to capture. I'll help organize and maintain your narrative as you go."
        : "Welcome to this candidate's professional portal. I have access to their complete work story, projects, and experience. Ask me specific questions about their background, technical skills, project experience, or anything else you'd like to know before your interview.",
      timestamp: new Date()
    }
    
    setMessages([initialMessage])
  }, [role])

  const handleSendMessage = async (messageContent: string) => {
    if (!messageContent.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageContent,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: role === 'candidate' 
          ? `That's great! I've captured that information${uploadedFile ? ` along with your uploaded document (${uploadedFile.name})` : ''}. This adds to your professional narrative. Would you like to share more about this project, or tell me about something else you're working on?`
          : `Based on this candidate's profile${uploadedFile ? ` and the uploaded context (${uploadedFile.name})` : ''}, here's what I can tell you: This candidate has demonstrated strong experience in the areas you're asking about. They show consistent growth and have worked on relevant projects that align with your requirements.`,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiResponse])
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

  const getCandidateInfo = () => {
    if (role === 'recruiter') {
      return (
        <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
            JS
          </div>
          <div>
            <p className="text-white text-sm font-medium">John Smith</p>
            <p className="text-white/60 text-xs">Senior Frontend Engineer</p>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="glass-card rounded-2xl flex flex-col h-[500px]">
      {/* Candidate Info for Recruiters */}
      {getCandidateInfo()}
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <div className="p-2 bg-blue-500/20 rounded-full flex-shrink-0">
                <Bot className="h-4 w-4 text-blue-400" />
              </div>
            )}
            
            <div
              className={`max-w-[80%] p-4 rounded-2xl ${
                message.role === 'user'
                  ? 'bg-white/10 text-white ml-auto'
                  : 'bg-white/5 text-white/90'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
              <p className="text-xs text-white/50 mt-2">
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
            
            {message.role === 'user' && (
              <div className="p-2 bg-white/10 rounded-full flex-shrink-0">
                <User className="h-4 w-4 text-white/70" />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="p-2 bg-blue-500/20 rounded-full flex-shrink-0">
              <Bot className="h-4 w-4 text-blue-400" />
            </div>
            <div className="bg-white/5 text-white/90 p-4 rounded-2xl">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-6 border-t border-white/10">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={role === 'candidate' ? "Share what you're working on..." : "Ask about this candidate's experience..."}
              className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent"
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
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}