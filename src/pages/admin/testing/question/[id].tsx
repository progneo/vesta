import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  HStack,
  IconButton,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import {
  getTestQuestion,
  postTestAnswer,
  putTestAnswer
} from '@/admin/lib/testing'
import TestQuestionAnswer from '@/admin/types/models/TestQuestionAnswer'
import { FiArrowLeft, FiEdit, FiPlus } from 'react-icons/fi'
import TestQuestion from '@/admin/types/models/TestQuestion'
import CreateTestAnswerModal from '@/admin/components/modal/CreateTestAnswerModal'
import EditTestAnswerModal from '@/admin/components/modal/EditTestAnswerModal'

const QuestionPage = () => {
  const router = useRouter()
  const { id } = router.query

  const [question, setQuestion] = useState<TestQuestion | null>(null)
  const [creatingQuestion, setCreatingQuestion] = useState(false)
  const [editingTestQuestionAnswer, setEditingTestQuestionAnswer] =
    useState<TestQuestionAnswer | null>(null)

  function openCreateTestQuestionAnswerForm() {
    setCreatingQuestion(true)
  }

  function closeCreateTestQuestionAnswerForm() {
    setCreatingQuestion(false)
  }

  function openEditTestQuestionAnswerForm(testAnswer: TestQuestionAnswer) {
    setEditingTestQuestionAnswer(testAnswer)
  }

  function closeEditTestQuestionAnswerForm() {
    setEditingTestQuestionAnswer(null)
  }

  async function loadTestQuestion(id: number) {
    const question = await getTestQuestion(id)
    setQuestion(question)
  }

  async function createTestQuestionAnswer(testAnswer: TestQuestionAnswer) {
    setQuestion(null)
    testAnswer.questionId = Number(id)
    await postTestAnswer(testAnswer)
    loadTestQuestion(Number(id))
  }

  async function editTestQuestionAnswer(testAnswer: TestQuestionAnswer) {
    setQuestion(null)
    await putTestAnswer(testAnswer)
    loadTestQuestion(Number(id))
  }

  useEffect(() => {
    if (id) {
      loadTestQuestion(Number(id))
    }
  }, [id])

  return (
    <>
      <CreateTestAnswerModal
        isOpen={creatingQuestion}
        onClose={closeCreateTestQuestionAnswerForm}
        onSubmit={createTestQuestionAnswer}
      />
      <EditTestAnswerModal
        isOpen={editingTestQuestionAnswer !== null}
        onClose={closeEditTestQuestionAnswerForm}
        answer={editingTestQuestionAnswer!}
        onSubmit={editTestQuestionAnswer}
      />
      <HStack justifyContent={'space-between'}>
        <Box p={3}>
          <HStack onClick={() => router.back()} _hover={{ cursor: 'pointer' }}>
            <FiArrowLeft />
            <Text>Вернуться</Text>
          </HStack>
          <Text fontSize="xl" fontWeight="semibold" mt={3}>
            Список ответов для вопроса: {question?.text}
          </Text>
        </Box>
        <HStack justifyContent={'flex-end'}>
          <Button
            leftIcon={<FiPlus />}
            colorScheme="accentGreen"
            onClick={() => openCreateTestQuestionAnswerForm()}
          >
            Добавить ответ
          </Button>
        </HStack>
      </HStack>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Текст</Th>
            <Th>Кол-во баллов</Th>
            <Th>Статус</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {question ? (
            question.testQuestionAnswers.map(answer => (
              <Tr key={answer.id}>
                <Td>{answer.id}</Td>
                <Td>{answer.text}</Td>
                <Td>{answer.score}</Td>
                <Td>{answer.isActive ? 'Активен' : 'Деактивирован'}</Td>
                <Td>
                  <IconButton
                    aria-label="Редактировать"
                    icon={<FiEdit />}
                    onClick={() => openEditTestQuestionAnswerForm(answer)}
                  />
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={4} textAlign="center">
                <Spinner size="lg" />
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </>
  )
}

export default QuestionPage
