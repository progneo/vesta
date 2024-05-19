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
import TestQuestion from '@/admin/types/models/TestQuestion'

interface TestQuestionModalProps {
  isOpen: boolean
  onClose: () => void
  question: TestQuestion | null
  onSubmit: (category: TestQuestion) => void
}

const EditTestQuestionModal: React.FC<TestQuestionModalProps> = ({
  isOpen,
  onClose,
  question,
  onSubmit
}) => {
  const [editingQuestion, setEditingQuestion] = useState<TestQuestion | null>(
    question
  )

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditingQuestion({
      ...editingQuestion,
      [e.target.name]: e.target.value
    } as TestQuestion)
  }

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditingQuestion({
      ...editingQuestion,
      [e.target.name]: e.target.checked
    } as TestQuestion)
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (editingQuestion) {
      onSubmit(editingQuestion)
      onClose()
    }
  }

  useEffect(() => {
    setEditingQuestion(question)
  }, [question])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Редактирование вопроса</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack gap={3}>
            <FormControl>
              <FormLabel>Текст</FormLabel>
              <Input
                name="text"
                value={editingQuestion?.text || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <Checkbox
                name="isMultipleChoice"
                isChecked={editingQuestion?.isMultipleChoice || false}
                onChange={handleCheckboxChange}
                colorScheme="accentGreen"
              >
                Несколько вариантов ответа
              </Checkbox>
            </FormControl>
            <FormControl>
              <Checkbox
                name="isActive"
                isChecked={editingQuestion?.isActive || false}
                onChange={handleCheckboxChange}
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

export default EditTestQuestionModal
