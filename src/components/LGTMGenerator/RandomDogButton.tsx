import { Button } from '@chakra-ui/react'
import type React from 'react'
import { useLanguage } from '../../providers'

type RandomDogButtonProps = {
  isLoadingRandomDog: boolean
  onRandomDog: () => void
}

export const RandomDogButton: React.FC<RandomDogButtonProps> = ({
  isLoadingRandomDog,
  onRandomDog,
}) => {
  const { t } = useLanguage()

  return (
    <Button
      onClick={onRandomDog}
      colorPalette='blue'
      size='lg'
      w='full'
      mb={3}
      disabled={isLoadingRandomDog}
    >
      {isLoadingRandomDog ? t('loading') : t('randomDog')}
    </Button>
  )
}
