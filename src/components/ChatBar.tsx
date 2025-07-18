import { useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { VoiceButton } from './VoiceButton'
import { blink } from '@/blink/client'

interface ChatBarProps {
  uploadedFile: File | null
}

export function ChatBar({ uploadedFile }: ChatBarProps) {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    setIsLoading(true)
    
    try {
      // Use Blink AI to generate response
      const { text } = await blink.ai.generateText({
        prompt: `User message: ${input}${uploadedFile ? `\n\nContext: User has uploaded a file named "${uploadedFile.name}"` : ''}`,
        model: 'gpt-4o-mini'
      })
      
      console.log('AI Response:', text)
      // TODO: Handle the response in a chat interface
      
    } catch (error) {
      console.error('Error generating response:', error)
    } finally {
      setIsLoading(false)
      setInput('')
    }
  }

  const handleVoiceTranscript = (transcript: string) => {
    setInput(transcript)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="glass-card-light rounded-full p-2 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your files, practice interviews, or get insights..."
          className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/50 px-4 py-2"
          disabled={isLoading}
        />
        
        <VoiceButton 
          onTranscript={handleVoiceTranscript}
          disabled={isLoading}
        />
        
        <Button
          type="submit"
          size="icon"
          disabled={!input.trim() || isLoading}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full flex-shrink-0"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}