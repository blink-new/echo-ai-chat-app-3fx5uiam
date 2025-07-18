import { Button } from '@/components/ui/button'
import { blink } from '@/blink/client'

interface LandingPageProps {
  onEnter: () => void
}

export function LandingPage({ onEnter }: LandingPageProps) {
  const handleEnterEcho = () => {
    blink.auth.login()
  }

  return (
    <div className="gradient-bg min-h-screen flex items-center justify-center">
      <div className="text-center space-y-8 max-w-2xl mx-auto px-6">
        {/* Logo */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
            Echo
          </h1>
          <p className="text-xl md:text-2xl text-white/70 leading-relaxed">
            Your AI-powered interview companion. Upload documents, practice with voice, 
            and get personalized insights.
          </p>
        </div>

        {/* CTA */}
        <div className="pt-8">
          <Button
            onClick={handleEnterEcho}
            size="lg"
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-xl px-8 py-4 text-lg font-medium rounded-full transition-all duration-300 hover:scale-105"
          >
            Enter Echo
          </Button>
        </div>

        {/* Features hint */}
        <div className="pt-12 text-white/50 text-sm space-y-2">
          <p>✨ AI-powered interview preparation</p>
          <p>🎙️ Voice-to-text recording</p>
          <p>📄 Document analysis & insights</p>
        </div>
      </div>
    </div>
  )
}