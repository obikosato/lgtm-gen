import { Box, HStack, Link, Text } from '@chakra-ui/react'
import type React from 'react'

const Footer: React.FC = () => {
  return (
    <Box as='footer' py={4} px={6}>
      <HStack
        justify='center'
        gap={6}
        wrap='wrap'
        fontSize='sm'
        color='gray.600'
      >
        <Text>
          Dog images powered by{' '}
          <Link
            href='https://github.com/ElliottLandsborough/dog-ceo-api'
            target='_blank'
            rel='noopener noreferrer'
            color='blue.500'
            textDecoration='underline'
          >
            Dog API
          </Link>
        </Text>
        <Text>•</Text>
        <Link
          href='https://github.com/obikosato/lgtm-gen'
          target='_blank'
          rel='noopener noreferrer'
          color='blue.500'
          textDecoration='underline'
        >
          Source Code
        </Link>
      </HStack>
    </Box>
  )
}

export default Footer
