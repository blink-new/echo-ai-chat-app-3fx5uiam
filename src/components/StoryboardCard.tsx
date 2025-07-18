import { Clock, User, Briefcase, Calendar, ExternalLink, TrendingUp } from 'lucide-react'

interface StoryboardItem {
  id: string
  type: 'tech-grid' | 'timeline' | 'list' | 'chart' | 'image' | 'url-card' | 'message'
  content: any
  timestamp: Date
}

interface StoryboardCardProps {
  item: StoryboardItem
}

export function StoryboardCard({ item }: StoryboardCardProps) {
  const renderContent = () => {
    switch (item.type) {
      case 'tech-grid':
        return (
          <div className="glass-card p-4 sm:p-6 rounded-2xl">
            <h3 className="text-white font-semibold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
              {item.content.title}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {item.content.technologies.map((tech: any, index: number) => (
                <div key={index} className="bg-white/5 rounded-xl p-3 sm:p-4 text-center hover:bg-white/10 transition-colors">
                  <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{tech.icon}</div>
                  <div className="text-white font-medium text-xs sm:text-sm">{tech.name}</div>
                  <div className="text-white/60 text-xs mt-1">{tech.level}</div>
                  <div className="text-white/40 text-xs">{tech.years}</div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'timeline':
        return (
          <div className="glass-card p-4 sm:p-6 rounded-2xl">
            <h3 className="text-white font-semibold text-base sm:text-lg mb-4 sm:mb-6 flex items-center gap-2">
              <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
              {item.content.title}
            </h3>
            <div className="space-y-4 sm:space-y-6">
              {item.content.events.map((event: any, index: number) => (
                <div key={index} className="relative pl-6 sm:pl-8">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-400 rounded-full"></div>
                  {/* Timeline line */}
                  {index < item.content.events.length - 1 && (
                    <div className="absolute left-1 sm:left-1.5 top-4 sm:top-5 w-0.5 h-12 sm:h-16 bg-white/20"></div>
                  )}
                  
                  <div className="bg-white/5 rounded-lg p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-1 sm:gap-0">
                      <h4 className="text-white font-medium text-sm sm:text-base">{event.title}</h4>
                      <span className="text-white/60 text-xs sm:text-sm">{event.period}</span>
                    </div>
                    <p className="text-blue-400 text-xs sm:text-sm mb-2">{event.company}</p>
                    <p className="text-white/70 text-xs sm:text-sm mb-3">{event.description}</p>
                    <div className="space-y-1">
                      {event.achievements.map((achievement: string, achIndex: number) => (
                        <div key={achIndex} className="text-green-400 text-xs flex items-center gap-2">
                          <span className="w-1 h-1 bg-green-400 rounded-full flex-shrink-0"></span>
                          <span className="leading-relaxed">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'list':
        return (
          <div className="glass-card p-4 sm:p-6 rounded-2xl">
            <h3 className="text-white font-semibold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
              <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
              {item.content.title}
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {item.content.items.map((listItem: any, index: number) => (
                <div key={index} className="bg-white/5 rounded-lg p-3 sm:p-4 hover:bg-white/10 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-1 sm:gap-0">
                    <h4 className="text-white font-medium text-sm sm:text-base">{listItem.name}</h4>
                    <span className="text-green-400 text-xs sm:text-sm font-medium">{listItem.impact}</span>
                  </div>
                  <p className="text-white/70 text-xs sm:text-sm mb-3">{listItem.description}</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {listItem.tech.map((tech: string, techIndex: number) => (
                      <span 
                        key={techIndex}
                        className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'message':
        return (
          <div className={`flex ${item.content.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] sm:max-w-[80%] ${
              item.content.isUser 
                ? 'bg-blue-500/20 text-white border border-blue-400/30' 
                : 'glass-card text-white/90'
            } p-3 sm:p-4 rounded-2xl`}>
              {!item.content.isUser && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">AI</span>
                  </div>
                  <span className="text-white/60 text-xs">Assistant</span>
                </div>
              )}
              <p className="text-xs sm:text-sm leading-relaxed">{item.content.text}</p>
              <p className="text-xs text-white/40 mt-2 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {item.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        )

      default:
        return (
          <div className="glass-card p-6 rounded-2xl">
            <p className="text-white/70">Unsupported content type: {item.type}</p>
          </div>
        )
    }
  }

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500">
      {renderContent()}
    </div>
  )
}