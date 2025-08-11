import { Box, VStack } from '@chakra-ui/react'
import type React from 'react'

type CanvasPreviewProps = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  isLoadingInitialImage: boolean
}

export const CanvasPreview: React.FC<CanvasPreviewProps> = ({
  canvasRef,
  isLoadingInitialImage,
}) => (
  <Box
    bg='gray.50'
    p={6}
    borderRadius='lg'
    textAlign='center'
    w='full'
    position='relative'
  >
    {isLoadingInitialImage && (
      <VStack
        position='absolute'
        inset={0}
        justify='center'
        bg='gray.50'
        borderRadius='lg'
        zIndex={1}
        gap={2}
      >
        <Box fontSize='2xl'>🐕</Box>
        <Box fontSize='sm' color='gray.600'>
          ランダムな犬の画像を読み込み中...
        </Box>
      </VStack>
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
    />
  </Box>
)
