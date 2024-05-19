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
import User from '@/admin/types/models/User'

interface CreateUserModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (user: User) => void
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [newUser, setNewUser] = useState<User>({
    id: 0,
    username: '',
    role: '',
    password: '',
    isActive: true,
    employeeId: 0
  })

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewUser({ ...newUser, [e.target.name]: e.target.value })
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(newUser)
    setNewUser({
      id: 0,
      username: '',
      role: '',
      password: '',
      isActive: true,
      employeeId: 0
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Добавление пользователя</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack gap={3}>
            <FormControl>
              <FormLabel>Имя пользователя</FormLabel>
              <Input
                name="username"
                value={newUser.username}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Роль</FormLabel>
              <Input
                name="role"
                value={newUser.role}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Пароль</FormLabel>
              <Input
                name="password"
                value={newUser.password}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>ID работника</FormLabel>
              <Input
                type="number"
                name="employeeId"
                value={newUser.employeeId}
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

export default CreateUserModal
