import { Button } from "@/components/ui/button"

interface RoleToggleProps {
  role: 'candidate' | 'recruiter'
  onRoleChange: (role: 'candidate' | 'recruiter') => void
}

export function RoleToggle({ role, onRoleChange }: RoleToggleProps) {
  return (
    <div className="fixed top-4 sm:top-6 left-3 sm:left-6 z-50">
      <div className="glass-card p-1 flex rounded-full">
        <Button
          variant={role === 'candidate' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onRoleChange('candidate')}
          className={`rounded-full px-2 sm:px-4 py-2 text-xs font-medium transition-all ${
            role === 'candidate' 
              ? 'bg-white/20 text-white shadow-lg' 
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          <span className="hidden sm:inline">Candidate</span>
          <span className="sm:hidden">C</span>
        </Button>
        <Button
          variant={role === 'recruiter' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onRoleChange('recruiter')}
          className={`rounded-full px-2 sm:px-4 py-2 text-xs font-medium transition-all ${
            role === 'recruiter' 
              ? 'bg-white/20 text-white shadow-lg' 
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          <span className="hidden sm:inline">Recruiter</span>
          <span className="sm:hidden">R</span>
        </Button>
      </div>
    </div>
  )
}