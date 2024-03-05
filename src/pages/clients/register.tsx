'use client'

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
import NextLink from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'
import { z } from 'zod'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputMask from 'react-input-mask'
import { useEffect } from 'react'
import Mother from '@/types/Mother'
import Father from '@/types/Father'

const FormSchema = z.object({
  childFirstName: z.string().min(1, 'First name is required').max(100),
  childLastName: z.string().min(1, 'Last name is required').max(100),
  childPatronymic: z.string().min(1, 'Patronymic is required').max(100),
  childAddress: z.string().min(1, 'Address is required'),
  childPassport: z.string().min(10, 'Passport is required'),
  motherFirstName: z.string().min(1, 'First name is required'),
  motherLastName: z.string().min(1, 'Last name is required'),
  motherPatronymic: z.string().min(1, 'Patronymic is required'),
  motherPhone: z.string().min(10, 'Phone is required'),
  motherPassport: z.string().min(10, 'Passport is required'),
  fatherFirstName: z.string().min(1, 'First name is required'),
  fatherLastName: z.string().min(1, 'Last name is required'),
  fatherPatronymic: z.string().min(1, 'Patronymic is required'),
  fatherPhone: z.string().min(10, 'Phone is required'),
  fatherPassport: z.string().min(10, 'Passport is required')
})

