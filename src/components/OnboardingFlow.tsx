import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { UserCheck, Briefcase, Play } from 'lucide-react'

interface OnboardingFlowProps {
  user: any
  onComplete: () => void
}

export function OnboardingFlow({ user, onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(1)
  const [selectedRole, setSelectedRole] = useState<'candidate' | 'recruiter'>('candidate')

  const handleRoleSelect = (role: 'candidate' | 'recruiter') => {
    setSelectedRole(role)
    setStep(2)
  }

  const handleSkipTour = () => {
    // TODO: Save user profile with selected role
    onComplete()
  }

  const handleWatchTour = () => {
    // TODO: Show tour, then complete
    setTimeout(() => {
      onComplete()
    }, 2000) // Simulate tour
  }

  return (
    <div className="gradient-bg min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl mx-auto">
        {step === 1 && (
          <Card className="glass-card p-8 text-center space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">Welcome to Echo!</h2>
              <p className="text-white/70 text-lg">
                Hi {user.email}! Let's get you set up. What's your role?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
              <Button
                onClick={() => handleRoleSelect('candidate')}
                variant="outline"
                className="glass-card border-white/20 text-white hover:bg-white/10 p-6 h-auto flex flex-col gap-3"
              >
                <UserCheck className="h-8 w-8 text-blue-400" />
                <div>
                  <div className="font-semibold">I'm a Candidate</div>
                  <div className="text-sm text-white/60">
                    Prepare for interviews, get feedback
                  </div>
                </div>
              </Button>

              <Button
                onClick={() => handleRoleSelect('recruiter')}
                variant="outline"
                className="glass-card border-white/20 text-white hover:bg-white/10 p-6 h-auto flex flex-col gap-3"
              >
                <Briefcase className="h-8 w-8 text-purple-400" />
                <div>
                  <div className="font-semibold">I'm a Recruiter</div>
                  <div className="text-sm text-white/60">
                    Analyze candidates, get insights
                  </div>
                </div>
              </Button>
            </div>
          </Card>
        )}

        {step === 2 && (
          <Card className="glass-card p-8 text-center space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">Quick Tour</h2>
              <p className="text-white/70 text-lg">
                Want to see how Echo works? This takes just 20 seconds.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                onClick={handleWatchTour}
                className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
              >
                <Play className="h-4 w-4" />
                Watch Quick Tour
              </Button>
              
              <Button
                onClick={handleSkipTour}
                variant="outline"
                className="glass-card border-white/20 text-white hover:bg-white/10"
              >
                Skip Tour
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}