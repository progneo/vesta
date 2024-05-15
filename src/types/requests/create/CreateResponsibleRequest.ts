export default interface CreateResponsibleRequest {
  firstName: string
  lastName: string
  patronymic: string
  phoneNumber: string
  type: string
  series: string
  number: string
  documentId: string | undefined
}
