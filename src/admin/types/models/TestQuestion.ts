import TestQuestionAnswers from './TestQuestionAnswer'

export default interface TestQuestion {
  id: number
  text: string
  isMultipleChoice: boolean
  isActive: boolean
  categoryId: number
  testQuestionAnswers: TestQuestionAnswers[]
}
