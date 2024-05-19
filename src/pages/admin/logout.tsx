import React, { useEffect } from 'react'
import { Box, CircularProgress } from '@chakra-ui/react'
import { logout } from '@/admin/lib/auth'
import { useAppDispatch } from '@/store/store'
import { eraseAuthState } from '@/store/authSlice'
import { useRouter } from 'next/router'

function LogoutPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  useEffect(() => {
    logout().then(status => {
      if (status === 200) {
        dispatch(eraseAuthState(null))
        router.push('/signin')
      }
    })
  }, [])

  return (
    <Box>
      <CircularProgress />
    </Box>
  )
}

export default LogoutPage
