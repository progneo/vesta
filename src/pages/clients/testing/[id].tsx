import Client from '@/types/Client'
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Flex,
  HStack,
  Radio,
  RadioGroup,
  Text,
  VStack
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getClientById } from '@/lib/clients'
import NextLink from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'
import { getNewTesting, postTestingOfClient } from '@/lib/testing'
import TestingCategory from '@/types/TestingCategory'
import TestingQuestion from '@/types/TestingQuestion'
import CreateTestingOfClient from '@/types/requests/create/CreateTestingOfClient'

export default TestingPage

function QuestionCard({
  question,
  onAnswerSelected
}: {
  question: TestingQuestion
  onAnswerSelected: (newIds: number[], oldIds: number[]) => void
}) {
  if (question.isMultipleChoice) {
    const [oldAnswers, setOldAnswers] = useState<number[]>([])
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])

    const handleCheckboxChange = (answerId: number, isChecked: boolean) => {
      setOldAnswers(selectedAnswers)
      if (isChecked) {
        setSelectedAnswers(prev => [...prev, answerId])
      } else {
        setSelectedAnswers(prev => prev.filter(id => id !== answerId))
      }
    }

    useEffect(() => {
      onAnswerSelected(selectedAnswers, oldAnswers)
    }, [selectedAnswers])

    return (
      <VStack gap={1} alignItems={'start'}>
        {question.testQuestionAnswers.map(answer => (
          <Box key={answer.id}>
            <Checkbox
              colorScheme={'accentGreen'}
              onChange={e => handleCheckboxChange(answer.id, e.target.checked)}
            >
              {answer.text}
            </Checkbox>
          </Box>
        ))}
      </VStack>
    )
  } else {
    const [value, setValue] = useState('')

    const handleRadioChange = (answerId: string) => {
      onAnswerSelected([Number(answerId)], [Number(value)])
      setValue(answerId)
    }

    return (
      <RadioGroup onChange={handleRadioChange} value={value}>
        <VStack gap={1} alignItems={'start'}>
          {question.testQuestionAnswers.map(answer => (
            <Box key={answer.id}>
              <Radio value={String(answer.id)} colorScheme={'accentGreen'}>
                {answer.text}
              </Radio>
            </Box>
          ))}
        </VStack>
      </RadioGroup>
    )
  }
}

function TestingCard({
  categories,
  onAnswerSelected
}: {
  categories: TestingCategory[]
  onAnswerSelected: (newIds: number[], oldIds: number[]) => void
}) {
  return (
    <Box>
      <VStack alignItems={'start'} gap={2}>
        {categories.map(category => (
          <Box
            key={category.id}
            border={'2px'}
            borderColor={'#f0ead2'}
            rounded="md"
            p={3}
            minWidth={'100%'}
          >
            <Text fontSize={'xl'}>{category.name}</Text>
            {category.testQuestions.map(question => (
              <Box>
                <Text fontSize={'lg'} py={2}>
                  {question.text}
                </Text>
                <QuestionCard
                  question={question}
                  onAnswerSelected={onAnswerSelected}
                />
              </Box>
            ))}
          </Box>
        ))}
      </VStack>
    </Box>
  )
}

function TestingPage() {
  const router = useRouter()
  const { id } = router.query

  // @ts-ignore
  const [client, setClient] = useState<Client>(null)
  const [testing, setTesting] = useState<TestingCategory[]>([])
  const [isLoading, setLoading] = useState<Boolean>(true)

  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])

  const handleAnswerSelected = (newIds: number[], oldIds: number[]) => {
    const selectedIds = selectedAnswers.filter(id => !oldIds.includes(id))
    setSelectedAnswers([...selectedIds, ...newIds])
  }

  useEffect(() => {
    console.log(selectedAnswers)
  }, [selectedAnswers])

  const handleSave = async () => {
    const newTesting: CreateTestingOfClient = {
      clientId: client.id,
      answerIds: selectedAnswers
    }
    postTestingOfClient(newTesting).then(data => {
      if (data === 201) {
        router.push(`/clients/${client.id}`)
      }
    })
  }

  function getData(id: Number) {
    getClientById(Number(id)).then(data => {
      setClient(data)
      getNewTesting().then(data => {
        setTesting(data)
        setLoading(false)
      })
    })
  }

  useEffect(() => {
    if (id) {
      getData(Number(id))
    }
  }, [id])

  if (isLoading) {
    return (
      <Flex justify={'center'}>
        <CircularProgress isIndeterminate size="100px" thickness="4px" />
      </Flex>
    )
  }

  return (
    <VStack alignItems={'start'} px={3} gap={5}>
      <Flex w={'100%'} alignItems={'center'} justifyContent={'start'}>
        <NextLink href={`/clients/${id}`}>
          <HStack>
            <FiArrowLeft />
            <Text>Вернуться</Text>
          </HStack>
        </NextLink>
      </Flex>
      <Text fontSize={'2xl'}>
        Тестрирование клиента {client.lastName} {client.firstName}{' '}
        {client.patronymic}
      </Text>
      <TestingCard
        categories={testing}
        onAnswerSelected={handleAnswerSelected}
      />
      <Button colorScheme={'accentGreen'} type="submit" onClick={handleSave}>
        Сохранить
      </Button>
    </VStack>
  )
}
