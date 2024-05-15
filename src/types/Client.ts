import Note from '@/types/Note'
import ResponsibleForClient from '@/types/ResponsibleForClient'
import TestResult from '@/types/TestResult'
import Document from '@/types/Document'
import Appointment from './Appointment'

export default interface Client {
  id: number
  firstName: string
  lastName: string
  patronymic: string
  sex: string
  birthDate: Date
  address: string
  document: Document
  responsiblesForClient: ResponsibleForClient[]
  notes: Note[]
  testings: TestResult[]
  appointments: Appointment[]
}
