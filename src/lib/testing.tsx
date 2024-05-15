import TestingCategory from '@/types/TestingCategory'
import CreateTestingOfClient from '@/types/requests/create/CreateTestingOfClient'

const getNewTesting = async (): Promise<TestingCategory[]> => {
  const response = await fetch(`/api/testing/new`)

  if (!response.ok) {
    throw new Error('Error getting new testing')
  }
  return response.json()
}

const postTestingOfClient = async (newTesting: CreateTestingOfClient) => {
  const response = await fetch(`/api/testing`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      clientId: newTesting.clientId,
      answerIds: newTesting.answerIds
    })
  })

  if (!response.ok) {
    throw new Error('Error creating testing')
  }
  return response.status
}

export { getNewTesting, postTestingOfClient }
