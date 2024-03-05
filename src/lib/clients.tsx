import CreateClientRequest from '@/types/CreateClientRequest'

const createClient = async (client: CreateClientRequest) => {
  const response = await fetch(`/api/clients`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName: client.firstName,
      lastName: client.lastName,
      patronymic: client.patronymic,
      gender: client.gender,
      birthDate: client.birthDate,
      address: client.address,
      identityDocument: client.identityDocument
    })
  })

  if (!response.ok) {
    throw new Error('Error creating client')
  }
  return response.json()
}

const getClientsWithParams = async (params: URLSearchParams) => {
  const response = await fetch(`/api/clients?${params.toString()}`)
  if (!response.ok) {
    throw new Error('Error fetching clients')
  }
  return response.json()
}

const getClients = async () => {
  const response = await fetch(`/api/clients`)
  if (!response.ok) {
    throw new Error('Error fetching clients')
  }
  return response.json()
}

const getClientById = async (id: Number) => {
  const response = await fetch(`/api/clients/${id}`)
  if (!response.ok) {
    throw new Error('Error fetching clients')
  }
  return response.json()
}

const deleteClientById = async (id: Number) => {
  const response = await fetch(`/api/clients/${id}`, {
    method: 'DELETE'
  })
  if (!response.ok) {
    throw new Error('Error fetching clients')
  }
  return response.json()
}

export {
  createClient,
  getClients,
  getClientsWithParams,
  getClientById,
  deleteClientById
}
