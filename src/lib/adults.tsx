import CreateAdultRequest from '@/types/CreateAdultRequest'

const createAdult = async (adult: CreateAdultRequest) => {
  const response = await fetch(`/api/adults`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName: adult.firstName,
      lastName: adult.lastName,
      patronymic: adult.patronymic,
      phone: adult.phone,
      identityDocument: adult.identityDocument,
      type: adult.type
    })
  })

  if (!response.ok) {
    throw new Error('Error creating adult')
  }
  return response.json()
}

const createAdultOfClient = async (adultId: number, clientId: number) => {
  const response = await fetch(`/api/adultsofclient`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      adultId: adultId,
      clientId: clientId
    })
  })

  if (!response.ok) {
    throw new Error('Error creating adult of client')
  }
  return response.json()
}

export { createAdult, createAdultOfClient }
