import { useEffect, useState } from 'react'
import {
  Center,
  CircularProgress,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Button,
  VStack,
  Box,
  UnorderedList,
  ListItem,
  OrderedList,
  Divider
} from '@chakra-ui/react'
import { getTestingAnswers } from '@/lib/testing'
import TestingCategoryQuestions from '@/types/TestingCategoryQuestions'

interface TestingAnswersModalProps {
  isOpen: boolean
  onClose: () => void
  testingId: number
}

const TestingResultsModal: React.FC<TestingAnswersModalProps> = ({
  isOpen,
  onClose,
  testingId
}) => {
  const [data, setData] = useState<TestingCategoryQuestions[] | null>(null)

  useEffect(() => {
    setData(null)
    if (isOpen) {
      getTestingAnswers(testingId).then(responseData => {
        setData(responseData)
      })
    }
  }, [isOpen, testingId])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Результаты тестирования</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {data ? (
            <VStack alignItems={'start'} gap={'5'}>
              {data?.map((category, index) => (
                <VStack key={index} alignItems={'start'}>
                  <Text fontSize={'lg'} fontWeight={'semibold'}>
                    {category.category}
                  </Text>
                  {category.questionList.map((questionAnswer, qIndex) => (
                    <OrderedList key={qIndex}>
                      <ListItem>{questionAnswer.question}</ListItem>
                      <UnorderedList>
                        {questionAnswer.answerList.map((answer, aIndex) => (
                          <ListItem key={aIndex}>{answer}</ListItem>
                        ))}
                      </UnorderedList>
                    </OrderedList>
                  ))}
                </VStack>
              ))}
            </VStack>
          ) : (
            <Center>
              <CircularProgress isIndeterminate />
            </Center>
          )}
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}

export default TestingResultsModal
