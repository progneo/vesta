import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Flex,
  Grid,
  Input,
  Text
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { getClients, getClientsWithParams } from '@/lib/clients'
import NextLink from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import Client from '@/types/Client'

interface ClientsTableProps {
  isLoading: Boolean
  clients: Client[]
}

function ClientRow(client: Client) {
  return (
    <NextLink key={client.id} href={`/clients/${client.id}`}>
      <Divider />
      <Grid templateColumns="repeat(4, 1fr)" gap={6} py={3}>
        <Text fontSize="lg">{client.lastName}</Text>
        <Text fontSize="lg">{client.firstName}</Text>
        <Text fontSize="lg">{client.patronymic}</Text>
        <Text fontSize="lg">
          {new Date(client.birthDate).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </Text>
      </Grid>
    </NextLink>
  )
}

function ClientsOverlay() {
  const [data, setData] = useState<Array<Client>>([])
  const [isLoading, setLoading] = useState<Boolean>(true)

  const searchParams = useSearchParams()

  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [patronymic, setPatronymic] = useState<string>('')
  const [birthDate, setBirthDate] = useState<string>('')

  const handleSearch = useDebouncedCallback(() => {
    const params = new URLSearchParams(searchParams)
    params.set('firstName', firstName)
    params.set('lastName', lastName)
    params.set('patronymic', patronymic)
    params.set('birthDate', birthDate)

    setLoading(true)
    getClientsWithParams(params).then(data => {
      setData(data)
      setLoading(false)
    })
  }, 800)

  useEffect(() => {
    getClients().then(data => {
      setData(data)
      setLoading(false)
    })
  }, [])

  return (
    <Box>
      <NextLink href={'/clients/register'}>
        <Button colorScheme="teal">Регистрация клиента</Button>
      </NextLink>
      <Flex gap={4} py={5}>
        <Input
          bg={'#f5f5f5'}
          placeholder={'Фамилия'}
          onChange={e => {
            setLastName(e.target.value)
            handleSearch()
          }}
        />
        <Input
          bg={'#f5f5f5'}
          placeholder={'Имя'}
          onChange={e => {
            setFirstName(e.target.value)
            handleSearch()
          }}
        />
        <Input
          bg={'#f5f5f5'}
          placeholder={'Отчество'}
          onChange={e => {
            setPatronymic(e.target.value)
            handleSearch()
          }}
        />
        <Input
          bg={'#f5f5f5'}
          placeholder={'Дата рождения'}
          type="date"
          onChange={e => {
            setBirthDate(e.target.value)
            handleSearch()
          }}
        />
      </Flex>
      <ClientsTable isLoading={isLoading} clients={data} />
    </Box>
  )
}

function ClientsTable({ isLoading, clients }: ClientsTableProps) {
  if (isLoading) {
    return (
      <Flex justify={'center'}>
        <CircularProgress isIndeterminate size="100px" thickness="4px" />
      </Flex>
    )
  }

  return (
    <Box>
      <Text as={'i'} my={3}>
        Найдено записей: {clients.length}
      </Text>
      {clients.map((client: Client, _) => {
        return ClientRow(client)
      })}
    </Box>
  )
}

function ClientsPage() {
  return <ClientsOverlay />
}

export default ClientsPage
