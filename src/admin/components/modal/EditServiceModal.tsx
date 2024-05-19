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
import Service from '@/admin/types/models/Service'

interface ServiceModalProps {
  isOpen: boolean
  onClose: () => void
  service: Service | null
  onSubmit: (service: Service) => void
}

const EditServiceModal: React.FC<ServiceModalProps> = ({
  isOpen,
  onClose,
  service,
  onSubmit
}) => {
  const [editingService, setEditingService] = useState<Service | null>(service)

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditingService({
      ...editingService,
      [e.target.name]: e.target.value
    } as Service)
  }

  function handleIsActiveChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (editingService) {
      setEditingService({ ...editingService, isActive: e.target.checked })
    }
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (editingService) {
      onSubmit(editingService)
      onClose()
    }
  }

  useEffect(() => {
    setEditingService(service)
  }, [service])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Редактирование услуги</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack gap={3}>
            <FormControl>
              <FormLabel>Название</FormLabel>
              <Input
                name="name"
                value={editingService?.name || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Длительность</FormLabel>
              <Input
                type="number"
                name="firstName"
                value={editingService?.duration || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <Checkbox
                name="isActive"
                isChecked={editingService?.isActive || false}
                onChange={handleIsActiveChange}
                colorScheme="accentGreen"
              >
                Активна
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

export default EditServiceModal
