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
  VStack,
  useDisclosure,
  IconButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider
} from '@chakra-ui/react'
import { FiArrowLeft, FiMinus, FiPlus } from 'react-icons/fi'
import NextLink from 'next/link'
import Responsible from '@/types/Responsible'
import Client from '@/types/Client'
import Note from '@/types/Note'
import ResponsibleForClient from '@/types/ResponsibleForClient'
import TestResult from '@/types/TestResult'
import Appointment from '@/types/Appointment'
import { useAppSelector } from '@/store/store'
import CreateNoteModal from '@/components/modal/CreateNoteModal'
import CreateAppointmentModal from '@/components/modal/CreateAppointmentModal'
import { deleteNoteById } from '@/lib/note'
import TestingResultsModal from '@/components/modal/TestingResultsModal'
import { getTestingsOfClient } from '@/lib/testing'
import ScoresByCategory from '@/types/ScoresByCategory'

function ClientCard({ client }: { client: Client }) {
  return (
    <Box
      p={4}
      border={'2px'}
      borderColor={'#c5846299'}
      rounded="md"
      minWidth={'100%'}
    >
      <VStack alignItems={'start'} gap={2}>
        <Box>
          <Text fontSize={'2xl'}>{client.lastName}</Text>
          <Text fontSize={'2xl'}>{client.firstName}</Text>
          <Text fontSize={'2xl'}>{client.patronymic}</Text>
        </Box>
        <Text>
          Пол: {client.sex === 'М' && 'мужской'}
          {client.sex === 'Ж' && 'женский'}
        </Text>
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
          {client.document.type === 'passport' && <Text>Паспорт:</Text>}
          {client.document.type !== 'passport' && (
            <Text>Свидетельство о рождении:</Text>
          )}
          <Text>
            {client.document.series} {client.document.number}
          </Text>
        </Box>
      </VStack>
    </Box>
  )
}

function ResponsibleCard({ responsible }: { responsible: Responsible }) {
  return (
    <Box
      p={4}
      border={'2px'}
      borderColor={'#c5846299'}
      rounded={'md'}
      minWidth={'100%'}
    >
      <VStack alignItems={'start'} gap={2}>
        <Text as={'i'} fontSize={'lg'}>
          {responsible.type}
        </Text>
        <Box>
          <Text fontSize={'xl'}>{responsible.lastName}</Text>
          <Text fontSize={'xl'}>{responsible.firstName}</Text>
          <Text fontSize={'xl'}>{responsible.patronymic}</Text>
        </Box>
        <Box>
          <Text>Номер телефона:</Text>
          <Text>{responsible.phoneNumber}</Text>
        </Box>
        <Box>
          <Text>Паспорт:</Text>
          <Text>
            {responsible.document.series} {responsible.document.number}
          </Text>
        </Box>
      </VStack>
    </Box>
  )
}

function TestingCard({
  testResults,
  clientId,
  onTestingClick
}: {
  testResults: TestResult[]
  clientId: number
  onTestingClick: (testingId: number) => void
}) {
  const authState = useAppSelector(state => state.auth)

  return (
    <Box>
      <HStack alignContent={'center'} justify={'space-between'}>
        <Text fontSize={'xl'}>Результаты тестирования</Text>
        {authState.role === 'clientSpecialist' && (
          <NextLink href={`/clients/testing/${clientId}`}>
            <IconButton
              aria-label={'Пройти тестирование'}
              colorScheme={'teal'}
              variant={'outline'}
              size={'sm'}
              icon={<FiPlus />}
            />
          </NextLink>
        )}
      </HStack>
      <Divider my={3} />
      <OrderedList>
        {testResults.map((testResult: TestResult, i: number) => {
          return (
            <ListItem key={i} onClick={() => onTestingClick(testResult.id)}>
              <HStack gap={'1'}>
                <Text>Результаты тестирования:</Text>
                <Text color="teal.500">
                  {new Date(testResult.datetime).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })}
                </Text>
              </HStack>
            </ListItem>
          )
        })}
      </OrderedList>
      {testResults.length === 0 && <Text>Тестирование не было пройдено</Text>}
    </Box>
  )
}

