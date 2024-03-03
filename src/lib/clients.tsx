interface ClientsRequest {
  firstName: String | null
  lastName: String | null
  patronymic: String | null
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

export { getClients, getClientsWithParams, getClientById }
