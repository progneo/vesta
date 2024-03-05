import Adult from '@/types/Adult'
import Client from '@/types/Client'

export default interface AdultOfClient {
  adultId: number
  adult: Adult | undefined
  clientId: number
  client: Client | undefined
}
