import { useEffect, useState } from 'react'
import {
  Button,
  Checkbox,
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

interface EditUserRoleModalProps {
  isOpen: boolean
  onClose: () => void
  user: User | null
  onSubmit: (user: User) => void
}

const EditUserModal: React.FC<EditUserRoleModalProps> = ({
  isOpen,
  onClose,
  user,
  onSubmit
}) => {
  const [editingUser, setEditingUser] = useState<User | null>(user)

  function handleRoleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (editingUser) {
      setEditingUser({ ...editingUser, role: e.target.value })
    }
  }

  function handleIsActiveChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (editingUser) {
      setEditingUser({ ...editingUser, isActive: e.target.checked })
    }
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (editingUser) {
      onSubmit(editingUser)
      onClose()
    }
  }

  useEffect(() => {
    setEditingUser(user)
  }, [user])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Редактирование пользователя</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack gap={3}>
            <FormControl>
              <FormLabel>Имя пользователя</FormLabel>
              <Input
                name="username"
                isReadOnly={true}
                value={editingUser?.username || ''}
                onChange={handleRoleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Роль</FormLabel>
              <Input
                name="role"
                value={editingUser?.role || ''}
                onChange={handleRoleChange}
              />
            </FormControl>
            <FormControl>
              <Checkbox
                name="isActive"
                isChecked={editingUser?.isActive || false}
                onChange={handleIsActiveChange}
                colorScheme="accentGreen"
              >
                Активен
              </Checkbox>
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

export default EditUserModal
