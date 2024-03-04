import LoginData from '@/types/LoginData'

const getMe = async () => {
  const response = await fetch(`/api/authentication/me`)
  if (!response.ok) {
    throw new Error('Probably unauthorized')
  }
  return response.json()
}

const getAuthorizationStatus = async () => {
  const response = await fetch(`/api/authentication/check_authentication`)
  if (!response.ok) {
    throw new Error('Probably unauthorized')
  }
  return response.json()
}

const login = async (loginData: LoginData) => {
  const response = await fetch(`/api/authentication/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: loginData.username,
      password: loginData.password
    })
  })
  if (!response.ok) {
    throw new Error('Wrong data')
  }
  return response.status
}

const logout = async () => {
  const response = await fetch(`/api/authentication/logout`, {
    method: 'POST'
  })

  if (!response.ok) {
    throw new Error('Already unauthorized')
  }
  return response.status
}

export { getMe, getAuthorizationStatus, login, logout }
