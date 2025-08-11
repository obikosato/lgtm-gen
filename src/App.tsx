import { Box, Flex, VStack } from '@chakra-ui/react'
import type React from 'react'
import Footer from './components/Footer'
import { LanguageSwitch } from './components/LanguageSwitch'
import LGTMGenerator from './components/LGTMGenerator'

const App: React.FC = () => {
  return (
    <VStack minH='100vh' gap={0}>
      <Box w='full'>
        <Flex justify='flex-end' p={4}>
          <LanguageSwitch />
        </Flex>
        <LGTMGenerator />
      </Box>
      <Footer />
    </VStack>
  )
}

export default App
