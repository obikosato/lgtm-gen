import {
  Box,
  Button,
  Container,
  Field,
  Heading,
  Image,
  VStack,
} from '@chakra-ui/react'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import {
  createDefaultConfig,
  downloadImage,
  generateImage,
} from '../lib/lgtm-generator'
import type { BackgroundType, LGTMConfig } from '../types'

const LGTMGenerator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [config, setConfig] = useState<LGTMConfig>(createDefaultConfig())
  const [isDownloadEnabled, setIsDownloadEnabled] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleConfigChange = (
    key: keyof LGTMConfig,
    value: string | BackgroundType
  ) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
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

  const handleImageButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      fileInputRef.current?.click()
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
          LGTM画像ジェネレーター
        </Heading>

        <Box
          as='section'
          bg='white'
          p={{ base: 4, md: 8 }}
          borderRadius='xl'
          boxShadow='lg'
          w='full'
          maxW='600px'
          aria-label='画像生成エリア'
        >
          <VStack gap={{ base: 4, md: 6 }} mb={{ base: 4, md: 8 }}>
            <Field.Root w='full'>
              <Field.Label
                fontSize={{ base: 'sm', md: 'md' }}
                id='background-image-label'
              >
                背景画像
              </Field.Label>
              <VStack align='start' gap={3} w='full'>
                <Button
                  onClick={handleImageButtonClick}
                  onKeyDown={handleKeyDown}
                  variant='outline'
                  size={{ base: 'md', md: 'lg' }}
                  w={{ base: 'full', md: 'auto' }}
                  aria-describedby='background-image-label'
                  aria-label='背景画像ファイルを選択する'
                >
                  画像を選択
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
                {imagePreview && (
                  <Box
                    borderRadius='md'
                    overflow='hidden'
                    maxW={{ base: '150px', md: '200px' }}
                    w='full'
                    role='img'
                    aria-label='選択された背景画像のプレビュー'
                  >
                    <Image
                      src={imagePreview}
                      alt='選択された背景画像のプレビュー'
                      maxH={{ base: '75px', md: '100px' }}
                      objectFit='cover'
                      w='full'
                    />
                  </Box>
                )}
              </VStack>
            </Field.Root>
          </VStack>

          <Box
            as='section'
            bg='gray.50'
            p={{ base: 3, md: 6 }}
            borderRadius='lg'
            textAlign='center'
            mb={{ base: 4, md: 6 }}
            aria-label='生成されたLGTM画像'
          >
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
              }}
              role='img'
              aria-label='生成されたLGTM画像。背景画像の上に白い「LGTM」テキストが黒い枠線付きで表示されています。'
              tabIndex={0}
            />
          </Box>

          <VStack justify='center' as='section' aria-label='ダウンロードエリア'>
            <Button
              onClick={handleDownload}
              colorPalette='green'
              size={{ base: 'md', md: 'lg' }}
              disabled={!isDownloadEnabled}
              w={{ base: 'full', md: 'auto' }}
              minW={{ md: '200px' }}
              aria-label={
                isDownloadEnabled
                  ? '生成されたLGTM画像をPNG形式でダウンロード'
                  : '画像を生成してからダウンロードできます'
              }
              aria-describedby='download-status'
            >
              画像をダウンロード
            </Button>
            <Box
              id='download-status'
              fontSize='sm'
              color='gray.600'
              textAlign='center'
              aria-live='polite'
              style={{ display: 'none' }}
            >
              {isDownloadEnabled ? 'ダウンロード可能です' : '画像を生成中です'}
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default LGTMGenerator
