import { useEffect, useState } from 'react'
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

interface EmployeeModalProps {
  isOpen: boolean
  onClose: () => void
  employee: Employee | null
  onSubmit: (employee: Employee) => void
}

const EditEmployeeModal: React.FC<EmployeeModalProps> = ({
  isOpen,
  onClose,
  employee,
  onSubmit
}) => {
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(
    employee
  )

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditingEmployee({
      ...editingEmployee,
      [e.target.name]: e.target.value
    } as Employee)
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (editingEmployee) {
      onSubmit(editingEmployee)
      onClose()
    }
  }

  useEffect(() => {
    setEditingEmployee(employee)
  }, [employee])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Редактирование работника</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack gap={3}>
            <FormControl>
              <FormLabel>Фамилия</FormLabel>
              <Input
                name="lastName"
                value={editingEmployee?.lastName || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Имя</FormLabel>
              <Input
                name="firstName"
                value={editingEmployee?.firstName || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Отчество</FormLabel>
              <Input
                name="patronymic"
                value={editingEmployee?.patronymic || ''}
                onChange={handleInputChange}
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="accentGreen" onClick={handleFormSubmit}>
            Сохранить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EditEmployeeModal
