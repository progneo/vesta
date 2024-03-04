import Mother from '@/types/Mother'
import Father from '@/types/Father'
import Note from '@/types/Note'

export default interface Client {
  id: number
  firstName: string
  lastName: string
  patronymic: string
  gender: string
  birthDate: Date
  address: string
  identityDocument: string
  motherId: number
  fatherId: number
  mother: Mother
  father: Father
  notes: Note[]
}
