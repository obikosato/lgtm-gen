import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import type React from 'react'
import { LanguageProvider } from './LanguageProvider'

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <LanguageProvider>
      <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
    </LanguageProvider>
  )
}
