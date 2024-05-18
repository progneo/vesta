import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/lib/theme'
import ReduxProvider from '@/store/redux-provider'
import LoginController from '@/components/loginController'
import { NextRouter } from 'next/router'

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
}

function Website({
  Component,
  router,
  pageProps: { ...pageProps }
}: {
  Component: React.ComponentType<any>
  router: NextRouter
  pageProps: any
}) {
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
