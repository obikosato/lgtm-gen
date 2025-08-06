import { Box, Button, Field, VStack } from '@chakra-ui/react'
import React from 'react'
import { useDragAndDrop } from '../../hooks/useDragAndDrop'
import { useImageUpload } from '../../hooks/useImageUpload'
import type { ImageFitType, LGTMConfig } from '../../types'

interface ImageUploadAreaProps {
  onConfigChange: (
    key: keyof LGTMConfig,
    value: string | ImageFitType | null
  ) => void
  onImagePreviewChange: (preview: string | null) => void
}

export const ImageUploadArea: React.FC<ImageUploadAreaProps> = ({
  onConfigChange,
  onImagePreviewChange,
}) => {
  const {
    fileInputRef,
    imagePreview,
    processImageFile,
    handleImageUpload,
    handleImageButtonClick,
    handleKeyDown,
  } = useImageUpload(onConfigChange)

  const { isDragOver, handleDragOver, handleDragLeave, handleDrop } =
    useDragAndDrop(processImageFile)

  // imagePreviewの変更を親に通知
  React.useEffect(() => {
    onImagePreviewChange(imagePreview)
  }, [imagePreview, onImagePreviewChange])

  return (
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
            <Box fontSize={{ base: 'xs', md: 'sm' }} color='gray.500'>
              または
              <Box as='span' color='blue.500' textDecoration='underline'>
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
      </VStack>
    </Field.Root>
  )
}
