import Head from 'next/head'
import { Box } from '@chakra-ui/react'
import { NextRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import SidebarWithHeader from '@/components/navbar'
import { useAppDispatch } from '@/store/store'
import { getAuthorizationStatus, getMe } from '@/lib/auth'
import { setAuthState, setUserData } from '@/store/authSlice'

interface MainProps {
  children: React.ReactNode
  router: NextRouter
}

const Layout = ({ children, router }: MainProps) => {
  return (
    <Box>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Vesta</title>
      </Head>

      <SidebarWithHeader path={router.asPath}>{children}</SidebarWithHeader>
    </Box>
  )
}

export default Layout
