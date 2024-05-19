import TestQuestion from './TestQuestion'

export default interface TestQuestionCategory {
  id: number
  name: string
  isActive: boolean
  testQuestions: TestQuestion[]
}
