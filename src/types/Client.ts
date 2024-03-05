import Note from '@/types/Note'
import AdultOfClient from '@/types/AdultOfClient'

export default interface Client {
  id: number
  firstName: string
  lastName: string
  patronymic: string
  gender: string
  birthDate: Date
  address: string
  identityDocument: string
  adultsOfClient: AdultOfClient[]
  notes: Note[]
}
