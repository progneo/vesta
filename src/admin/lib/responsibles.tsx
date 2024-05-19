import Responsible from '@/admin/types/models/Responsible'

async function getResponsibles(): Promise<Responsible[]> {
  const response = await fetch(`/api/admin/responsible`)

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`)
  }

  return response.json()
}

async function putResponsible(responsible: Responsible): Promise<number> {
  const response = await fetch(`/api/admin/responsible/${responsible.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(responsible)
  })

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`)
  }

  return response.status
}

export { getResponsibles, putResponsible }
