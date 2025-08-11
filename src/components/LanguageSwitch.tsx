import { Button, HStack } from '@chakra-ui/react'
import type React from 'react'
import { useLanguage } from '../providers'

export const LanguageSwitch: React.FC = () => {
  const { language, setLanguage, t } = useLanguage()

  return (
    <HStack gap={1} aria-label={t('ariaLanguageSwitch')}>
      <Button
        size='sm'
        variant={language === 'ja' ? 'solid' : 'ghost'}
        onClick={() => setLanguage('ja')}
        fontSize='sm'
        fontWeight='medium'
        color={language === 'ja' ? 'white' : 'gray.600'}
        bg={language === 'ja' ? 'blue.500' : 'transparent'}
        _hover={{
          bg: language === 'ja' ? 'blue.600' : 'gray.100',
        }}
        px={3}
        py={1}
        h='auto'
        minH='auto'
      >
        日本語
      </Button>
      <Button
        size='sm'
        variant={language === 'en' ? 'solid' : 'ghost'}
        onClick={() => setLanguage('en')}
        fontSize='sm'
        fontWeight='medium'
        color={language === 'en' ? 'white' : 'gray.600'}
        bg={language === 'en' ? 'blue.500' : 'transparent'}
        _hover={{
          bg: language === 'en' ? 'blue.600' : 'gray.100',
        }}
        px={3}
        py={1}
        h='auto'
        minH='auto'
      >
        English
      </Button>
    </HStack>
  )
}
