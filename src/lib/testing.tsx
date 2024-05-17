import ScoresByCategory from '@/types/ScoresByCategory'
import TestingCategory from '@/types/TestingCategory'
import TestingCategoryQuestions from '@/types/TestingCategoryQuestions'
import CreateTestingOfClient from '@/types/requests/create/CreateTestingOfClient'

const getNewTesting = async (): Promise<TestingCategory[]> => {
  const response = await fetch(`/api/testing/new`)

  if (!response.ok) {
    throw new Error('Error getting new testing')
  }
  return response.json()
}

const postTestingOfClient = async (newTesting: CreateTestingOfClient): Promise<number> => {
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

const getTestingsOfClient = async (clientId: number): Promise<ScoresByCategory[]> => {
  const response = await fetch(`/api/testing/scores/${clientId}`)

  if (!response.ok) {
    throw new Error('Error getting testings')
  }
  return response.json()
}

const getTestingAnswers = async (testingId: number): Promise<TestingCategoryQuestions[]> => {
  const response = await fetch(`/api/testing/${testingId}`)

  if (!response.ok) {
    throw new Error('Error getting testing')
  }
  return response.json()
}

export { getNewTesting, postTestingOfClient, getTestingsOfClient, getTestingAnswers }
