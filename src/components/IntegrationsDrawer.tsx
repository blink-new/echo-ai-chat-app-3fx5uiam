import { useState } from 'react'
import { X, Bot, Code, Copy, ExternalLink, FileText, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

interface IntegrationsDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function IntegrationsDrawer({ open, onOpenChange }: IntegrationsDrawerProps) {
  const [selectedAI, setSelectedAI] = useState('gpt-4o-mini')
  const [copiedText, setCopiedText] = useState('')

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(label)
    setTimeout(() => setCopiedText(''), 2000)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="glass-card border-white/10 text-white w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="text-white flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Connect
          </SheetTitle>
        </SheetHeader>

        <Tabs defaultValue="ai" className="mt-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/5">
            <TabsTrigger value="ai" className="text-white data-[state=active]:bg-white/10">
              AI Models
            </TabsTrigger>
            <TabsTrigger value="api" className="text-white data-[state=active]:bg-white/10">
              API Access
            </TabsTrigger>
            <TabsTrigger value="docs" className="text-white data-[state=active]:bg-white/10">
              Docs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai" className="space-y-4 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Choose AI Model</h3>
              <RadioGroup value={selectedAI} onValueChange={setSelectedAI}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <RadioGroupItem value="gpt-4o-mini" id="gpt4" />
                    <Label htmlFor="gpt4" className="flex-1 cursor-pointer">
                      <div className="font-medium">GPT-4o Mini</div>
                      <div className="text-sm text-white/60">Fast and efficient for most tasks</div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <RadioGroupItem value="claude-3-sonnet" id="claude" />
                    <Label htmlFor="claude" className="flex-1 cursor-pointer">
                      <div className="font-medium">Claude 3 Sonnet</div>
                      <div className="text-sm text-white/60">Great for analysis and reasoning</div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <RadioGroupItem value="gemini-pro" id="gemini" />
                    <Label htmlFor="gemini" className="flex-1 cursor-pointer">
                      <div className="font-medium">Gemini Pro</div>
                      <div className="text-sm text-white/60">Multimodal capabilities</div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </TabsContent>

          <TabsContent value="api" className="space-y-4 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">API Endpoints</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Candidate API</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard('https://api.echo.blink.new/v1/candidates', 'Candidate API')}
                      className="text-white/60 hover:text-white"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <code className="text-sm text-white/70 break-all">
                    https://api.echo.blink.new/v1/candidates
                  </code>
                </div>

                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Chat Endpoint</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard('https://api.echo.blink.new/v1/chat', 'Chat API')}
                      className="text-white/60 hover:text-white"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <code className="text-sm text-white/70 break-all">
                    https://api.echo.blink.new/v1/chat
                  </code>
                </div>

                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">WebSocket Stream</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard('wss://api.echo.blink.new/v1/stream', 'WebSocket')}
                      className="text-white/60 hover:text-white"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <code className="text-sm text-white/70 break-all">
                    wss://api.echo.blink.new/v1/stream
                  </code>
                </div>

                <Button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => window.open('https://docs.echo.blink.new/api', '_blank')}
                >
                  <Code className="h-4 w-4 mr-2" />
                  Connect via API
                </Button>
              </div>

              {copiedText && (
                <div className="text-center text-sm text-green-400 mt-2">
                  ✓ {copiedText} copied to clipboard
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="docs" className="space-y-4 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Documentation</h3>
              
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start h-auto p-4 bg-white/5 border-white/10 hover:bg-white/10 text-white"
                  onClick={() => window.open('https://docs.echo.blink.new/openapi.json', '_blank')}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-400" />
                    <div className="text-left">
                      <div className="font-medium">OpenAPI Specification</div>
                      <div className="text-xs text-white/60">Complete API documentation in OpenAPI 3.0 format</div>
                    </div>
                    <ExternalLink className="h-4 w-4 ml-auto text-white/40" />
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start h-auto p-4 bg-white/5 border-white/10 hover:bg-white/10 text-white"
                  onClick={() => window.open('https://docs.echo.blink.new', '_blank')}
                >
                  <div className="flex items-center gap-3">
                    <Bot className="h-5 w-5 text-green-400" />
                    <div className="text-left">
                      <div className="font-medium">Developer Guide</div>
                      <div className="text-xs text-white/60">Integration examples and best practices</div>
                    </div>
                    <ExternalLink className="h-4 w-4 ml-auto text-white/40" />
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start h-auto p-4 bg-white/5 border-white/10 hover:bg-white/10 text-white"
                  onClick={() => window.open('https://docs.echo.blink.new/sdk', '_blank')}
                >
                  <div className="flex items-center gap-3">
                    <Code className="h-5 w-5 text-purple-400" />
                    <div className="text-left">
                      <div className="font-medium">SDK Documentation</div>
                      <div className="text-xs text-white/60">JavaScript, Python, and REST client libraries</div>
                    </div>
                    <ExternalLink className="h-4 w-4 ml-auto text-white/40" />
                  </div>
                </Button>
              </div>

              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h4 className="font-medium text-blue-300 mb-2">For Engineering Teams</h4>
                <p className="text-sm text-white/70 mb-3">
                  Integrate Echo's candidate API directly into your hiring workflow. Perfect for ATS systems, internal tools, and custom recruiting platforms.
                </p>
                <Button
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => window.open('https://docs.echo.blink.new/integration', '_blank')}
                >
                  <Zap className="h-3 w-3 mr-1" />
                  Get Started
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}