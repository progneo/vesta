import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { deleteClientById, getClientById } from '@/lib/clients'
import {
  Box,
  Button,
  CircularProgress,
  Flex,
  HStack,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
  VStack
} from '@chakra-ui/react'
import { FiArrowLeft } from 'react-icons/fi'
import NextLink from 'next/link'
import Adult from '@/types/Adult'
import Client from '@/types/Client'
import Note from '@/types/Note'
import AdultOfClient from '@/types/AdultOfClient'
import TestResult from '@/types/TestResult'

interface ClientCardProps {
  client: Client
}

function ClientCard({ client }: ClientCardProps) {
  return (
    <Box
      p={4}
      border={'2px'}
      borderColor={'#f0ead2'}
      rounded="md"
      minWidth={'100%'}
    >
      <VStack alignItems={'start'} gap={2}>
        <Box>
          <Text fontSize={'sm'}>ID клиента: {client.id}</Text>
          <Text fontSize={'2xl'}>{client.lastName}</Text>
          <Text fontSize={'2xl'}>{client.firstName}</Text>
          <Text fontSize={'2xl'}>{client.patronymic}</Text>
        </Box>
        <Text>Пол: {client.gender}</Text>
        <Box>
          <Text>Дата рождения:</Text>
          <Text>
            {new Date(client.birthDate).toLocaleDateString('ru-RU', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric'
            })}
          </Text>
        </Box>
        <Box>
          <Text>Адрес:</Text>
          <Text>{client.address}</Text>
        </Box>
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
    <Box
      p={4}
      border={'2px'}
      borderColor={'#f0ead2'}
      rounded="md"
      minWidth={'100%'}
    >
      <Text fontSize={'xl'} mb={3}>
        Расписание
      </Text>
    </Box>
  )
}

function TestingCard({ testResult }: { testResult: TestResult | undefined }) {
  let answerList

  if (testResult !== undefined) {
    answerList = testResult.answers.split(';')
  }

  return (
    <Box
      p={4}
      border={'2px'}
      borderColor={'#f0ead2'}
      rounded="md"
      minWidth={'100%'}
    >
      <Text fontSize={'xl'} mb={3}>
        Результаты тестирования
      </Text>
      {answerList != undefined && (
        <UnorderedList>
          {answerList.map((answer: String, i) => {
            return <ListItem key={i}>{answer}</ListItem>
          })}
        </UnorderedList>
      )}
      {(answerList == undefined || answerList.length == 0) && (
        <Text>Тестирование не было пройдено</Text>
      )}
    </Box>
  )
}

function NotesCard({ notes }: { notes: Note[] }) {
  return (
    <Box
      p={4}
      border={'2px'}
      borderColor={'#f0ead2'}
      rounded="md"
      minWidth={'100%'}
    >
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
      {(notes == undefined || notes.length == 0) && <Text>Примечаний нет</Text>}
    </Box>
  )
}

function AdultCard({ adult }: { adult: Adult }) {
  return (
    <Box
      p={4}
      border={'2px'}
      borderColor={'#f0ead2'}
      rounded={'md'}
      minWidth={'100%'}
    >
      <VStack alignItems={'start'} gap={2}>
        <Text as={'i'} fontSize={'lg'}>
          {adult.type}
        </Text>
        <Box>
          <Text fontSize={'xl'}>{adult.lastName}</Text>
          <Text fontSize={'xl'}>{adult.firstName}</Text>
          <Text fontSize={'xl'}>{adult.patronymic}</Text>
        </Box>
        <Box>
          <Text>Номер телефона:</Text>
          <Text>{adult.phone}</Text>
        </Box>
        <Box>
          <Text>Паспорт:</Text>
          <Text>{adult.identityDocument}</Text>
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
        <a
          href={'https://forms.yandex.ru/cloud/65e5e0905d2a060f9f54b696/'}
          target={'_blank'}
        >
          <Button colorScheme={'teal'}>Пройти тестирование</Button>
        </a>
      </Flex>
      <HStack mt={4} gap={4} minWidth={'100%'}>
        <VStack minWidth={'30%'}>
          <ClientCard client={data} />
          {data.adultsOfClient.map(
            (adultOfClient: AdultOfClient, key: number) => {
              if (adultOfClient.adult !== undefined) {
                return <AdultCard adult={adultOfClient.adult} key={key} />
              }
            }
          )}
        </VStack>
        <VStack alignSelf={'start'}>
          <ScheduleCard />
          <TestingCard testResult={data.tests.pop()} />
          <NotesCard notes={data.notes} />
        </VStack>
      </HStack>
      <Button colorScheme={'red'} onClick={deleteClient} mt={4}>
        Удалить клиента
      </Button>
    </Box>
  )
}

export default ClientPage
