import Head from 'next/head'
import { Box } from '@chakra-ui/react'
import { NextRouter } from 'next/router'
import React from 'react'
import SidebarWithHeader from '@/components/navbar'
import { useAppSelector } from '@/store/store'
import AdminSidebar from '@/admin/components/navbar'

interface MainProps {
  children: React.ReactNode
  router: NextRouter
}

const Layout = ({ children, router }: MainProps) => {
  const authState = useAppSelector(state => state.auth)

  if (authState.role === 'admin' && router.asPath.includes('/admin')) {
    return (
      <Box>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Vesta</title>
        </Head>
        <AdminSidebar path={router.asPath}>{children}</AdminSidebar>
      </Box>
    )
  }

  if (
    authState.role !== 'admin' ||
    (!router.asPath.includes('/admin') && authState.role === 'admin')
  ) {
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
}

export default Layout
