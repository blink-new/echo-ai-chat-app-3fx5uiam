import { useState, useRef, useEffect } from 'react'
import { Mic, MicOff } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface VoiceButtonProps {
  onTranscript: (transcript: string) => void
  disabled?: boolean
}

export function VoiceButton({ onTranscript, disabled }: VoiceButtonProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      setIsSupported(true)
      recognitionRef.current = new SpeechRecognition()
      
      const recognition = recognitionRef.current
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        onTranscript(transcript)
        setIsRecording(false)
      }

      recognition.onerror = () => {
        setIsRecording(false)
      }

      recognition.onend = () => {
        setIsRecording(false)
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [onTranscript])

  const toggleRecording = () => {
    if (!recognitionRef.current || disabled) return

    if (isRecording) {
      recognitionRef.current.stop()
      setIsRecording(false)
    } else {
      recognitionRef.current.start()
      setIsRecording(true)
    }
  }

  if (!isSupported) {
    return (
      <Button
        variant="ghost"
        size="icon"
        disabled
        className="text-white/40 cursor-not-allowed"
      >
        <MicOff className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleRecording}
        disabled={disabled}
        className={`relative text-white/70 hover:text-white hover:bg-white/10 transition-all ${
          isRecording ? 'text-red-400 hover:text-red-300' : ''
        }`}
      >
        {isRecording ? (
          <MicOff className="h-5 w-5" />
        ) : (
          <Mic className="h-5 w-5" />
        )}
      </Button>
      
      {isRecording && (
        <div className="absolute inset-0 rounded-full border-2 border-red-400 pulse-ring"></div>
      )}
    </div>
  )
}