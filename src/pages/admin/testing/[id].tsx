import { useEffect, useState } from 'react'
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
  getTestCategory,
  postTestQuestion,
  putTestQuestion
} from '@/admin/lib/testing'
import TestQuestion from '@/admin/types/models/TestQuestion'
import TestQuestionCategory from '@/admin/types/models/TestQuestionCategory'
import { FiArrowLeft, FiEdit, FiPlus } from 'react-icons/fi'
import CreateTestQuestionModal from '@/admin/components/modal/CreateTestQuestionModal'
import EditTestQuestionModal from '@/admin/components/modal/EditTestQuestionModal'

const CategoryPage = () => {
  const router = useRouter()
  const { id } = router.query

  const [category, setCategory] = useState<TestQuestionCategory | null>(null)
  const [creatingQuestion, setCreatingQuestion] = useState(false)
  const [editingTestQuestion, setEditingTestQuestion] =
    useState<TestQuestion | null>(null)

  function openCreateTestQuestionForm() {
    setCreatingQuestion(true)
  }

  function closeCreateTestQuestionForm() {
    setCreatingQuestion(false)
  }

  function openEditTestQuestionForm(testQuestion: TestQuestion) {
    setEditingTestQuestion(testQuestion)
  }

  function closeEditTestQuestionForm() {
    setEditingTestQuestion(null)
  }

  async function loadTestCategory(id: number) {
    const category = await getTestCategory(id)
    setCategory(category)
  }

  async function createTestQuestion(testQuestion: TestQuestion) {
    setCategory(null)
    testQuestion.categoryId = Number(id)
    await postTestQuestion(testQuestion)
    loadTestCategory(Number(id))
  }

  async function editTestQuestion(testQuestion: TestQuestion) {
    setCategory(null)
    await putTestQuestion(testQuestion)
    loadTestCategory(Number(id))
  }

  useEffect(() => {
    if (id) {
      loadTestCategory(Number(id))
    }
  }, [id])

  return (
    <>
      <CreateTestQuestionModal
        isOpen={creatingQuestion}
        onClose={closeCreateTestQuestionForm}
        onSubmit={createTestQuestion}
      />
      <EditTestQuestionModal
        isOpen={editingTestQuestion !== null}
        onClose={closeEditTestQuestionForm}
        question={editingTestQuestion!}
        onSubmit={editTestQuestion}
      />
      <HStack justifyContent={'space-between'}>
        <Box p={3}>
          <HStack onClick={() => router.back()} _hover={{ cursor: 'pointer' }}>
            <FiArrowLeft />
            <Text>Вернуться</Text>
          </HStack>
          <Text fontSize="xl" fontWeight="semibold" mt={3}>
            Список вопросов в категории: {category?.name}
          </Text>
        </Box>
        <HStack justifyContent={'flex-end'}>
          <Button
            leftIcon={<FiPlus />}
            colorScheme="accentGreen"
            onClick={() => openCreateTestQuestionForm()}
          >
            Добавить вопрос
          </Button>
        </HStack>
      </HStack>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Текст</Th>
            <Th>Несколько вариантов</Th>
            <Th>Статус</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {category ? (
            category.testQuestions.map(question => (
              <Tr key={question.id} _hover={{ cursor: 'pointer' }}>
                <Td
                  onClick={() =>
                    router.push(`/admin/testing/question/${question.id}`)
                  }
                >
                  {question.id}
                </Td>
                <Td
                  onClick={() =>
                    router.push(`/admin/testing/question/${question.id}`)
                  }
                >
                  {question.text}
                </Td>
                <Td
                  onClick={() =>
                    router.push(`/admin/testing/question/${question.id}`)
                  }
                >
                  {question.isMultipleChoice ? 'Да' : 'Нет'}
                </Td>
                <Td
                  onClick={() =>
                    router.push(`/testing/question/${question.id}`)
                  }
                >
                  {question.isActive ? 'Активен' : 'Деактивирован'}
                </Td>
                <Td>
                  <IconButton
                    aria-label="Редактировать"
                    icon={<FiEdit />}
                    onClick={() => openEditTestQuestionForm(question)}
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

export default CategoryPage