function ClientRegisterPage() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { isSubmitting, errors }
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      childFirstName: '',
      childLastName: '',
      childPatronymic: '',
      childAddress: '',
      childPassport: '',
      motherFirstName: '',
      motherLastName: '',
      motherPatronymic: '',
      motherPhone: '',
      motherPassport: '',
      fatherFirstName: '',
      fatherLastName: '',
      fatherPatronymic: '',
      fatherPhone: '',
      fatherPassport: ''
    }
  })
  type FormSchema = z.infer<typeof FormSchema>

  const onSubmit: SubmitHandler<FormSchema> = async data => {
    const motherResponse = await fetch('/api/clients/mother', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: data.motherFirstName,
        lastName: data.motherLastName,
        patronymic: data.motherPatronymic,
        phone: data.motherPhone,
        identityDocument: data.motherPassport
      })
    })

    if (!motherResponse.ok) {
      console.error('Mother creating failed')
      return
    }

    const motherJson = await motherResponse.json()
    const mother: Mother = motherJson.mother

    const fatherResponse = await fetch('/api/clients/father', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: data.fatherFirstName,
        lastName: data.fatherLastName,
        patronymic: data.fatherPatronymic,
        phone: data.fatherPhone,
        identityDocument: data.fatherPassport
      })
    })

    if (!fatherResponse.ok) {
      console.error('Father creating failed')
      return
    }

    const fatherJson = await fatherResponse.json()
    const father: Father = fatherJson.father

    const response = await fetch('/api/clients/child', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: data.childFirstName,
        lastName: data.childLastName,
        patronymic: data.childPatronymic,
        address: data.childAddress,
        identityDocument: data.childPassport,
        motherId: mother.id,
        fatherId: father.id
      })
    })

    if (response.ok) {
      await router.push('/clients')
    } else {
      console.error('Registration failed')
    }
  }

  useEffect(() => {
    setFocus('childLastName')
  }, [])

  return (
    <Box px={3}>
      <NextLink href={'/clients'}>
        <HStack>
          <FiArrowLeft />
          <Text>Вернуться</Text>
        </HStack>
      </NextLink>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex my={4}>
          <Box
            border={'2px'}
            borderColor={'#f0ead2'}
            py={2}
            px={4}
            rounded="md"
            h={'min-content'}
            w={'120px'}
          >
            <Text textAlign={'center'}>Ребёнок</Text>
          </Box>
          <Box border={'2px'} borderColor={'#f0ead2'} p={4} rounded="md">
            <Stack spacing={4}>
              <FormControl>
                <FormLabel htmlFor="lastName">Фамилия</FormLabel>
                <Input
                  {...register('childLastName')}
                  isInvalid={!!errors.childLastName}
                  errorBorderColor="red.300"
                  id="childLastName"
                  type="text"
                />
              </FormControl>
              <HStack gap={4}>
                <FormControl>
                  <FormLabel htmlFor="childFirstName">Имя</FormLabel>
                  <Input
                    {...register('childFirstName')}
                    isInvalid={!!errors.childFirstName}
                    errorBorderColor="red.300"
                    id="childFirstName"
                    type="text"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="childPatronymic">Отчество</FormLabel>
                  <Input
                    {...register('childPatronymic')}
                    isInvalid={!!errors.childPatronymic}
                    errorBorderColor="red.300"
                    id="childPatronymic"
                    type="text"
                  />
                </FormControl>
              </HStack>
              <HStack>
                <FormControl>
                  <FormLabel htmlFor="childBirthDate">Дата рождения</FormLabel>
                  <Input
                    errorBorderColor="red.300"
                    id="childBirthDate"
                    type="date"
                  />
                </FormControl>
              </HStack>
              <FormControl>
                <FormLabel htmlFor="childAddress">Прописка</FormLabel>
                <Input
                  {...register('childAddress')}
                  isInvalid={!!errors.childAddress}
                  errorBorderColor="red.300"
                  id="childAddress"
                  type="text"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="childPassport">Паспорт</FormLabel>
                <Input
                  as={InputMask}
                  {...register('childPassport')}
                  isInvalid={!!errors.childPassport}
                  errorBorderColor="red.300"
                  id="passport"
                  mask="**** ******"
                  placeholder={'0000 123456'}
                  type="text"
                />
              </FormControl>
            </Stack>
          </Box>
        </Flex>
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
            <Text textAlign={'center'}>Мать</Text>
          </Box>
          <Box border={'2px'} borderColor={'#f0ead2'} p={4} rounded="md">
            <Stack spacing={4}>
              <FormControl>
                <FormLabel htmlFor="motherLastName">Фамилия</FormLabel>
                <Input
                  {...register('motherLastName')}
                  isInvalid={!!errors.motherLastName}
                  errorBorderColor="red.300"
                  id="motherLastName"
                  type="text"
                />
              </FormControl>
              <HStack gap={4}>
                <FormControl>
                  <FormLabel htmlFor="motherFirstName">Имя</FormLabel>
                  <Input
                    {...register('motherFirstName')}
                    isInvalid={!!errors.motherFirstName}
                    errorBorderColor="red.300"
                    id="motherFirstName"
                    type="text"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="motherPatronymic">Отчество</FormLabel>
                  <Input
                    {...register('motherPatronymic')}
                    isInvalid={!!errors.motherPatronymic}
                    errorBorderColor="red.300"
                    id="motherPatronymic"
                    type="text"
                  />
                </FormControl>
              </HStack>
              <HStack>
                <FormControl>
                  <FormLabel htmlFor="motherPhone">Телефон</FormLabel>
                  <Input
                    as={InputMask}
                    {...register('motherPhone')}
                    isInvalid={!!errors.motherPhone}
                    errorBorderColor="red.300"
                    id="motherPhone"
                    mask="+7(***)***-**-**"
                    placeholder={'+7(___)___-__-__'}
                    type="text"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="motherPassport">Паспорт</FormLabel>
                  <Input
                    as={InputMask}
                    {...register('motherPassport')}
                    isInvalid={!!errors.motherPassport}
                    errorBorderColor="red.300"
                    id="motherPassport"
                    mask="**** ******"
                    placeholder={'0000 123456'}
                    type="text"
                  />
                </FormControl>
              </HStack>
            </Stack>
          </Box>
        </Flex>
        <Flex my={4}>
          <Box
            border={'2px'}
            borderColor={'#f0ead2'}
            py={2}
            px={4}
            rounded="md"
            h={'min-content'}
            w={'120px'}
          >
            <Text textAlign={'center'}>Отец</Text>
          </Box>
          <Box border={'2px'} borderColor={'#f0ead2'} p={4} rounded="md">
            <Stack spacing={4}>
              <FormControl>
                <FormLabel htmlFor="fatherLastName">Фамилия</FormLabel>
                <Input
                  {...register('fatherLastName')}
                  isInvalid={!!errors.fatherLastName}
                  errorBorderColor="red.300"
                  id="fatherLastName"
                  type="text"
                />
              </FormControl>
              <HStack gap={4}>
                <FormControl>
                  <FormLabel htmlFor="fatherFirstName">Имя</FormLabel>
                  <Input
                    {...register('fatherFirstName')}
                    isInvalid={!!errors.fatherFirstName}
                    errorBorderColor="red.300"
                    id="fatherFirstName"
                    type="text"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="fatherPatronymic">Отчество</FormLabel>
                  <Input
                    {...register('fatherPatronymic')}
                    isInvalid={!!errors.fatherPatronymic}
                    errorBorderColor="red.300"
                    id="fatherPatronymic"
                    type="text"
                  />
                </FormControl>
              </HStack>
              <HStack>
                <FormControl>
                  <FormLabel htmlFor="fatherPhone">Телефон</FormLabel>
                  <Input
                    as={InputMask}
                    {...register('fatherPhone')}
                    isInvalid={!!errors.fatherPhone}
                    errorBorderColor="red.300"
                    id="fatherPhone"
                    mask="+7(***)***-**-**"
                    placeholder={'+7(___)___-__-__'}
                    type="text"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="fatherPassport">Паспорт</FormLabel>
                  <Input
                    as={InputMask}
                    {...register('fatherPassport')}
                    isInvalid={!!errors.fatherPassport}
                    errorBorderColor="red.300"
                    id="fatherPassport"
                    mask="**** ******"
                    placeholder={'0000 123456'}
                    type="text"
                  />
                </FormControl>
              </HStack>
            </Stack>
          </Box>
        </Flex>
        <Button colorScheme={'teal'} type="submit" isLoading={isSubmitting}>
          Зарегистрировать клиента
        </Button>
      </form>
    </Box>
  )
}

export default ClientRegisterPage
