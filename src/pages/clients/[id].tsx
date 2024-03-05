import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { deleteClientById, getClientById } from '@/lib/clients'
import {
  Box,
  Button,
  CircularProgress,
  Flex,
  Grid,
  HStack,
  Text,
  VStack,
  GridItem,
  OrderedList,
  ListItem
} from '@chakra-ui/react'
import { FiArrowLeft } from 'react-icons/fi'
import NextLink from 'next/link'
import Mother from '@/types/Mother'
import Father from '@/types/Father'
import Client from '@/types/Client'
import Note from '@/types/Note'

interface ClientCardProps {
  client: Client
}

interface MotherCardProps {
  mother: Mother
}

interface FatherCardProps {
  father: Father
}

interface NotesCardProps {
  notes: Note[]
}

function ClientCard({ client }: ClientCardProps) {
  return (
    <Box border={'2px'} borderColor={'#f0ead2'} p={4} rounded="md">
      <VStack alignItems={'start'} gap={4}>
        <Box>
          <Text fontSize={'xl'}>{client.lastName}</Text>
          <Text fontSize={'xl'}>{client.firstName}</Text>
          <Text fontSize={'xl'}>{client.patronymic}</Text>
        </Box>
        <Text>Пол: {client.gender}</Text>
        <Text>
          {new Date(client.birthDate).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
          })}
        </Text>
        <Text>{client.address}</Text>
        <Box>
          <Text>Документ:</Text>
          <Text>{client.identityDocument}</Text>
        </Box>
      </VStack>
    </Box>
  )
}

function ScheduleCard() {
  return (
    <Box border={'2px'} borderColor={'#f0ead2'} p={4} rounded="md" h={'100%'}>
      <Text fontSize={'xl'} mb={3}>
        Расписание
      </Text>
    </Box>
  )
}

function TestingCard() {
  return (
    <Box border={'2px'} borderColor={'#f0ead2'} p={4} rounded="md" h={'100%'}>
      <Text fontSize={'xl'} mb={3}>
        Результаты тестирования
      </Text>
    </Box>
  )
}

function NotesCard({ notes }: NotesCardProps) {
  return (
    <Box border={'2px'} borderColor={'#f0ead2'} p={4} rounded="md" h={'100%'}>
      <Text fontSize={'xl'} mb={3}>
        Примечания
      </Text>
      {notes != undefined && (
        <OrderedList>
          {notes.map((note: Note, i) => {
            return <ListItem key={i}>{note.text}</ListItem>
          })}
        </OrderedList>
      )}
      {notes == undefined || (notes.length == 0 && <Text>Примечаний нет</Text>)}
    </Box>
  )
}

function FatherCard({ father }: FatherCardProps) {
  return (
    <Box border={'2px'} borderColor={'#f0ead2'} p={4} rounded="md">
      <VStack alignItems={'start'} gap={4}>
        <Box>
          <Text fontSize={'lg'}>{father.lastName}</Text>
          <Text fontSize={'lg'}>{father.firstName}</Text>
          <Text fontSize={'lg'}>{father.patronymic}</Text>
        </Box>
        <Text>{father.phone}</Text>
        <Box>
          <Text>Паспорт:</Text>
          <Text>{father.identityDocument}</Text>
        </Box>
      </VStack>
    </Box>
  )
}

function MotherCard({ mother }: MotherCardProps) {
  return (
    <Box border={'2px'} borderColor={'#f0ead2'} p={4} rounded="md">
      <VStack alignItems={'start'} gap={4}>
        <Box>
          <Text fontSize={'lg'}>{mother.lastName}</Text>
          <Text fontSize={'lg'}>{mother.firstName}</Text>
          <Text fontSize={'lg'}>{mother.patronymic}</Text>
        </Box>
        <Text>{mother.phone}</Text>
        <Box>
          <Text>Паспорт:</Text>
          <Text>{mother.identityDocument}</Text>
        </Box>
      </VStack>
    </Box>
  )
}

function ClientPage() {
  const router = useRouter()
  const { id } = router.query

  // @ts-ignore
  const [data, setData] = useState<Client>(null)
  const [isLoading, setLoading] = useState<Boolean>(true)

  useEffect(() => {
    if (id) {
      getClientById(Number(id)).then(data => {
        setData(data)
        setLoading(false)
      })
    }
  }, [id])

  async function deleteClient() {
    await deleteClientById(Number(id))
    await router.push('/clients')
  }

  if (isLoading) {
    return (
      <Flex justify={'center'}>
        <CircularProgress isIndeterminate size="100px" thickness="4px" />
      </Flex>
    )
  }

  return (
    <Box px={3}>
      <Flex w="100%" alignItems="center" justifyContent="space-between">
        <NextLink href={'/clients'}>
          <HStack>
            <FiArrowLeft />
            <Text>Вернуться</Text>
          </HStack>
        </NextLink>
        <Button colorScheme={'teal'}>Пройти тестирование</Button>
      </Flex>
      <Grid mt={4} templateColumns="repeat(3, 1fr)" gap={4}>
        <GridItem rowSpan={2}>
          <ClientCard client={data} />
        </GridItem>
        <GridItem rowSpan={2} colSpan={2}>
          <ScheduleCard />
        </GridItem>
        <GridItem>
          <MotherCard mother={data.mother} />
        </GridItem>
        <GridItem colSpan={2}>
          <TestingCard />
        </GridItem>
        <GridItem>
          <FatherCard father={data.father} />
        </GridItem>
        <GridItem colSpan={2}>
          <NotesCard notes={data.notes} />
        </GridItem>
      </Grid>
      <Button colorScheme={'red'} onClick={deleteClient} mt={4}>
        Удалить клиента
      </Button>
    </Box>
  )
}

export default ClientPage
