import { Box, Button, Stack, VStack } from '@chakra-ui/react'
import type React from 'react'

interface ActionButtonsProps {
  isDownloadEnabled: boolean
  isCopying: boolean
  isLoadingInitialImage: boolean
  onDownload: () => void
  onCopyToClipboard: () => void
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  isDownloadEnabled,
  isCopying,
  isLoadingInitialImage,
  onDownload,
  onCopyToClipboard,
}) => {
  return (
    <VStack justify='center' as='section' aria-label='ダウンロードエリア'>
      <Stack direction={{ base: 'column', md: 'row' }} gap={3}>
        <Button
          onClick={onDownload}
          colorPalette='blue'
          disabled={!isDownloadEnabled || isLoadingInitialImage}
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
          onClick={onCopyToClipboard}
          colorPalette='blue'
          variant='outline'
          disabled={!isDownloadEnabled || isCopying || isLoadingInitialImage}
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
        {isDownloadEnabled ? 'ダウンロード可能です' : '画像を生成中です'}
      </Box>
    </VStack>
  )
}
