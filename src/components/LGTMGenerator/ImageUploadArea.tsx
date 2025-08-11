import { Box, Button, Field, VStack } from '@chakra-ui/react'
import React from 'react'
import { useDragAndDrop } from '../../hooks/useDragAndDrop'
import { useImageUpload } from '../../hooks/useImageUpload'
import { useLanguage } from '../../providers'
import type { ImageFitType, LGTMConfig } from '../../types'

type ImageUploadAreaProps = {
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
  const { t } = useLanguage()
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
          minH='120px'
          p={6}
          border='2px dashed'
          borderColor={isDragOver ? 'blue.400' : 'gray.300'}
          borderRadius='lg'
          bg={isDragOver ? 'blue.50' : 'gray.50'}
          flexDirection='column'
          gap={3}
          variant='ghost'
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleImageButtonClick}
          _hover={{ borderColor: 'blue.400', bg: 'blue.50' }}
          onKeyDown={handleKeyDown}
        >
          <Box fontSize='2xl' color='gray.400'>
            📷
          </Box>
          <VStack gap={1}>
            <Box
              fontSize='sm'
              color='gray.600'
              lineHeight='1.4'
              whiteSpace='pre-wrap'
              wordBreak='keep-all'
            >
              {isDragOver ? t('dragDropActiveText') : t('dragDropText')}
            </Box>
          </VStack>
        </Button>
        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          onChange={handleImageUpload}
          style={{ display: 'none' }}
          tabIndex={-1}
        />
      </VStack>
    </Field.Root>
  )
}
