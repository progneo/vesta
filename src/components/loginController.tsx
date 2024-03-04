import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { getAuthorizationStatus, getMe } from '@/lib/auth'
import { setAuthState, setUserData } from '@/store/authSlice'
import SignInCard from '@/pages/signin'
import { Box, Center, CircularProgress } from '@chakra-ui/react'
import Layout from '@/pages/layout'

// @ts-ignore
function LoginController({ Component, router, pageProps: { ...pageProps } }) {
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
  }, [authState])

  if (isLoading) {
    return (
      <Center h={'100vh'}>
        <CircularProgress />
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
