import TestQuestion from '@/admin/types/models/TestQuestion'
import TestQuestionAnswer from '@/admin/types/models/TestQuestionAnswer'
import TestQuestionCategory from '@/admin/types/models/TestQuestionCategory'

async function getTestCategories(): Promise<TestQuestionCategory[]> {
  const response = await fetch(`/api/admin/testQuestionCategories`)

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`)
  }

  return response.json()
}

async function getTestCategory(id: number): Promise<TestQuestionCategory> {
  const response = await fetch(`/api/admin/testQuestionCategories/${id}`)

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`)
  }

  return response.json()
}

async function getTestQuestion(id: number): Promise<TestQuestion> {
  const response = await fetch(`/api/admin/testQuestions/${id}`)

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`)
  }

  return response.json()
}

async function postTestCategory(
  category: TestQuestionCategory
): Promise<number> {
  const response = await fetch(`/api/admin/testQuestionCategories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(category)
  })

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`)
  }

  return response.status
}

async function postTestQuestion(question: TestQuestion): Promise<number> {
  const response = await fetch(`/api/admin/testQuestions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(question)
  })

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`)
  }

  return response.status
}

async function postTestAnswer(answer: TestQuestionAnswer): Promise<number> {
  const response = await fetch(`/api/admin/testQuestionAnswers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(answer)
  })

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`)
  }

  return response.status
}

async function putTestCategory(
  category: TestQuestionCategory
): Promise<number> {
  const response = await fetch(
    `/api/admin/testQuestionCategories/${category.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(category)
    }
  )

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`)
  }

  return response.status
}

async function putTestQuestion(question: TestQuestion): Promise<number> {
  const response = await fetch(`/api/admin/testQuestions/${question.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(question)
  })

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`)
  }

  return response.status
}

async function putTestAnswer(answer: TestQuestionAnswer): Promise<number> {
  const response = await fetch(`/api/admin/testQuestionAnswers/${answer.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(answer)
  })

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`)
  }

  return response.status
}

export {
  getTestCategories,
  getTestCategory,
  getTestQuestion,
  postTestCategory,
  postTestQuestion,
  postTestAnswer,
  putTestCategory,
  putTestQuestion,
  putTestAnswer
}
