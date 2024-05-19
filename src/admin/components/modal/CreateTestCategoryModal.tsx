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
import TestQuestionCategory from '@/admin/types/models/TestQuestionCategory'

interface CreateTestQuestionCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (service: TestQuestionCategory) => void
}

const CreateTestQuestionCategoryModal: React.FC<
  CreateTestQuestionCategoryModalProps
> = ({ isOpen, onClose, onSubmit }) => {
  const [newTestQuestionCategory, setNewTestQuestionCategory] =
    useState<TestQuestionCategory>({
      id: 0,
      name: '',
      isActive: true,
      testQuestions: []
    })

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewTestQuestionCategory({
      ...newTestQuestionCategory,
      [e.target.name]: e.target.value
    })
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(newTestQuestionCategory)
    setNewTestQuestionCategory({
      id: 0,
      name: '',
      isActive: true,
      testQuestions: []
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Добавление категории</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack gap={3}>
            <FormControl>
              <FormLabel>Название</FormLabel>
              <Input
                name="name"
                value={newTestQuestionCategory.name}
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

export default CreateTestQuestionCategoryModal
