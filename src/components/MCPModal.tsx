import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Copy, ExternalLink, Zap } from "lucide-react"

interface MCPModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MCPModal({ open, onOpenChange }: MCPModalProps) {
  const [copiedEndpoint, setCopiedEndpoint] = useState(false)
  
  const mcpEndpoint = "https://echo-ai.blink.new/api/mcp"
  const sseEndpoint = "https://echo-ai.blink.new/api/mcp/stream"

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedEndpoint(true)
    setTimeout(() => setCopiedEndpoint(false), 2000)
  }

  const mcpProviders = [
    {
      name: "ChatGPT",
      description: "Connect via OpenAI's GPT models",
      icon: "🤖",
      action: () => window.open("https://chatgpt.com/g/g-echo-recruiter", "_blank")
    },
    {
      name: "Claude",
      description: "Connect via Anthropic's Claude",
      icon: "🧠",
      action: () => window.open("https://claude.ai/chat/echo-recruiter", "_blank")
    },
    {
      name: "Gemini",
      description: "Connect via Google's Gemini",
      icon: "💎",
      action: () => window.open("https://gemini.google.com/app/echo-recruiter", "_blank")
    }
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] glass-card border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Zap className="h-5 w-5 text-blue-400" />
            Connect via MCP
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Connect to Echo's Super Recruiter AI through your preferred AI assistant or direct API endpoint.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* AI Providers */}
          <div>
            <h3 className="text-sm font-medium text-white/90 mb-3">AI Assistants</h3>
            <div className="space-y-2">
              {mcpProviders.map((provider) => (
                <Button
                  key={provider.name}
                  variant="outline"
                  className="w-full justify-start h-auto p-4 bg-white/5 border-white/10 hover:bg-white/10 text-white"
                  onClick={provider.action}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{provider.icon}</span>
                    <div className="text-left">
                      <div className="font-medium">{provider.name}</div>
                      <div className="text-xs text-white/60">{provider.description}</div>
                    </div>
                    <ExternalLink className="h-4 w-4 ml-auto text-white/40" />
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Direct API Endpoints */}
          <div>
            <h3 className="text-sm font-medium text-white/90 mb-3">Direct API Endpoints</h3>
            <div className="space-y-3">
              <div className="glass-card p-3 border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-white/70">HTTP Endpoint</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(mcpEndpoint)}
                    className="h-6 px-2 text-white/60 hover:text-white"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <code className="text-xs text-blue-300 break-all">{mcpEndpoint}</code>
              </div>
              
              <div className="glass-card p-3 border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-white/70">SSE Stream</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(sseEndpoint)}
                    className="h-6 px-2 text-white/60 hover:text-white"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <code className="text-xs text-blue-300 break-all">{sseEndpoint}</code>
              </div>
            </div>
          </div>

          {copiedEndpoint && (
            <div className="text-center text-sm text-green-400">
              ✓ Endpoint copied to clipboard
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}