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
import TestQuestionAnswer from '@/admin/types/models/TestQuestionAnswer'

interface CreateTestAnswerModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (service: TestQuestionAnswer) => void
}

const CreateTestAnswerModal: React.FC<CreateTestAnswerModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [newTestAnswer, setNewTestAnswer] = useState<TestQuestionAnswer>({
    id: 0,
    text: '',
    score: 0,
    isActive: true,
    questionId: 0
  })

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewTestAnswer({ ...newTestAnswer, [e.target.name]: e.target.value })
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(newTestAnswer)
    setNewTestAnswer({
      id: 0,
      text: '',
      score: 0,
      isActive: true,
      questionId: 0
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Добавление ответа на вопрос</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack gap={3}>
            <FormControl>
              <FormLabel>Текст</FormLabel>
              <Input
                name="text"
                value={newTestAnswer.text}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Кол-во баллов</FormLabel>
              <Input
                type="number"
                name="score"
                value={newTestAnswer.score}
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

export default CreateTestAnswerModal