function StatisticsCard({
  testResults,
  onTestingClick
}: {
  testResults: ScoresByCategory[]
  onTestingClick: (testingId: number) => void
}) {
  return <Box></Box>
}

function ScheduleCard({
  appointments,
  onCreateClick
}: {
  appointments: Appointment[]
  onCreateClick: () => void
}) {
  const authState = useAppSelector(state => state.auth)

  return (
    <Box
      p={4}
      border={'2px'}
      borderColor={'#f0ead2'}
      rounded={'md'}
      minWidth={'100%'}
    >
      <HStack alignContent={'center'} mb={3} justify={'space-between'}>
        <Text fontSize={'xl'}>Расписание</Text>
        {authState.role === 'clientSpecialist' && (
          <IconButton
            aria-label={'Добавить запись'}
            colorScheme={'teal'}
            variant={'outline'}
            size={'sm'}
            icon={<FiPlus />}
            onClick={onCreateClick}
          />
        )}
      </HStack>
      <VStack>
        <Divider />
        {appointments.map((appointment: Appointment, i: number) => {
          return (
            <VStack minWidth={'100%'}>
              <Text key={i} minWidth={'100%'}>
                {`${new Date(appointment.datetime).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit'
                })} ${new Date(appointment.datetime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })} - ${appointment.employee.lastName} ${
                  appointment.employee.firstName[0]
                }.${appointment.employee.patronymic[0]}. - ${
                  appointment.service.name
                }`}
              </Text>
              <Divider />
            </VStack>
          )
        })}
        {appointments.length === 0 && <Text>Записей нет</Text>}
      </VStack>
    </Box>
  )
}

function NotesCard({
  notes,
  onCreateClick,
  onDeleteNote
}: {
  notes: Note[]
  onCreateClick: () => void
  onDeleteNote: () => void
}) {
  async function deleteNote(id: number) {
    await deleteNoteById(id).then(data => {
      if (data === 204) {
        onDeleteNote()
      }
    })
  }

  return (
    <Box
      p={4}
      border={'2px'}
      borderColor={'#f0ead2'}
      rounded={'md'}
      minWidth={'100%'}
    >
      <HStack alignContent={'center'} justify={'space-between'}>
        <Text fontSize={'xl'}>Примечания</Text>
        <IconButton
          aria-label={'Добавить примечание'}
          colorScheme={'teal'}
          variant={'outline'}
          size={'sm'}
          icon={<FiPlus />}
          onClick={() => onCreateClick()}
        />
      </HStack>
      <Divider my={3} />
      {notes != undefined && (
        <OrderedList>
          {notes.map((note: Note, i) => {
            return (
              <HStack justifyContent={'space-between'}>
                <ListItem key={i}>{note.text}</ListItem>
                <IconButton
                  aria-label={'Удалить примечание'}
                  colorScheme={'orange'}
                  variant={'outline'}
                  size={'sm'}
                  icon={<FiMinus />}
                  onClick={() => deleteNote(note.id)}
                />
              </HStack>
            )
          })}
        </OrderedList>
      )}
      {(notes == undefined || notes.length == 0) && <Text>Примечаний нет</Text>}
    </Box>
  )
}

