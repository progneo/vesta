import { useState } from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack
} from '@chakra-ui/react'
import Employee from '@/admin/types/models/Employee'

interface CreateEmployeeModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (employee: Employee) => void
}

const CreateEmployeeModal: React.FC<CreateEmployeeModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [newEmployee, setNewEmployee] = useState<Employee>({
    id: 0,
    lastName: '',
    firstName: '',
    patronymic: ''
  })

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value })
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(newEmployee)
    setNewEmployee({
      id: 0,
      lastName: '',
      firstName: '',
      patronymic: ''
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Добавление работника</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack gap={3}>
            <FormControl>
              <FormLabel>Фамилия</FormLabel>
              <Input
                name="lastName"
                value={newEmployee.lastName}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Имя</FormLabel>
              <Input
                name="firstName"
                value={newEmployee.firstName}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Отчество</FormLabel>
              <Input
                name="patronymic"
                value={newEmployee.patronymic}
                onChange={handleInputChange}
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="accentGreen" onClick={handleFormSubmit}>
            Создать
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreateEmployeeModal
