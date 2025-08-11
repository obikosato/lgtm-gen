import { Button, Stack } from '@chakra-ui/react'
import type React from 'react'
import { useLanguage } from '../../providers'

type ActionButtonsProps = {
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
  const { t } = useLanguage()
  const disabled = !isDownloadEnabled || isLoadingInitialImage

  return (
    <Stack direction={{ base: 'column', md: 'row' }} gap={3} justify='center'>
      <Button onClick={onDownload} colorPalette='blue' disabled={disabled}>
        {t('downloadImage')}
      </Button>
      <Button
        onClick={onCopyToClipboard}
        colorPalette='blue'
        variant='outline'
        disabled={disabled || isCopying}
      >
        {t('copyToClipboard')}
      </Button>
    </Stack>
  )
}
