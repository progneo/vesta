import { useEffect, useState } from 'react'
import {
  getAppointmentsByDate,
  getAppointmentsByDateAndEmployeeId
} from '@/lib/appointments'
import {
  Box,
  CircularProgress,
  Select,
  Divider,
  Grid,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Input,
  HStack
} from '@chakra-ui/react'
import { useDebouncedCallback } from 'use-debounce'
import NextLink from 'next/link'
import Appointment from '@/types/Appointment'
import { getSpecialists } from '@/lib/employees'
import Employee from '@/types/Employee'
import { useAppSelector } from '@/store/store'

function SpecialistCalendar() {
  const [isLoading, setLoading] = useState<Boolean>(true)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  )

  const handleSearch = useDebouncedCallback(() => {
    setLoading(true)
    getAppointmentsByDate(selectedDate).then(data => {
      setAppointments(data)
      setLoading(false)
    })
  }, 800)

  useEffect(() => {
    handleSearch()
  }, [selectedDate])

  return (
    <Box>
      <HStack>
        <Input
          bg={'#f5f5f5'}
          placeholder={'Дата рождения'}
          type={'date'}
          value={selectedDate}
          onChange={e => {
            setSelectedDate(e.target.value)
          }}
        />
      </HStack>

      {isLoading && (
        <Flex justify={'center'} mt={5}>
          <CircularProgress isIndeterminate size="100px" thickness="4px" />
        </Flex>
      )}
      {!isLoading && (
        <Table variant={'simple'} mt={5}>
          <Thead>
            <Tr>
              <Th>ФИО клиента</Th>
              <Th>Время</Th>
              <Th>Услуга</Th>
            </Tr>
          </Thead>

          <Tbody>
            {appointments.map(appointment => (
              <Tr key={appointment.id}>
                <Td>
                  <NextLink href={`/clients/${appointment.client.id}`}>
                    <Text>
                      {appointment.client.lastName}{' '}
                      {appointment.client.firstName}{' '}
                      {appointment.client.patronymic}
                    </Text>
                  </NextLink>
                </Td>
                <Td>
                  {new Date(appointment.datetime).toLocaleTimeString([], {
                    hour: 'numeric',
                    minute: 'numeric'
                  })}
                </Td>
                <Td>{appointment.service.name}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  )
}

function ClientSpecilaistCalendar() {
  const [isEmployeesLoading, setEmployeesLoading] = useState<Boolean>(true)
  const [isLoading, setLoading] = useState<Boolean>(true)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  )
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  )

  const handleSearch = useDebouncedCallback(() => {
    if (selectedEmployee !== null) {
      setLoading(true)
      getAppointmentsByDateAndEmployeeId(
        selectedEmployee.id,
        selectedDate
      ).then(data => {
        setAppointments(data)
        setLoading(false)
      })
    }
  }, 800)

  useEffect(() => {
    handleSearch()
  }, [selectedDate, selectedEmployee])

  useEffect(() => {
    setEmployeesLoading(true)
    getSpecialists().then(specialists => {
      if (specialists.length !== 0) {
        setEmployees(specialists)
        setSelectedEmployee(specialists[0])
      }
      setEmployeesLoading(false)
    })
  }, [])

  if (isEmployeesLoading) {
    return (
      <Flex justify={'center'}>
        <CircularProgress isIndeterminate size="100px" thickness="4px" />
      </Flex>
    )
  }

  return (
    <Box>
      <HStack>
        <Select
          bg={'#f5f5f5'}
          value={selectedEmployee?.id || ''}
          onChange={e => {
            const selectedId = parseInt(e.target.value)
            setSelectedEmployee(
              employees.find(emp => emp.id === selectedId) || null
            )
          }}
        >
          {employees.map(employee => (
            <option key={employee.id} value={employee.id}>
              {employee.firstName} {employee.lastName}
            </option>
          ))}
        </Select>
        <Input
          bg={'#f5f5f5'}
          placeholder={'Дата рождения'}
          type="date"
          value={selectedDate}
          onChange={e => {
            setSelectedDate(e.target.value)
          }}
        />
      </HStack>

      {isLoading && (
        <Flex justify={'center'} mt={5}>
          <CircularProgress isIndeterminate size="100px" thickness="4px" />
        </Flex>
      )}
      {!isLoading && (
        <Table variant="simple" mt={5}>
          <Thead>
            <Tr>
              <Th>ФИО клиента</Th>
              <Th>Время</Th>
              <Th>Услуга</Th>
            </Tr>
          </Thead>

          <Tbody>
            {appointments.map(appointment => (
              <Tr key={appointment.id}>
                <Td>
                  <NextLink href={`/clients/${appointment.client.id}`}>
                    <Text>
                      {appointment.client.lastName}{' '}
                      {appointment.client.firstName}{' '}
                      {appointment.client.patronymic}
                    </Text>
                  </NextLink>
                </Td>
                <Td>
                  {new Date(appointment.datetime).toLocaleTimeString([], {
                    hour: 'numeric',
                    minute: 'numeric'
                  })}
                </Td>
                <Td>{appointment.service.name}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  )
}

function AppointmentsPage() {
  const authState = useAppSelector(state => state.auth)

  if (authState.role === 'clientSpecialist') {
    return <ClientSpecilaistCalendar />
  }
  if (authState.role === 'specialist') {
    return <SpecialistCalendar />
  }
}

function AppointmentRow(appointment: Appointment) {
  return (
    <NextLink key={appointment.id} href={`/clients/${appointment.client.id}`}>
      <Divider />
      <Grid templateColumns="repeat(3, 1fr)" gap={6} py={3}>
        <Text fontSize="lg">
          {appointment.client.lastName} {appointment.client.firstName}{' '}
          {appointment.client.patronymic}
        </Text>
        <Text fontSize="lg">
          {new Date(appointment.datetime).toLocaleDateString('ru-RU', {
            hour: 'numeric',
            minute: 'numeric'
          })}
        </Text>
        <Text fontSize="lg">{appointment.service.name}</Text>
      </Grid>
    </NextLink>
  )
}

export default AppointmentsPage
