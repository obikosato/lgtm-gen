import { useRef, useState } from 'react'
import type { ImageFitType, LGTMConfig } from '../types'

export const useImageUpload = (
  onConfigChange: (
    key: keyof LGTMConfig,
    value: string | ImageFitType | null
  ) => void
) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const processImageFile = (file: File) => {
    if (file?.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        onConfigChange('backgroundImage', result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      processImageFile(file)
    }
  }

  const handleImageButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      fileInputRef.current?.click()
    }
  }

  return {
    fileInputRef,
    imagePreview,
    setImagePreview,
    processImageFile,
    handleImageUpload,
    handleImageButtonClick,
    handleKeyDown,
  }
}
