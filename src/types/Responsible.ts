import Document from '@/types/Document'
export default interface Responsible {
  id: number
  firstName: string
  lastName: string
  patronymic: string
  phoneNumber: string
  type: string
  document: Document
}
