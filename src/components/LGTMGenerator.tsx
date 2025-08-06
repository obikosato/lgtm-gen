import {
  Box,
  Button,
  Container,
  Field,
  Heading,
  Image,
  Stack,
  VStack,
} from '@chakra-ui/react'
import type React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  copyImageToClipboard,
  createDefaultConfig,
  downloadImage,
  generateImage,
} from '../lib/lgtm-generator'
import type { ImageFitType, LGTMConfig } from '../types'

const imageFitOptions = [
  { value: 'cover', description: '切り抜いて全体表示' },
  { value: 'contain', description: '全体を収める' },
  { value: 'fill', description: '引き伸ばして全体表示' },
]

const LGTMGenerator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const initialLoadedRef = useRef(false)
  const [config, setConfig] = useState<LGTMConfig>(createDefaultConfig())
  const [isDownloadEnabled, setIsDownloadEnabled] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isCopying, setIsCopying] = useState(false)
  const [isLoadingRandomDog, setIsLoadingRandomDog] = useState(false)
  const [isLoadingInitialImage, setIsLoadingInitialImage] = useState(true)

  const handleConfigChange = (
    key: keyof LGTMConfig,
    value: string | ImageFitType | null
  ) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const processImageFile = (file: File) => {
    if (file?.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        handleConfigChange('backgroundImage', result)
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

  const handleDragOver = (event: React.DragEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragOver(true)
  }

  const handleDragLeave = (event: React.DragEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragOver(false)
  }

  const handleDrop = (event: React.DragEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragOver(false)

    const files = event.dataTransfer.files
    if (files.length > 0) {
      processImageFile(files[0])
    }
  }

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

  const handleImageButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      fileInputRef.current?.click()
    }
  }

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

  const handleRandomDog = async () => {
    setIsLoadingRandomDog(true)
    try {
      const imageUrl = await fetchRandomDogImage()
      setImagePreview(imageUrl)
      handleConfigChange('backgroundImage', imageUrl)
    } catch (error) {
      console.error('Error fetching random dog image:', error)
    } finally {
      setIsLoadingRandomDog(false)
    }
  }

  useEffect(() => {
    if (initialLoadedRef.current) return

    const loadInitialImage = async () => {
      initialLoadedRef.current = true
      try {
        const imageUrl = await fetchRandomDogImage()
        setImagePreview(imageUrl)
        setConfig((prev) => ({ ...prev, backgroundImage: imageUrl }))
      } catch (error) {
        console.error('Error loading initial dog image:', error)
        // フォールバック処理：エラーが発生してもデフォルト設定で続行
        setImagePreview(null)
        setConfig((prev) => ({ ...prev, backgroundImage: null }))
      } finally {
        setIsLoadingInitialImage(false)
      }
    }

    loadInitialImage()
  }, [fetchRandomDogImage])

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

  return (
    <Container
      as='main'
      maxW={{ base: 'container.sm', md: 'container.lg' }}
      px={{ base: 4, md: 8 }}
      py={{ base: 4, md: 8 }}
      aria-label='LGTM画像ジェネレーターアプリケーション'
    >
      <VStack gap={{ base: 6, md: 8 }}>
        <Heading
          as='h1'
          size={{ base: 'xl', md: '2xl' }}
          textAlign='center'
          color='gray.800'
          px={{ base: 2, md: 0 }}
        >
          LGTM画像をつくるよ
        </Heading>

        <Box
          as='section'
          bg='white'
          p={{ base: 4, md: 8 }}
          borderRadius='xl'
          boxShadow='lg'
          w='full'
          maxW='1000px'
          aria-label='画像生成エリア'
        >
          <Stack
            gap={{ base: 4, md: 8 }}
            align='start'
            direction={{ base: 'column', md: 'row' }}
          >
            <Box flex='1' minW='0' w='full'>
              <VStack gap={{ base: 4, md: 6 }}>
                <Field.Root w='full'>
                  <VStack align='start' gap={3} w='full'>
                    <Button
                      w='full'
                      minH={{ base: '100px', md: '120px' }}
                      p={{ base: 4, md: 6 }}
                      border='2px dashed'
                      borderColor={isDragOver ? 'blue.400' : 'gray.300'}
                      borderRadius='lg'
                      bg={isDragOver ? 'blue.50' : 'gray.50'}
                      textAlign='center'
                      display='flex'
                      flexDirection='column'
                      alignItems='center'
                      justifyContent='center'
                      gap={{ base: 2, md: 3 }}
                      cursor='pointer'
                      transition='all 0.2s'
                      variant='ghost'
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={handleImageButtonClick}
                      _hover={{ borderColor: 'blue.400', bg: 'blue.50' }}
                      aria-describedby='background-image-label'
                      aria-label='画像をドラッグ&ドロップまたはクリックして選択'
                      onKeyDown={handleKeyDown}
                    >
                      <Box fontSize='2xl' color='gray.400'>
                        📷
                      </Box>
                      <VStack gap={1}>
                        <Box
                          fontSize={{ base: 'sm', md: 'md' }}
                          color='gray.600'
                          fontWeight='medium'
                        >
                          {isDragOver
                            ? '画像をドロップしてください'
                            : 'ここに画像をドラッグ&ドロップ'}
                        </Box>
                        <Box
                          fontSize={{ base: 'xs', md: 'sm' }}
                          color='gray.500'
                        >
                          または
                          <Box
                            as='span'
                            color='blue.500'
                            textDecoration='underline'
                          >
                            クリックして選択
                          </Box>
                        </Box>
                      </VStack>
                    </Button>
                    <input
                      ref={fileInputRef}
                      type='file'
                      accept='image/*'
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                      aria-label='背景画像ファイル選択'
                      tabIndex={-1}
                    />
                    <Button
                      onClick={handleRandomDog}
                      colorPalette='blue'
                      size={{ base: 'md', md: 'lg' }}
                      w='full'
                      mb={3}
                      disabled={isLoadingRandomDog}
                      aria-label='ランダムな犬の画像を取得'
                    >
                      {isLoadingRandomDog ? 'ロード中...' : '🐕 ランダムな犬'}
                    </Button>
                    {imagePreview && (
                      <Stack
                        direction={{ base: 'column', md: 'row' }}
                        align='start'
                        gap={4}
                        w='full'
                      >
                        <Box
                          borderRadius='md'
                          overflow='hidden'
                          maxW={{ base: '150px', md: '200px' }}
                          flexShrink={0}
                          role='img'
                          aria-label='選択された背景画像のプレビュー'
                        >
                          <Image
                            src={imagePreview}
                            alt='選択された背景画像のプレビュー'
                            maxH={{ base: '75px', md: '100px' }}
                            objectFit='contain'
                            w='full'
                          />
                        </Box>
                        <Box flex='1'>
                          <Field.Label
                            fontSize={{ base: 'xs', md: 'sm' }}
                            mb={3}
                            fontWeight='medium'
                          >
                            画像の表示方法
                          </Field.Label>
                          <VStack gap={2} align='stretch'>
                            {imageFitOptions.map((option) => (
                              <Box
                                key={option.value}
                                display='flex'
                                alignItems='center'
                                gap={2}
                                cursor='pointer'
                                onClick={() =>
                                  handleConfigChange(
                                    'imageFit',
                                    option.value as ImageFitType
                                  )
                                }
                              >
                                <input
                                  type='radio'
                                  name='imageFit'
                                  value={option.value}
                                  checked={config.imageFit === option.value}
                                  onChange={() =>
                                    handleConfigChange(
                                      'imageFit',
                                      option.value as ImageFitType
                                    )
                                  }
                                  style={{ accentColor: 'blue' }}
                                />
                                <Box
                                  as='label'
                                  fontSize={{ base: 'xs', md: 'sm' }}
                                  cursor='pointer'
                                >
                                  {option.description}
                                </Box>
                              </Box>
                            ))}
                          </VStack>
                        </Box>
                      </Stack>
                    )}
                  </VStack>
                </Field.Root>
              </VStack>
            </Box>

            <Box flex='1' minW='0' w='full'>
              <VStack gap={{ base: 4, md: 6 }}>
                <Box
                  as='section'
                  bg='gray.50'
                  p={{ base: 3, md: 6 }}
                  borderRadius='lg'
                  textAlign='center'
                  aria-label='生成されたLGTM画像'
                  w='full'
                  position='relative'
                >
                  {isLoadingInitialImage && (
                    <Box
                      position='absolute'
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                      display='flex'
                      alignItems='center'
                      justifyContent='center'
                      bg='gray.50'
                      borderRadius='lg'
                      zIndex={1}
                    >
                      <VStack gap={2}>
                        <Box fontSize='2xl'>🐕</Box>
                        <Box fontSize='sm' color='gray.600'>
                          ランダムな犬の画像を読み込み中...
                        </Box>
                      </VStack>
                    </Box>
                  )}
                  <canvas
                    ref={canvasRef}
                    width='400'
                    height='200'
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      borderRadius: '8px',
                      display: 'block',
                      margin: '0 auto',
                      opacity: isLoadingInitialImage ? 0.3 : 1,
                    }}
                    role='img'
                    aria-label='生成されたLGTM画像。背景画像の上に白い「LGTM」テキストが黒い枠線付きで表示されています。'
                    tabIndex={0}
                  />
                </Box>

                <VStack
                  justify='center'
                  as='section'
                  aria-label='ダウンロードエリア'
                >
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    gap={3}
                    w='full'
                  >
                    <Button
                      onClick={handleDownload}
                      colorPalette='blue'
                      size={{ base: 'md', md: 'lg' }}
                      disabled={!isDownloadEnabled || isLoadingInitialImage}
                      flex='1'
                      aria-label={
                        isDownloadEnabled
                          ? '生成されたLGTM画像をPNG形式でダウンロード'
                          : '画像を生成してからダウンロードできます'
                      }
                      aria-describedby='download-status'
                    >
                      画像をダウンロード
                    </Button>
                    <Button
                      onClick={handleCopyToClipboard}
                      colorPalette='blue'
                      variant='outline'
                      size={{ base: 'md', md: 'lg' }}
                      disabled={
                        !isDownloadEnabled || isCopying || isLoadingInitialImage
                      }
                      flex='1'
                      aria-label={
                        isDownloadEnabled
                          ? '生成されたLGTM画像をクリップボードにコピー'
                          : '画像を生成してからコピーできます'
                      }
                    >
                      クリップボードにコピー
                    </Button>
                  </Stack>
                  <Box
                    id='download-status'
                    fontSize='sm'
                    color='gray.600'
                    textAlign='center'
                    aria-live='polite'
                    style={{ display: 'none' }}
                  >
                    {isDownloadEnabled
                      ? 'ダウンロード可能です'
                      : '画像を生成中です'}
                  </Box>
                </VStack>
              </VStack>
            </Box>
          </Stack>
        </Box>
      </VStack>
    </Container>
  )
}

export default LGTMGenerator
