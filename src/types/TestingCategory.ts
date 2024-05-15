import TestingQuestion from '@/types/TestingQuestion'

export default interface TestingCategory {
  id: number
  name: string
  isActive: boolean
  testQuestions: TestingQuestion[]
}
