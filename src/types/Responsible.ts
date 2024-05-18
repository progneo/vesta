import Document from '@/types/Document'

export default interface Responsible {
  id: number
  firstName: string
  lastName: string
  patronymic: string
  type: string
  phoneNumber: string
  documentId: number
  document: Document
}
