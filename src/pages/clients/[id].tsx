import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getClientById } from '@/lib/clients'
import {
  Box,
  CircularProgress,
  Divider,
  Flex,
  HStack,
  IconButton,
  ListItem,
  OrderedList,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  VStack
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
import 'chart.js/auto'
import { Line } from 'react-chartjs-2'

function ClientCard({ client }: { client: Client }) {
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
      borderColor={'#f0ead2'}
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
        <OrderedList>
          {testResults.map((testResult: TestResult, i: number) => {
            return (
              <ListItem
                key={i}
                onClick={() => onTestingClick(testResult.id)}
                _hover={{ cursor: 'pointer' }}
              >
                <HStack gap={'1'}>
                  <Text>Результаты тестирования:</Text>
                  <Text color="accentGreen.900">
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
        {authState.role === 'clientSpecialist' && (
          <NextLink href={`/clients/testing/${clientId}`}>
            <IconButton
              aria-label={'Пройти тестирование'}
              colorScheme={'accentGreen'}
              variant={'outline'}
              size={'sm'}
              icon={<FiPlus />}
            />
          </NextLink>
        )}
      </HStack>
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
  return (
    <Box>
      {testResults.map((result: ScoresByCategory, index: number) => (
        <ScoresGraphCard
          key={index}
          testResults={result}
          onTestingClick={onTestingClick}
        />
      ))}
    </Box>
  )
}

function ScoresGraphCard({
  testResults,
  onTestingClick
}: {
  testResults: ScoresByCategory
  onTestingClick: (testingId: number) => void
}) {
  const data = {
    labels: testResults.scores.map(result =>
      new Date(result.datetime).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    ),
    datasets: [
      {
        data: testResults.scores.map(result => result.score),
        backgroundColor: 'rgb(146, 178, 62, 0.4)',
        borderColor: 'rgb(146, 178, 62)',
        borderWidth: 1
      }
    ]
  }

  const options = {
    scales: {
      y: {
        beginAtZero: false,
        precision: 0
      }
    },
    plugins: {
      legend: {
        display: false
      }
    },
    //@ts-ignore
    onClick: (_, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index
        const testingId = testResults.scores[index].id
        onTestingClick(testingId)
      }
    }
  }

  return (
    <Box>
      <Text fontSize={'xl'} mb={'2'}>
        Категория: {testResults.categoryName}
      </Text>
      <Line data={data} options={options} />
      <Divider my={'3'} />
    </Box>
  )
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
            colorScheme={'accentGreen'}
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
            <VStack minWidth={'100%'} key={i}>
              <Text minWidth={'100%'}>
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
          colorScheme={'accentGreen'}
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
              <HStack justifyContent={'space-between'} key={i}>
                <ListItem>{note.text}</ListItem>
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
        <HStack onClick={() => router.back()} _hover={{ cursor: 'pointer' }}>
          <FiArrowLeft />
          <Text>Вернуться</Text>
        </HStack>
      </Flex>
      <HStack mt={4} gap={4} minWidth={'100%'}>
        <VStack minWidth={'30%'} alignSelf={'start'}>
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
        <VStack alignSelf={'start'} minWidth={'40%'}>
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
    </Box>
  )
}

export default ClientPage
