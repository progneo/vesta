import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text
} from '@chakra-ui/react'
import InputMask from 'react-input-mask'
import { useState } from 'react'
import CreateResponsibleRequest from '@/types/requests/create/CreateResponsibleRequest'

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  patronymic: z.string().min(1, 'Patronymic is required'),
  phoneNumber: z.string().min(10, 'Phone is required'),
  series: z.string().min(4, 'Serial is required'),
  number: z.string().min(6, 'Number is required')
})

function ResponsibleForm({
  onDataSave,
  onDataEdit,
  type
}: {
  onDataSave: (responsibleData: CreateResponsibleRequest) => void
  onDataEdit: () => void
  type: string
}) {
  const [isSaved, setSavedState] = useState(false)

  function enableEditing() {
    onDataEdit()
    setSavedState(false)
  }

  const onSubmit: SubmitHandler<FormSchema> = async data => {
    const responsibleData: CreateResponsibleRequest = {
      firstName: data.firstName,
      lastName: data.lastName,
      patronymic: data.patronymic,
      phoneNumber: data.phoneNumber,
      type: type,
      series: data.series,
      number: data.number,
      documentId: undefined
    }

    onDataSave(responsibleData)
    setSavedState(true)
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      patronymic: '',
      phoneNumber: '',
      series: '',
      number: ''
    }
  })

  type FormSchema = z.infer<typeof schema>

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex>
        <Box
          border={'2px'}
          borderColor={'#f0ead2'}
          py={2}
          px={4}
          rounded="md"
          h={'min-content'}
          w={'120px'}
        >
          <Text textAlign={'center'}>{type}</Text>
        </Box>
        <Box border={'2px'} borderColor={'#f0ead2'} p={4} rounded="md">
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Фамилия</FormLabel>
              <Input
                {...register('lastName')}
                isInvalid={!!errors.lastName}
                errorBorderColor="red.300"
                type="text"
                isDisabled={isSaved}
              />
            </FormControl>
            <HStack gap={4}>
              <FormControl>
                <FormLabel>Имя</FormLabel>
                <Input
                  {...register('firstName')}
                  isInvalid={!!errors.firstName}
                  errorBorderColor="red.300"
                  type="text"
                  isDisabled={isSaved}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Отчество</FormLabel>
                <Input
                  {...register('patronymic')}
                  isInvalid={!!errors.patronymic}
                  errorBorderColor="red.300"
                  type="text"
                  isDisabled={isSaved}
                />
              </FormControl>
            </HStack>
            <HStack>
              <FormControl>
                <FormLabel>Телефон</FormLabel>
                <Input
                  as={InputMask}
                  {...register('phoneNumber')}
                  isInvalid={!!errors.phoneNumber}
                  errorBorderColor="red.300"
                  mask="+7(***)***-**-**"
                  placeholder={'+7(___)___-__-__'}
                  inputMode="numeric"
                  isDisabled={isSaved}
                />
              </FormControl>
            </HStack>
            <FormControl>
              <FormLabel>Паспорт</FormLabel>
              <HStack>
                <Input
                  as={InputMask}
                  {...register('series')}
                  isInvalid={!!errors.series}
                  errorBorderColor="red.300"
                  mask="****"
                  placeholder={'0000'}
                  inputMode="numeric"
                  isDisabled={isSaved}
                  w={'17%'}
                />
                <Input
                  as={InputMask}
                  {...register('number')}
                  isInvalid={!!errors.number}
                  errorBorderColor="red.300"
                  mask="******"
                  placeholder={'123456'}
                  inputMode="numeric"
                  isDisabled={isSaved}
                />
              </HStack>
            </FormControl>
            {isSaved && (
              <Button colorScheme={'orange'} onClick={enableEditing}>
                Редактировать данные
              </Button>
            )}
            {!isSaved && (
              <Button colorScheme={'accentGreen'} type="submit">
                Сохранить данные
              </Button>
            )}
          </Stack>
        </Box>
      </Flex>
    </form>
  )
}

export default ResponsibleForm
