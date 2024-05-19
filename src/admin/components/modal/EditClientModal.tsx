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
import Client from '@/admin/types/models/Client'

interface ClientModalProps {
  isOpen: boolean
  onClose: () => void
  client: Client | null
  onSubmit: (client: Client) => void
}

const EditClientModal: React.FC<ClientModalProps> = ({
  isOpen,
  onClose,
  client,
  onSubmit
}) => {
  const [editingClient, setEditingClient] = useState<Client | null>(client)

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditingClient({
      ...editingClient,
      [e.target.name]: e.target.value
    } as Client)
  }

  function handleIsActiveChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (editingClient) {
      setEditingClient({ ...editingClient, isActive: e.target.checked })
    }
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (editingClient) {
      onSubmit(editingClient)
      onClose()
    }
  }

  useEffect(() => {
    setEditingClient(client)
  }, [client])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Редактирование клиента</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack gap={3}>
            <FormControl>
              <FormLabel>Фамилия</FormLabel>
              <Input
                name="lastName"
                value={editingClient?.lastName || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Имя</FormLabel>
              <Input
                name="firstName"
                value={editingClient?.firstName || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Отчество</FormLabel>
              <Input
                name="patronymic"
                value={editingClient?.patronymic || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Пол</FormLabel>
              <Input
                name="sex"
                value={editingClient?.sex || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Адрес</FormLabel>
              <Input
                name="address"
                value={editingClient?.address || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <Checkbox
                name="isActive"
                isChecked={editingClient?.isActive || false}
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

export default EditClientModal
