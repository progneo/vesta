import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { getAuthorizationStatus, getMe } from '@/lib/auth'
import { setAuthState, setUserData } from '@/store/authSlice'
import { Center, CircularProgress } from '@chakra-ui/react'
import Layout from '@/pages/layout'
import { NextRouter } from 'next/router'

function LoginController({
  Component,
  router,
  pageProps: { ...pageProps }
}: {
  Component: React.ComponentType<any>
  router: NextRouter
  pageProps: any
}) {
  const dispatch = useAppDispatch()
  const authState = useAppSelector(state => state.auth)

  const [isLoading, setLoading] = useState<Boolean>(true)

  useEffect(() => {
    getAuthorizationStatus().then(isAuthorized => {
      dispatch(setAuthState(isAuthorized))

      if (isAuthorized) {
        getMe().then(userData => {
          dispatch(setUserData(userData))
        })
      }

      setLoading(false)
    })
  }, [])

  if (isLoading) {
    return (
      <Center h={'100vh'}>
        <CircularProgress isIndeterminate />
      </Center>
    )
  }

  if (authState.isAuthorized) {
    return (
      <Layout router={router}>
        <Component {...pageProps} key={router.route} />
      </Layout>
    )
  } else if (router.route !== '/signin') {
    router.push('/signin')
  } else {
    return <Component {...pageProps} key={router.route} />
  }
}

export default LoginController
