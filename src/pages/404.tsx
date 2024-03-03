import { Box, Heading, Text, Button } from '@chakra-ui/react'
import NextLink from 'next/link'

const NotFound = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={8}>
        Данной страницы не существует
      </Text>

      <NextLink href={'/'}>
        <Button
          colorScheme="orange"
          bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
          color="white"
          variant="solid"
        >
          На главную
        </Button>
      </NextLink>
    </Box>
  )
}

export default NotFound
