import Responsible from '@/types/Responsible'
import Client from '@/types/Client'

export default interface ResponsibleOfClient {
  responsibleId: number
  responsible: Responsible | undefined
  clientId: number
  client: Client | undefined
}
