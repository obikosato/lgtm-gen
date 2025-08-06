import { Box, Field, Image, Stack, VStack } from '@chakra-ui/react'
import type React from 'react'
import type { ImageFitType, LGTMConfig } from '../../types'

const imageFitOptions = [
  { value: 'cover', description: '切り抜いて全体表示' },
  { value: 'contain', description: '全体を収める' },
  { value: 'fill', description: '引き伸ばして全体表示' },
]

interface ImageFitSelectorProps {
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
        <Field.Root>
          <Field.Label
            fontSize={{ base: 'xs', md: 'sm' }}
            mb={3}
            fontWeight='medium'
          >
            画像の表示方法
          </Field.Label>
        </Field.Root>
        <VStack gap={2} align='stretch'>
          {imageFitOptions.map((option) => (
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
                name='imageFit'
                value={option.value}
                checked={config.imageFit === option.value}
                onChange={() =>
                  onConfigChange('imageFit', option.value as ImageFitType)
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
  )
}
