import { Box, Image, Stack, VStack } from '@chakra-ui/react'
import type React from 'react'
import type { ImageFitType, LGTMConfig } from '../../types'

const imageFitOptions = [
  { value: 'cover', description: '切り抜いて全体表示' },
  { value: 'contain', description: '全体を収める' },
  { value: 'fill', description: '引き伸ばして全体表示' },
]

type ImageFitSelectorProps = {
  imagePreview: string | null
  config: LGTMConfig
  onConfigChange: (
    key: keyof LGTMConfig,
    value: string | ImageFitType | null
  ) => void
}

export const ImageFitSelector: React.FC<ImageFitSelectorProps> = ({
  imagePreview,
  config,
  onConfigChange,
}) => {
  if (!imagePreview) return null

  return (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      align='start'
      gap={4}
      w='full'
    >
      <Box borderRadius='md' overflow='hidden' maxW='200px' flexShrink={0}>
        <Image
          src={imagePreview}
          alt='選択された背景画像のプレビュー'
          maxH='100px'
          objectFit='contain'
          w='full'
        />
      </Box>
      <Box flex='1'>
        <Box as='fieldset' border='none' p={0} m={0}>
          <Box as='legend' fontSize='sm' mb={3} fontWeight='medium'>
            画像のフィット方法
          </Box>
          <VStack gap={2} align='stretch'>
            {imageFitOptions.map((option) => {
              const inputId = `imageFit-${option.value}`
              return (
                <Box
                  key={option.value}
                  display='flex'
                  alignItems='center'
                  gap={2}
                  cursor='pointer'
                  onClick={() =>
                    onConfigChange('imageFit', option.value as ImageFitType)
                  }
                >
                  <input
                    type='radio'
                    id={inputId}
                    name='imageFit'
                    value={option.value}
                    checked={config.imageFit === option.value}
                    onChange={() =>
                      onConfigChange('imageFit', option.value as ImageFitType)
                    }
                    aria-label={`画像のフィット方法: ${option.description}`}
                    style={{ accentColor: 'blue' }}
                  />
                  <label
                    htmlFor={inputId}
                    style={{ fontSize: '0.875rem', cursor: 'pointer' }}
                  >
                    {option.description}
                  </label>
                </Box>
              )
            })}
          </VStack>
        </Box>
      </Box>
    </Stack>
  )
}
