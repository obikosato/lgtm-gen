import { Box, VStack } from '@chakra-ui/react'
import type React from 'react'

interface CanvasPreviewProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  isLoadingInitialImage: boolean
}

export const CanvasPreview: React.FC<CanvasPreviewProps> = ({
  canvasRef,
  isLoadingInitialImage,
}) => {
  return (
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
  )
}
