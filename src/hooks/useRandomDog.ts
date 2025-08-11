import { useCallback, useEffect, useRef, useState } from 'react'
import type { ImageFitType, LGTMConfig } from '../types'

const useDebounce = (callback: () => void, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const debouncedCallback = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      callback()
    }, delay)
  }, [callback, delay])

  useEffect(() => {
    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current)
    }
  }, [])

  return debouncedCallback
}

export const useRandomDog = (
  onConfigChange: (
    key: keyof LGTMConfig,
    value: string | ImageFitType | null
  ) => void,
  setImagePreview: (preview: string | null) => void
) => {
  const initialLoadedRef = useRef(false)
  const [isLoadingRandomDog, setIsLoadingRandomDog] = useState(false)
  const [isLoadingInitialImage, setIsLoadingInitialImage] = useState(true)

  const fetchRandomDogImage = useCallback(async (): Promise<string> => {
    const response = await fetch('https://dog.ceo/api/breeds/image/random')
    if (!response.ok) {
      throw new Error('Failed to fetch random dog image')
    }
    const data = await response.json()
    if (data.status !== 'success' || !data.message) {
      throw new Error('Invalid response from Dog API')
    }
    return data.message
  }, [])

  const handleRandomDogInternal = async () => {
    setIsLoadingRandomDog(true)
    try {
      const imageUrl = await fetchRandomDogImage()
      setImagePreview(imageUrl)
      onConfigChange('backgroundImage', imageUrl)
    } catch (error) {
      console.error('Error fetching random dog image:', error)
    } finally {
      setIsLoadingRandomDog(false)
    }
  }

  const handleRandomDog = useDebounce(handleRandomDogInternal, 500)

  useEffect(() => {
    if (initialLoadedRef.current) return

    const loadInitialImage = async () => {
      initialLoadedRef.current = true
      try {
        const imageUrl = await fetchRandomDogImage()
        setImagePreview(imageUrl)
        onConfigChange('backgroundImage', imageUrl)
      } catch (error) {
        console.error('Error loading initial dog image:', error)
        setImagePreview(null)
        onConfigChange('backgroundImage', null)
      } finally {
        setIsLoadingInitialImage(false)
      }
    }

    loadInitialImage()
  }, [fetchRandomDogImage, onConfigChange, setImagePreview])

  return {
    isLoadingRandomDog,
    isLoadingInitialImage,
    handleRandomDog,
  }
}
