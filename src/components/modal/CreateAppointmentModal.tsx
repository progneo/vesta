import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/modal'
import {
  Button,
  CircularProgress,
  Center,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select
} from '@chakra-ui/react'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { addNote } from '@/lib/note'
import CreateNoteRequest from '@/types/requests/create/CreateNoteRequest'
import { getSpecialists } from '@/lib/employees'
import Employee from '@/types/Employee'
import { getServices } from '@/lib/services'
import Service from '@/types/Service'
import CreateAppointmentRequest from '@/types/requests/create/CreateAppointmentRequest'
import { createAppointment } from '@/lib/appointments'

interface CreateNoteProps {
  clientId: number
  isOpen: boolean
  onSubmit: () => void
  onClose: () => void
}

const FormSchema = z.object({
  datetime: z.coerce.date().min(new Date(), 'Datetime is required')
})

function CreateAppointmentModal({
  clientId,
  isOpen,
  onClose,
  onSubmit
}: CreateNoteProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      datetime: undefined
    }
  })
  type FormSchema = z.infer<typeof FormSchema>

  const [isLoading, setLoading] = useState<boolean>(true)
  const [employees, setEmployees] = useState<Employee[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  )
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  async function loadEmployees() {
    setLoading(true)
    getSpecialists().then(specialists => {
      if (specialists.length !== 0) {
        setEmployees(specialists)
        setSelectedEmployee(specialists[0])
      }
    })
  }

  async function loadServices() {
    setLoading(true)
    getServices().then(services => {
      if (services.length !== 0) {
        setServices(services)
        setSelectedService(services[0])
      }
    })
  }

  useEffect(() => {
    if (services.length === 0 && employees.length === 0) {
      loadServices()
      loadEmployees()
    } else if (employees.length !== 0 && services.length !== 0) {
      setLoading(false)
    }
  }, [services, employees])

  const onFormSubmit: SubmitHandler<FormSchema> = async data => {
    try {
      const newAppointment: CreateAppointmentRequest = {
        datetime: data.datetime,
        clientId: clientId,
        employeeId: selectedEmployee!.id,
        serviceId: selectedService!.id
      }

      await createAppointment(newAppointment).then(status => {
        if (status === 204) {
          onSubmit()
          onClose()
        }
      })
    } catch (e) {
      console.error('Adding failed')
    }
  }

  if (isLoading)
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Добавление записи</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <CircularProgress isIndeterminate />
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Отмена</Button>
            <Button color={'teal'} ml={3} isLoading={true} type="submit">
              Добавить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <ModalHeader>Добавление записи</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="service">
              <FormLabel>Специалист:</FormLabel>
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
            </FormControl>
            <FormControl id="text">
              <FormLabel>Услуга:</FormLabel>
              <Select
                bg={'#f5f5f5'}
                value={selectedService?.id || ''}
                onChange={e => {
                  const selectedId = parseInt(e.target.value)
                  setSelectedService(
                    services.find(emp => emp.id === selectedId) || null
                  )
                }}
              >
                {services.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="text">
              <FormLabel>Дата и время:</FormLabel>
              <Input
                {...register('datetime')}
                isInvalid={!!errors.datetime}
                errorBorderColor="red.300"
                type="datetime-local"
                id="text"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Отмена</Button>
            <Button
              color={'teal'}
              ml={3}
              isLoading={isSubmitting}
              type="submit"
            >
              Добавить
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default CreateAppointmentModal
