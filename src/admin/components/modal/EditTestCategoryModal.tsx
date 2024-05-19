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
import TestQuestionCategory from '@/admin/types/models/TestQuestionCategory'

interface TestQuestionCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  category: TestQuestionCategory | null
  onSubmit: (category: TestQuestionCategory) => void
}

const EditTestCategoryModal: React.FC<TestQuestionCategoryModalProps> = ({
  isOpen,
  onClose,
  category,
  onSubmit
}) => {
  const [editingCategory, setEditingCategory] =
    useState<TestQuestionCategory | null>(category)

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditingCategory({
      ...editingCategory,
      [e.target.name]: e.target.value
    } as TestQuestionCategory)
  }

  function handleIsActiveChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (editingCategory) {
      setEditingCategory({ ...editingCategory, isActive: e.target.checked })
    }
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (editingCategory) {
      onSubmit(editingCategory)
      onClose()
    }
  }

  useEffect(() => {
    setEditingCategory(category)
  }, [category])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Редактирование категории</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack gap={3}>
            <FormControl>
              <FormLabel>Название</FormLabel>
              <Input
                name="name"
                value={editingCategory?.name || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <Checkbox
                name="isActive"
                isChecked={editingCategory?.isActive || false}
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

export default EditTestCategoryModal