function ClientPage() {
  const router = useRouter()
  const { id } = router.query
  const authState = useAppSelector(state => state.auth)

  // @ts-ignore
  const [clientData, setClientData] = useState<Client>(null)
  const [testingsData, setTestingsData] = useState<ScoresByCategory[]>([])
  const [isLoading, setLoading] = useState<Boolean>(true)

  const [selectedTestingId, setSelectedTestingId] = useState<number>(-1)

  const {
    isOpen: isOpenAddNoteModal,
    onOpen: onOpenAddNoteModal,
    onClose: onCloseAddNoteModal
  } = useDisclosure()

  const {
    isOpen: isOpenAddAppointmentModal,
    onOpen: onOpenAddAppointmentModal,
    onClose: onCloseAddAppointmentModal
  } = useDisclosure()

  const {
    isOpen: isOpenTestingResultsModal,
    onOpen: onOpenTestingResultsModal,
    onClose: onCloseTestingResultsModal
  } = useDisclosure()

  useEffect(() => {
    if (id) {
      getData(Number(id))
    }
  }, [id])

  async function getData(id: number) {
    setLoading(true)
    getClientById(id).then(data => {
      setClientData(data)
      getTestingsOfClient(id).then(data => {
        setTestingsData(data)
        setLoading(false)
      })
    })
  }

  async function deleteClient() {
    await deleteClientById(Number(id)).then(data => {
      if (data === 204) {
        router.push('/clients')
      }
    })
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
      <CreateNoteModal
        clientId={Number(id)}
        onSubmit={() => getData(Number(id))}
        onClose={onCloseAddNoteModal}
        isOpen={isOpenAddNoteModal}
      />
      <CreateAppointmentModal
        clientId={Number(id)}
        onSubmit={() => getData(Number(id))}
        onClose={onCloseAddAppointmentModal}
        isOpen={isOpenAddAppointmentModal}
      />
      <TestingResultsModal
        onClose={onCloseTestingResultsModal}
        isOpen={isOpenTestingResultsModal}
        testingId={selectedTestingId}
      />

      <Flex w="100%" alignItems="center" justifyContent="space-between">
        {authState.role === 'clientSpecialist' && (
          <NextLink href={'/clients'}>
            <HStack>
              <FiArrowLeft />
              <Text>Вернуться</Text>
            </HStack>
          </NextLink>
        )}
        {authState.role === 'specialist' && (
          <NextLink href={'/'}>
            <HStack>
              <FiArrowLeft />
              <Text>Вернуться</Text>
            </HStack>
          </NextLink>
        )}
      </Flex>
      <HStack mt={4} gap={4} minWidth={'100%'}>
        <VStack minWidth={'30%'}>
          <ClientCard client={clientData} />
          {clientData.responsiblesForClient?.map(
            (responsibleForClient: ResponsibleForClient, key: number) => {
              if (responsibleForClient.responsible !== undefined) {
                return (
                  <ResponsibleCard
                    responsible={responsibleForClient.responsible}
                    key={key}
                  />
                )
              }
            }
          )}
        </VStack>
        <VStack alignSelf={'start'}>
          <Box
            border={'2px'}
            borderColor={'#f0ead2'}
            rounded="md"
            minWidth={'100%'}
          >
            <Tabs isFitted variant="enclosed">
              <TabList>
                <Tab
                  _selected={{
                    borderColor: '#f0ead2',
                    borderBottom: 'none',
                    background: 'white'
                  }}
                >
                  Тестирования
                </Tab>
                <Tab
                  _selected={{
                    borderColor: '#f0ead2',
                    borderBottom: 'none',
                    background: 'white'
                  }}
                >
                  Статистика
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <TestingCard
                    testResults={clientData.testings}
                    clientId={Number(id)}
                    onTestingClick={(testingId: number) => {
                      setSelectedTestingId(testingId)
                      onOpenTestingResultsModal()
                    }}
                  />
                </TabPanel>
                <TabPanel>
                  <StatisticsCard
                    testResults={testingsData}
                    onTestingClick={(testingId: number) => {
                      setSelectedTestingId(testingId)
                      onOpenTestingResultsModal()
                    }}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
          <ScheduleCard
            appointments={clientData.appointments}
            onCreateClick={onOpenAddAppointmentModal}
          />
          <NotesCard
            notes={clientData.notes}
            onCreateClick={onOpenAddNoteModal}
            onDeleteNote={() => getData(Number(id))}
          />
        </VStack>
      </HStack>
      {authState.role === 'clientSpecialist' && (
        <Button colorScheme={'red'} onClick={deleteClient} mt={4}>
          Удалить клиента
        </Button>
      )}
    </Box>
  )
}

export default ClientPage
