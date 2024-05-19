import { useEffect, useState } from 'react'
import {
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
import { FiEdit, FiPlus } from 'react-icons/fi'
import {
  getTestCategories,
  postTestCategory,
  putTestCategory
} from '@/admin/lib/testing'
import TestQuestionCategory from '@/admin/types/models/TestQuestionCategory'
import { useRouter } from 'next/router'
import CreateTestCategoryModal from '@/admin/components/modal/CreateTestCategoryModal'
import EditTestCategoryModal from '@/admin/components/modal/EditTestCategoryModal'

const TestCategorysPage = () => {
  const router = useRouter()

  const [testCategoryList, setTestCategoryList] = useState<
    TestQuestionCategory[] | null
  >(null)
  const [creatingTestCategory, setCreatingTestCategory] = useState(false)
  const [editingTestCategory, setEditingTestCategory] =
    useState<TestQuestionCategory | null>(null)

  function openCreateTestCategoryForm() {
    setCreatingTestCategory(true)
  }

  function closeCreateTestCategoryForm() {
    setCreatingTestCategory(false)
  }

  function openEditTestCategoryForm(testCategory: TestQuestionCategory) {
    setEditingTestCategory(testCategory)
  }

  function closeEditTestCategoryForm() {
    setEditingTestCategory(null)
  }

  async function loadTestCategories() {
    const testCategoryListResponse = await getTestCategories()
    setTestCategoryList(testCategoryListResponse)
  }

  async function createTestCategory(testCategory: TestQuestionCategory) {
    setTestCategoryList(null)
    await postTestCategory(testCategory)
    loadTestCategories()
  }

  async function editTestCategory(testCategory: TestQuestionCategory) {
    setTestCategoryList(null)
    await putTestCategory(testCategory)
    loadTestCategories()
  }

  useEffect(() => {
    loadTestCategories()
  }, [])

  return (
    <>
      <CreateTestCategoryModal
        isOpen={creatingTestCategory}
        onClose={closeCreateTestCategoryForm}
        onSubmit={createTestCategory}
      />
      <EditTestCategoryModal
        isOpen={editingTestCategory !== null}
        onClose={closeEditTestCategoryForm}
        category={editingTestCategory!}
        onSubmit={editTestCategory}
      />
      <HStack justifyContent={'space-between'} alignContent={'center'} p={3}>
        <Text fontSize={'xl'} fontWeight={'semibold'}>
          Список категорий вопросов
        </Text>
        <Button
          leftIcon={<FiPlus />}
          colorScheme="accentGreen"
          onClick={() => openCreateTestCategoryForm()}
        >
          Добавить категорию
        </Button>
      </HStack>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Название</Th>
            <Th>Статус</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {testCategoryList ? (
            testCategoryList.map(testCategory => (
              <Tr key={testCategory.id} _hover={{ cursor: 'pointer' }}>
                <Td
                  onClick={() =>
                    router.push(`/admin/testing/${testCategory.id}`)
                  }
                >
                  {testCategory.id}
                </Td>
                <Td
                  onClick={() =>
                    router.push(`/admin/testing/${testCategory.id}`)
                  }
                >
                  {testCategory.name}
                </Td>
                <Td
                  onClick={() =>
                    router.push(`/admin/testing/${testCategory.id}`)
                  }
                >
                  {testCategory.isActive ? 'Активна' : 'Деактивирована'}
                </Td>
                <Td>
                  <IconButton
                    aria-label="Редактировать"
                    icon={<FiEdit />}
                    onClick={() => openEditTestCategoryForm(testCategory)}
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

export default TestCategorysPage
