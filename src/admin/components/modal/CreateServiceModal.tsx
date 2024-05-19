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
import Service from '@/admin/types/models/Service'

interface CreateServiceModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (service: Service) => void
}

const CreateServiceModal: React.FC<CreateServiceModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [newService, setNewService] = useState<Service>({
    id: 0,
    name: '',
    duration: 0,
    isActive: true
  })

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewService({ ...newService, [e.target.name]: e.target.value })
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(newService)
    setNewService({
      id: 0,
      name: '',
      duration: 0,
      isActive: true
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Добавление услуги</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack gap={3}>
            <FormControl>
              <FormLabel>Название</FormLabel>
              <Input
                name="name"
                value={newService.name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Длительность</FormLabel>
              <Input
                type="number"
                name="duration"
                value={newService.duration}
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

export default CreateServiceModal
