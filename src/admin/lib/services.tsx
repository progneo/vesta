import Service from '@/admin/types/models/Service'

async function getServices(): Promise<Service[]> {
  const response = await fetch(`/api/admin/services`)

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`)
  }

  return response.json()
}

async function postService(service: Service): Promise<number> {
  const response = await fetch(`/api/admin/services`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(service)
  })

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`)
  }

  return response.status
}

async function putService(service: Service): Promise<number> {
  const response = await fetch(`/api/admin/services/${service.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(service)
  })

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`)
  }

  return response.status
}

export { getServices, postService, putService }
