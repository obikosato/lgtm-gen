import { Button } from '@chakra-ui/react'
import type React from 'react'

type RandomDogButtonProps = {
  isLoadingRandomDog: boolean
  onRandomDog: () => void
}

export const RandomDogButton: React.FC<RandomDogButtonProps> = ({
  isLoadingRandomDog,
  onRandomDog,
}) => (
  <Button
    onClick={onRandomDog}
    colorPalette='blue'
    size='lg'
    w='full'
    mb={3}
    disabled={isLoadingRandomDog}
  >
    {isLoadingRandomDog ? 'ロード中...' : 'ランダムな犬'}
  </Button>
)
