'use client'

import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'
import { z } from 'zod'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputMask from 'react-input-mask'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/clients'
import CreateClientRequest from '@/types/CreateClientRequest'
import AdultForm from '@/components/adultForm'
import CreateAdultRequest from '@/types/CreateAdultRequest'
import { createAdult, createAdultOfClient } from '@/lib/adults'

const childSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  patronymic: z.string().min(1, 'Patronymic is required').max(100),
  birthDate: z.coerce.date().max(new Date(), 'Birth date is required'),
  gender: z.string().length(1, 'Gender is required'),
  address: z.string().min(1, 'Address is required'),
  passport: z.string().min(10, 'Passport is required')
})

function ClientRegisterPage() {
  const router = useRouter()

  const [hasMother, setMotherState] = useState(true)
  const [hasFather, setFatherState] = useState(true)
  const [hasCarerFirst, setCarerFirstState] = useState(false)
  const [hasCarerSecond, setCarerSecondState] = useState(false)

  const [motherData, setMotherData] = useState<CreateAdultRequest | null>(null)
  const [fatherData, setFatherData] = useState<CreateAdultRequest | null>(null)
  const [carerFirstData, setCarerFirstData] =
    useState<CreateAdultRequest | null>(null)
  const [carerSecondData, setCarerSecondData] =
    useState<CreateAdultRequest | null>(null)

  const [canCreate, setCreateAbilityState] = useState(false)

  useEffect(() => {
    console.log(motherData)
    setCreateAbilityState(
      (hasMother && motherData === null) ||
        (hasFather && fatherData === null) ||
        (hasCarerFirst && carerFirstData === null) ||
        (hasCarerSecond && carerSecondData === null)
    )
  }, [
    hasMother,
    hasFather,
    hasCarerFirst,
    hasCarerSecond,
    fatherData,
    motherData,
    carerFirstData,
    carerSecondData
  ])

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { isSubmitting, errors }
  } = useForm<z.infer<typeof childSchema>>({
    resolver: zodResolver(childSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      patronymic: '',
      birthDate: undefined,
      gender: 'М',
      address: '',
      passport: ''
    }
  })

  type FormSchema = z.infer<typeof childSchema>

  const onSubmit: SubmitHandler<FormSchema> = async data => {
    const newClient: CreateClientRequest = {
      firstName: data.firstName,
      lastName: data.lastName,
      patronymic: data.patronymic,
      birthDate: data.birthDate,
      gender: data.gender,
      address: data.address,
      identityDocument: data.passport
    }

    try {
      const client = await createClient(newClient)

      if (fatherData !== null) {
        const adult = await createAdult(fatherData)
        await createAdultOfClient(adult.id, client.id)
      }
      if (motherData !== null) {
        const adult = await createAdult(motherData)
        await createAdultOfClient(adult.id, client.id)
      }
      if (carerFirstData !== null) {
        const adult = await createAdult(carerFirstData)
        await createAdultOfClient(adult.id, client.id)
      }
      if (carerSecondData !== null) {
        const adult = await createAdult(carerSecondData)
        await createAdultOfClient(adult.id, client.id)
      }

      await router.push('/clients')
    } catch (e) {
      console.error('Registration failed')
    }
  }

  useEffect(() => {
    setFocus('lastName')
  }, [])

  return (
    <VStack alignItems={'start'} px={3} gap={4}>
      <NextLink href={'/clients'}>
        <HStack>
          <FiArrowLeft />
          <Text>Вернуться</Text>
        </HStack>
      </NextLink>
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
            <Text textAlign={'center'}>Ребёнок</Text>
          </Box>
          <Box border={'2px'} borderColor={'#f0ead2'} p={4} rounded="md">
            <Stack spacing={4}>
              <FormControl>
                <FormLabel htmlFor="childLastName">Фамилия</FormLabel>
                <Input
                  {...register('lastName')}
                  isInvalid={!!errors.lastName}
                  errorBorderColor="red.300"
                  id="childLastName"
                  type="text"
                />
              </FormControl>
              <HStack gap={4}>
                <FormControl>
                  <FormLabel htmlFor="childFirstName">Имя</FormLabel>
                  <Input
                    {...register('firstName')}
                    isInvalid={!!errors.firstName}
                    errorBorderColor="red.300"
                    id="childFirstName"
                    type="text"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="childPatronymic">Отчество</FormLabel>
                  <Input
                    {...register('patronymic')}
                    isInvalid={!!errors.patronymic}
                    errorBorderColor="red.300"
                    id="childPatronymic"
                    type="text"
                  />
                </FormControl>
              </HStack>
              <HStack gap={4}>
                <FormControl>
                  <FormLabel htmlFor="childBirthDate">Дата рождения</FormLabel>
                  <Input
                    {...register('birthDate')}
                    isInvalid={!!errors.birthDate}
                    errorBorderColor="red.300"
                    id="childBirthDate"
                    type="date"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="gender">Пол</FormLabel>
                  <RadioGroup defaultValue="М" id="gender">
                    <Stack direction="row">
                      <Radio
                        {...register('gender')}
                        colorScheme={'teal'}
                        value="М"
                      >
                        М
                      </Radio>
                      <Radio
                        {...register('gender')}
                        colorScheme={'teal'}
                        value="Ж"
                      >
                        Ж
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
              </HStack>
              <FormControl>
                <FormLabel htmlFor="address">Прописка</FormLabel>
                <Input
                  {...register('address')}
                  isInvalid={!!errors.address}
                  errorBorderColor="red.300"
                  id="address"
                  type="text"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="childPassport">Паспорт</FormLabel>
                <Input
                  as={InputMask}
                  {...register('passport')}
                  isInvalid={!!errors.passport}
                  errorBorderColor="red.300"
                  id="childPassport"
                  mask="**** ******"
                  placeholder={'0000 123456'}
                  type="text"
                />
              </FormControl>
              <HStack gap={5}>
                <Checkbox
                  colorScheme={'teal'}
                  isChecked={hasMother}
                  onChange={e => setMotherState(e.target.checked)}
                >
                  Мать
                </Checkbox>
                <Checkbox
                  colorScheme={'teal'}
                  isChecked={hasFather}
                  onChange={e => setFatherState(e.target.checked)}
                >
                  Отец
                </Checkbox>
                <Checkbox
                  colorScheme={'teal'}
                  isChecked={hasCarerFirst}
                  onChange={e => setCarerFirstState(e.target.checked)}
                >
                  Опекун
                </Checkbox>
                <Checkbox
                  colorScheme={'teal'}
                  isChecked={hasCarerSecond}
                  onChange={e => setCarerSecondState(e.target.checked)}
                >
                  Опекун
                </Checkbox>
              </HStack>
              <Button
                colorScheme={'teal'}
                type="submit"
                isLoading={isSubmitting}
                isDisabled={canCreate}
              >
                Зарегистрировать клиента
              </Button>
            </Stack>
          </Box>
        </Flex>
      </form>
      {hasMother && (
        <AdultForm
          onDataEdit={() => {
            setMotherData(null)
          }}
          onDataSave={(adultData: CreateAdultRequest) => {
            setMotherData(adultData)
          }}
          type={'Мать'}
        />
      )}
      {hasFather && (
        <AdultForm
          onDataEdit={() => {
            setFatherData(null)
          }}
          onDataSave={(adultData: CreateAdultRequest) => {
            setFatherData(adultData)
          }}
          type={'Отец'}
        />
      )}
      {hasCarerFirst && (
        <AdultForm
          onDataEdit={() => {
            setCarerFirstData(null)
          }}
          onDataSave={(adultData: CreateAdultRequest) => {
            setCarerFirstData(adultData)
          }}
          type={'Опекун'}
        />
      )}
      {hasCarerSecond && (
        <AdultForm
          onDataEdit={() => {
            setCarerSecondData(null)
          }}
          onDataSave={(adultData: CreateAdultRequest) => {
            setCarerSecondData(adultData)
          }}
          type={'Опекун'}
        />
      )}
    </VStack>
  )
}

export default ClientRegisterPage
