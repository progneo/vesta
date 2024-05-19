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
  ModalOverlay
} from '@chakra-ui/react'
import User from '@/admin/types/models/User'

interface ChangePasswordModalProps {
  isOpen: boolean
  onClose: () => void
  user: User
  onSubmit: (id: number, password: string) => void
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
  user,
  onSubmit
}) => {
  const [password, setPassword] = useState('')

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value)
  }

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(user.id, password)
    onClose()
  }

  useEffect(() => {
    setPassword('')
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Смена пароля: {user?.username}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Новый пароль</FormLabel>
            <Input value={password} onChange={handleInputChange} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="accentGreen" onClick={handleFormSubmit}>
            Сменить пароль
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ChangePasswordModal
