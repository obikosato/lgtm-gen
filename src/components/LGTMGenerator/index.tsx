import { Box, Container, Heading, Stack, VStack } from '@chakra-ui/react'
import type React from 'react'
import { useState } from 'react'
import { useCanvasGeneration } from '../../hooks/useCanvasGeneration'
import { useRandomDog } from '../../hooks/useRandomDog'
import { createDefaultConfig } from '../../lib/lgtm-generator'
import type { ImageFitType, LGTMConfig } from '../../types'
import { ActionButtons } from './ActionButtons'
import { CanvasPreview } from './CanvasPreview'
import { ImageFitSelector } from './ImageFitSelector'
import { ImageUploadArea } from './ImageUploadArea'
import { RandomDogButton } from './RandomDogButton'

const LGTMGenerator: React.FC = () => {
  const [config, setConfig] = useState<LGTMConfig>(createDefaultConfig())
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleConfigChange = (
    key: keyof LGTMConfig,
    value: string | ImageFitType | null
  ) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const {
    canvasRef,
    isDownloadEnabled,
    isCopying,
    handleDownload,
    handleCopyToClipboard,
  } = useCanvasGeneration(config)

  const { isLoadingRandomDog, isLoadingInitialImage, handleRandomDog } =
    useRandomDog(handleConfigChange, setImagePreview)

  return (
    <Container
      as='main'
      maxW={{ base: 'container.sm', md: 'container.lg' }}
      px={{ base: 4, md: 8 }}
      py={{ base: 4, md: 8 }}
      aria-label='LGTM画像を作るアプリケーション'
    >
      <VStack gap={{ base: 6, md: 8 }}>
        <Heading
          as='h1'
          size={{ base: 'xl', md: '2xl' }}
          textAlign='center'
          color='gray.800'
          px={{ base: 2, md: 0 }}
        >
          LGTM画像つくるよ
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
                <ImageUploadArea
                  onConfigChange={handleConfigChange}
                  onImagePreviewChange={setImagePreview}
                />

                <RandomDogButton
                  isLoadingRandomDog={isLoadingRandomDog}
                  onRandomDog={handleRandomDog}
                />

                <ImageFitSelector
                  imagePreview={imagePreview}
                  config={config}
                  onConfigChange={handleConfigChange}
                />
              </VStack>
            </Box>

            <Box flex='1' minW='0' w='full'>
              <VStack gap={{ base: 4, md: 6 }}>
                <CanvasPreview
                  canvasRef={canvasRef}
                  isLoadingInitialImage={isLoadingInitialImage}
                />

                <ActionButtons
                  isDownloadEnabled={isDownloadEnabled}
                  isCopying={isCopying}
                  isLoadingInitialImage={isLoadingInitialImage}
                  onDownload={handleDownload}
                  onCopyToClipboard={handleCopyToClipboard}
                />
              </VStack>
            </Box>
          </Stack>
        </Box>
      </VStack>
    </Container>
  )
}

export default LGTMGenerator
