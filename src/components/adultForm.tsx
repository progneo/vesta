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
import CreateAdultRequest from '@/types/CreateAdultRequest'

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  patronymic: z.string().min(1, 'Patronymic is required'),
  phone: z.string().min(10, 'Phone is required'),
  identityDocument: z.string().min(10, 'Passport is required')
})

function AdultForm({
  onDataSave,
  onDataEdit,
  type
}: {
  onDataSave: (adultData: CreateAdultRequest) => void
  onDataEdit: () => void
  type: string
}) {
  const [isSaved, setSavedState] = useState(false)

  function enableEditing() {
    onDataEdit()
    setSavedState(false)
  }

  const onSubmit: SubmitHandler<FormSchema> = async data => {
    const adultData: CreateAdultRequest = {
      firstName: data.firstName,
      lastName: data.lastName,
      patronymic: data.patronymic,
      phone: data.phone,
      identityDocument: data.identityDocument,
      type: type
    }

    console.log(adultData)
    onDataSave(adultData)
    setSavedState(true)
  }

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { isSubmitting, errors }
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      patronymic: '',
      phone: '',
      identityDocument: ''
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
                  {...register('phone')}
                  isInvalid={!!errors.phone}
                  errorBorderColor="red.300"
                  mask="+7(***)***-**-**"
                  placeholder={'+7(___)___-__-__'}
                  inputMode="numeric"
                  isDisabled={isSaved}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Паспорт</FormLabel>
                <Input
                  as={InputMask}
                  {...register('identityDocument')}
                  isInvalid={!!errors.identityDocument}
                  errorBorderColor="red.300"
                  mask="**** ******"
                  placeholder={'0000 123456'}
                  inputMode="numeric"
                  isDisabled={isSaved}
                />
              </FormControl>
            </HStack>
            {isSaved && (
              <Button colorScheme={'orange'} onClick={enableEditing}>
                Редактировать данные
              </Button>
            )}
            {!isSaved && (
              <Button colorScheme={'teal'} type="submit">
                Сохранить данные
              </Button>
            )}
          </Stack>
        </Box>
      </Flex>
    </form>
  )
}

export default AdultForm
