import { Button } from '@chakra-ui/react'
import type React from 'react'

interface RandomDogButtonProps {
  isLoadingRandomDog: boolean
  onRandomDog: () => void
}

export const RandomDogButton: React.FC<RandomDogButtonProps> = ({
  isLoadingRandomDog,
  onRandomDog,
}) => {
  return (
    <Button
      onClick={onRandomDog}
      colorPalette='blue'
      size={{ base: 'md', md: 'lg' }}
      w='full'
      mb={3}
      disabled={isLoadingRandomDog}
      aria-label='ランダムな犬の画像を取得'
    >
      {isLoadingRandomDog ? 'ロード中...' : 'ランダムな犬'}
    </Button>
  )
}
