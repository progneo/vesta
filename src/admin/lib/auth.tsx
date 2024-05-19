import CurrentUserData from '@/admin/types/models/CurrentUserData'

async function getMe(): Promise<CurrentUserData> {
  const response = await fetch(`/api/authentication/me`)

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`)
  }

  return response.json()
}

async function getAuthorizationStatus() {
  const response = await fetch(`/api/authentication/check_authentication`)

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`)
  }

  return response.json()
}

async function login(username: string, password: string): Promise<number> {
  const response = await fetch(`/api/authentication/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: username, password: password })
  })

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`)
  }

  return response.status
}

async function logout(): Promise<number> {
  const response = await fetch(`/api/authentication/logout`, {
    method: 'POST'
  })

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`)
  }

  return response.status
}

export { getMe, getAuthorizationStatus, login, logout }
