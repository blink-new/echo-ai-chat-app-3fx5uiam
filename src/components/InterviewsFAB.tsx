import { Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface InterviewsFABProps {
  onClick: () => void
}

export function InterviewsFAB({ onClick }: InterviewsFABProps) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-28 sm:bottom-32 right-3 sm:right-6 bg-gray-600/80 hover:bg-gray-500/80 text-white/90 rounded-full p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/10"
      size="icon"
    >
      <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
    </Button>
  )
}