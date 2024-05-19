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
import Responsible from '@/admin/types/models/Responsible'

interface ResponsibleModalProps {
  isOpen: boolean
  onClose: () => void
  responsible: Responsible | null
  onSubmit: (responsible: Responsible) => void
}

const EditResponsibleModal: React.FC<ResponsibleModalProps> = ({
  isOpen,
  onClose,
  responsible,
  onSubmit
}) => {
  const [editingResponsible, setEditingResponsible] =
    useState<Responsible | null>(responsible)

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditingResponsible({
      ...editingResponsible,
      [e.target.name]: e.target.value
    } as Responsible)
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (editingResponsible) {
      onSubmit(editingResponsible)
      onClose()
    }
  }

  useEffect(() => {
    setEditingResponsible(responsible)
  }, [responsible])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Редактирование ответственного</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack gap={3}>
            <FormControl>
              <FormLabel>Фамилия</FormLabel>
              <Input
                name="lastName"
                value={editingResponsible?.lastName || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Имя</FormLabel>
              <Input
                name="firstName"
                value={editingResponsible?.firstName || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Отчество</FormLabel>
              <Input
                name="patronymic"
                value={editingResponsible?.patronymic || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Тип</FormLabel>
              <Input
                name="type"
                value={editingResponsible?.type || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Номер телефона</FormLabel>
              <Input
                name="phoneNumber"
                value={editingResponsible?.phoneNumber || ''}
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

export default EditResponsibleModal
