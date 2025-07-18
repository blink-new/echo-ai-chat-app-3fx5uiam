import { useState, useEffect } from 'react'
import { Calendar, Clock, Building } from 'lucide-react'

interface Interview {
  company: string
  date: string
  time: string
  type: string
}

interface InterviewsBannerProps {
  role: 'candidate' | 'recruiter'
}

export function InterviewsBanner({ role }: InterviewsBannerProps) {
  const [interviews, setInterviews] = useState<Interview[]>([])

  useEffect(() => {
    // Mock data - in real app this would come from an API
    const mockInterviews: Interview[] = role === 'candidate' ? [
      { company: 'Workday', date: '2025-07-29', time: '15:00', type: 'Technical' },
      { company: 'Retool', date: '2025-07-31', time: '11:00', type: 'Final Round' },
      { company: 'Stripe', date: '2025-08-02', time: '14:30', type: 'System Design' },
    ] : [
      { company: 'Senior Frontend Engineer', date: '2025-07-29', time: '15:00', type: 'Technical' },
      { company: 'Full Stack Developer', date: '2025-07-31', time: '11:00', type: 'Behavioral' },
      { company: 'React Developer', date: '2025-08-02', time: '14:30', type: 'Code Review' },
    ]
    
    setInterviews(mockInterviews)
  }, [role])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <div className="glass-card rounded-2xl p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-5 w-5 text-blue-400" />
        <h2 className="text-white font-semibold">
          {role === 'candidate' ? 'Upcoming Interviews' : 'Interview Schedule'}
        </h2>
      </div>
      
      <div className="space-y-3">
        {interviews.map((interview, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Building className="h-4 w-4 text-purple-400" />
              </div>
              <div>
                <p className="text-white font-medium">{interview.company}</p>
                <p className="text-white/60 text-sm">{interview.type}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-white/70">
              <Clock className="h-4 w-4" />
              <span className="text-sm">
                {formatDate(interview.date)} at {interview.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}