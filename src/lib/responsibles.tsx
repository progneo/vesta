import CreateResponsibleRequest from '@/types/requests/create/CreateResponsibleRequest'

const createResponsible = async (responsible: CreateResponsibleRequest) => {
  const response = await fetch(`/api/responsibles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName: responsible.firstName,
      lastName: responsible.lastName,
      patronymic: responsible.patronymic,
      phoneNumber: responsible.phoneNumber,
      type: responsible.type,
      documentId: responsible.documentId
    })
  })

  if (!response.ok) {
    throw new Error('Error creating responsible')
  }
  return response.json()
}

const createResponsibleForClient = async (
  responsibleId: number,
  clientId: number
) => {
  const response = await fetch(`/api/responsiblesForClient`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      responsibleId: responsibleId,
      clientId: clientId
    })
  })

  if (!response.ok) {
    throw new Error('Error creating responsible of client')
  }
  return response.status
}

export { createResponsible, createResponsibleForClient as createResponsibleOfClient }
