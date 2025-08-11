import { useCallback, useEffect, useRef, useState } from 'react'
import type { ImageFitType, LGTMConfig } from '../types'

export const useImageUpload = (
  onConfigChange: (
    key: keyof LGTMConfig,
    value: string | ImageFitType | null
  ) => void
) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const processImageFile = useCallback(
    (file: File) => {
      if (!file?.type.startsWith('image/')) return
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        onConfigChange('backgroundImage', result)
      }
      reader.readAsDataURL(file)
    },
    [onConfigChange]
  )

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    file && processImageFile(file)
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

  const handlePaste = useCallback(
    (event: ClipboardEvent) => {
      const items = event.clipboardData?.items
      if (!items) return

      const imageItem = Array.from(items).find((item) =>
        item.type.startsWith('image/')
      )

      if (imageItem) {
        const file = imageItem.getAsFile()
        file && processImageFile(file)
      }
    },
    [processImageFile]
  )

  useEffect(() => {
    document.addEventListener('paste', handlePaste)
    return () => {
      document.removeEventListener('paste', handlePaste)
    }
  }, [handlePaste])

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
