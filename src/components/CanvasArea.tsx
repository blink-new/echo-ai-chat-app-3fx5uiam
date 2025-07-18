import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, X, Mic } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CanvasAreaProps {
  onFileUpload: (file: File) => void
  uploadedFile: File | null
  onRemoveFile: () => void
}

export function CanvasArea({ onFileUpload, uploadedFile, onRemoveFile }: CanvasAreaProps) {
  const [dragActive, setDragActive] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0])
    }
    setDragActive(false)
  }, [onFileUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
      'audio/*': ['.mp3', '.wav', '.m4a']
    },
    multiple: false,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false)
  })

  const getCanvasClass = () => {
    let baseClass = "min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6 transition-all duration-300 cursor-pointer"
    
    if (isDragActive) {
      baseClass += " bg-white/5 backdrop-blur-md rounded-2xl border-2 border-dashed border-white/30"
    }
    
    return baseClass
  }

  if (uploadedFile) {
    return (
      <div className="glass-card-light rounded-2xl p-6 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <FileText className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-white font-medium">{uploadedFile.name}</p>
              <p className="text-white/60 text-sm">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemoveFile}
            className="text-white/60 hover:text-white hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="text-center py-8 space-y-4">
          <p className="text-white/70">
            Great! Your file is ready. Ask me anything about it or start a conversation below.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div {...getRootProps()} className={getCanvasClass()}>
      <input {...getInputProps()} />
      
      <div className="space-y-6">
        <div className="p-6 bg-white/5 rounded-full">
          <Upload className="h-12 w-12 text-white/70 mx-auto" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-white">
            {isDragActive ? 'Drop your files here' : 'Drag files or start typing'}
          </h2>
          <p className="text-white/60 max-w-md mx-auto">
            Upload PDFs, images, or audio files. Or press the mic button to start recording.
          </p>
        </div>

        <div className="flex items-center gap-4 text-white/50 text-sm">
          <span>📄 PDFs</span>
          <span>🖼️ Images</span>
          <span>🎵 Audio</span>
          <span>🎙️ Voice</span>
        </div>
      </div>
    </div>
  )
}