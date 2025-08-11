import { VStack } from '@chakra-ui/react'
import type React from 'react'
import Footer from './components/Footer'
import LGTMGenerator from './components/LGTMGenerator'

const App: React.FC = () => {
  return (
    <VStack minH='100vh' gap={0}>
      <LGTMGenerator />
      <Footer />
    </VStack>
  )
}

export default App
