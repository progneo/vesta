import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/lib/theme'
import ReduxProvider from '@/store/redux-provider'
import LoginController from '@/components/loginController'

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
}

// @ts-ignore
function Website({ Component, router, pageProps: { ...pageProps } }) {
  return (
    <ChakraProvider theme={theme}>
      <ReduxProvider>
        <LoginController
          Component={Component}
          router={router}
          pageProps={pageProps}
        />
      </ReduxProvider>
    </ChakraProvider>
  )
}

export default Website
