import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DropZoneProps {
  onFileUpload: (file: File) => void
  uploadedFile: File | null
  onRemoveFile: () => void
  role: 'candidate' | 'recruiter'
}

export function DropZone({ onFileUpload, uploadedFile, onRemoveFile, role }: DropZoneProps) {
  const [dragActive, setDragActive] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0])
    }
    setDragActive(false)
  }, [onFileUpload])

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    multiple: false,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false)
  })

  const getDropzoneClass = () => {
    let baseClass = "glass-card border-2 border-dashed border-white/20 rounded-xl p-3 sm:p-4 transition-all duration-300 cursor-pointer hover:border-white/30 hover:bg-white/5"
    
    if (isDragActive) baseClass += " drag-active"
    if (isDragAccept) baseClass += " drag-accept"
    if (isDragReject) baseClass += " drag-reject"
    
    return baseClass
  }

  if (uploadedFile) {
    return (
      <div className="glass-card rounded-2xl p-3 sm:p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="p-1.5 sm:p-2 bg-blue-500/20 rounded-lg flex-shrink-0">
            <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-white font-medium text-xs sm:text-sm truncate">{uploadedFile.name}</p>
            <p className="text-white/60 text-xs">{(uploadedFile.size / 1024 / 1024).toFixed(1)} MB</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemoveFile}
          className="text-white/60 hover:text-white hover:bg-white/10 h-7 w-7 sm:h-8 sm:w-8 p-0 flex-shrink-0 ml-2"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    )
  }

  const getPlaceholderText = () => {
    if (role === 'candidate') {
      return isDragActive ? 'Drop your file here' : 'Drop resume, project docs, or click to browse'
    } else {
      return isDragActive ? 'Drop your file here' : 'Drop job description, requirements, or click to browse'
    }
  }

  return (
    <div {...getRootProps()} className={getDropzoneClass()}>
      <input {...getInputProps()} />
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="p-1.5 sm:p-2 bg-white/10 rounded-full flex-shrink-0">
          <Upload className="h-3 w-3 sm:h-4 sm:w-4 text-white/70" />
        </div>
        <p className="text-white text-xs sm:text-sm font-medium flex-1 min-w-0">
          {getPlaceholderText()}
        </p>
        <div className="text-white/50 text-xs hidden sm:block flex-shrink-0">
          PDF, DOC, TXT
        </div>
      </div>
    </div>
  )
}