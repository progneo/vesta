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
import TestQuestionAnswer from '@/admin/types/models/TestQuestionAnswer'

interface TestAnswerModalProps {
  isOpen: boolean
  onClose: () => void
  answer: TestQuestionAnswer | null
  onSubmit: (answer: TestQuestionAnswer) => void
}

const EditTestAnswerModal: React.FC<TestAnswerModalProps> = ({
  isOpen,
  onClose,
  answer,
  onSubmit
}) => {
  const [editingAnswer, setEditingAnswer] = useState<TestQuestionAnswer | null>(
    answer
  )

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditingAnswer({
      ...editingAnswer,
      [e.target.name]: e.target.value
    } as TestQuestionAnswer)
  }

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditingAnswer({
      ...editingAnswer,
      [e.target.name]: e.target.checked
    } as TestQuestionAnswer)
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (editingAnswer) {
      onSubmit(editingAnswer)
      onClose()
    }
  }

  useEffect(() => {
    setEditingAnswer(answer)
  }, [answer])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Редактирование ответа на вопрос</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack gap={3}>
            <FormControl>
              <FormLabel>Текст</FormLabel>
              <Input
                name="text"
                value={editingAnswer?.text || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Кол-во баллов</FormLabel>
              <Input
                type="number"
                name="score"
                value={editingAnswer?.score || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <Checkbox
                name="isActive"
                isChecked={editingAnswer?.isActive || false}
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

export default EditTestAnswerModal
