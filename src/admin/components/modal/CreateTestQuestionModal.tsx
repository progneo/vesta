import { useState } from 'react'
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

interface CreateTestQuestionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (service: TestQuestion) => void
}

const CreateTestQuestionModal: React.FC<CreateTestQuestionModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [newTestQuestion, setNewTestQuestion] = useState<TestQuestion>({
    id: 0,
    text: '',
    isMultipleChoice: false,
    isActive: true,
    categoryId: 0,
    testQuestionAnswers: []
  })

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewTestQuestion({ ...newTestQuestion, [e.target.name]: e.target.value })
  }

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewTestQuestion({
      ...newTestQuestion,
      [e.target.name]: e.target.checked
    })
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(newTestQuestion)
    setNewTestQuestion({
      id: 0,
      text: '',
      isMultipleChoice: false,
      isActive: true,
      categoryId: 0,
      testQuestionAnswers: []
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Добавление вопроса</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack gap={3}>
            <FormControl>
              <FormLabel>Текст</FormLabel>
              <Input
                name="text"
                value={newTestQuestion.text}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <Checkbox
                name="isMultipleChoice"
                isChecked={newTestQuestion.isMultipleChoice}
                onChange={handleCheckboxChange}
              >
                Несколько вариантов ответа
              </Checkbox>
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

export default CreateTestQuestionModal
