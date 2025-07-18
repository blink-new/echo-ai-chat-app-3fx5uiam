import { useState, useEffect } from 'react'
import { Calendar, Clock, Building, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'

interface Interview {
  id: string
  company: string
  roleTitle: string
  datetime: string
  status: 'scheduled' | 'done' | 'cancelled'
}

interface InterviewsSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function InterviewsSheet({ open, onOpenChange }: InterviewsSheetProps) {
  const [interviews, setInterviews] = useState<Interview[]>([])

  useEffect(() => {
    // Mock data - in real app this would come from Blink DB
    const mockInterviews: Interview[] = [
      {
        id: '1',
        company: 'Workday',
        roleTitle: 'Senior Frontend Engineer',
        datetime: '2025-07-29T15:00:00Z',
        status: 'scheduled'
      },
      {
        id: '2',
        company: 'Retool',
        roleTitle: 'Full Stack Developer',
        datetime: '2025-07-31T11:00:00Z',
        status: 'scheduled'
      },
      {
        id: '3',
        company: 'Stripe',
        roleTitle: 'React Developer',
        datetime: '2025-08-02T14:30:00Z',
        status: 'scheduled'
      }
    ]
    
    setInterviews(mockInterviews)
  }, [])

  const formatDateTime = (datetime: string) => {
    const date = new Date(datetime)
    return {
      date: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500/20 text-blue-400'
      case 'done': return 'bg-green-500/20 text-green-400'
      case 'cancelled': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="glass-card border-white/10 text-white w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Interviews
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
          {interviews.length === 0 ? (
            <div className="text-center py-12 text-white/60">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No interviews scheduled</p>
              <Button
                variant="outline"
                className="mt-4 border-white/20 text-white hover:bg-white/10"
              >
                <Plus className="h-4 w-4 mr-2" />
                Schedule Interview
              </Button>
            </div>
          ) : (
            interviews.map((interview) => {
              const { date, time } = formatDateTime(interview.datetime)
              
              return (
                <div
                  key={interview.id}
                  className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <Building className="h-4 w-4 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{interview.company}</h3>
                        <p className="text-white/70 text-sm">{interview.roleTitle}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(interview.status)}>
                      {interview.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-white/60 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{time}</span>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}