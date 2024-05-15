import TestingAnswer from '@/types/TestingAnswer'

export default interface TestingQuestion {
  id: number
  text: string
  isMultipleChoice: boolean
  isActive: boolean
  testQuestionAnswers: TestingAnswer[]
}
