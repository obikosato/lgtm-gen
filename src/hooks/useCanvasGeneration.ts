import { useEffect, useRef, useState } from 'react'
import {
  copyImageToClipboard,
  downloadImage,
  generateImage,
} from '../lib/lgtm-generator'
import type { LGTMConfig } from '../types'

export const useCanvasGeneration = (config: LGTMConfig) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDownloadEnabled, setIsDownloadEnabled] = useState(false)
  const [isCopying, setIsCopying] = useState(false)

  const handleDownload = () => {
    if (!canvasRef.current) return

    try {
      downloadImage(canvasRef.current, {
        filename: `lgtm-${Date.now()}`,
        format: 'png',
      })
    } catch (error) {
      console.error('Error downloading image:', error)
    }
  }

  const handleCopyToClipboard = async () => {
    if (!canvasRef.current) return

    try {
      setIsCopying(true)
      await copyImageToClipboard(canvasRef.current)
    } catch (error) {
      console.error('Error copying image to clipboard:', error)
    } finally {
      setIsCopying(false)
    }
  }

  useEffect(() => {
    if (!canvasRef.current) return

    const generateAsync = async () => {
      if (!canvasRef.current) return

      try {
        await generateImage(canvasRef.current, config)
        setIsDownloadEnabled(true)
      } catch (error) {
        console.error('Error generating image:', error)
        setIsDownloadEnabled(false)
      }
    }

    generateAsync()
  }, [config])

  return {
    canvasRef,
    isDownloadEnabled,
    isCopying,
    handleDownload,
    handleCopyToClipboard,
  }
}
