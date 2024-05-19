import User from '@/admin/types/models/User'

async function getUsers(): Promise<User[]> {
  const response = await fetch(`/api/admin/user`)

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`)
  }

  return response.json()
}

async function putUser(user: User): Promise<number> {
  const response = await fetch(`/api/admin/user/${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`)
  }

  return response.status
}

async function postUser(user: User): Promise<number> {
  const response = await fetch(`/api/authentication/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: user.username,
      role: user.role,
      isActive: true,
      password: user.password,
      employeeId: user.employeeId
    })
  })

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`)
  }

  return response.status
}

async function changeUserPassword(
  userId: number,
  password: string
): Promise<number> {
  const response = await fetch(`/api/authentication/change_password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: userId,
      password: password
    })
  })

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`)
  }

  return response.status
}

export { getUsers, putUser, postUser, changeUserPassword }
