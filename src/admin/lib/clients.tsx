import Client from '@/admin/types/models/Client'

async function putClient(client: Client): Promise<number> {
  const response = await fetch(`/api/admin/clients/${client.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(client)
  })

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`)
  }

  return response.status
}

async function getClients(): Promise<Client[]> {
  const response = await fetch(`/api/admin/clients`)

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`)
  }

  return response.json()
}

export { putClient, getClients }
