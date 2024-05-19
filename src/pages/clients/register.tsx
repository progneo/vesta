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
import CreateClientRequest from '@/types/requests/create/CreateClientRequest'
import ResponsibleForm from '@/components/responsibleForm'
import CreateResponsibleRequest from '@/types/requests/create/CreateResponsibleRequest'
import {
  createResponsible,
  createResponsibleOfClient
} from '@/lib/responsibles'
import { createDocument } from '@/lib/documents'
import CreateDocumentRequest from '@/types/requests/create/CreateDocumentRequest'

const childSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  patronymic: z.string().min(1, 'Patronymic is required').max(100),
  birthDate: z.coerce.date().max(new Date(), 'Birth date is required'),
  sex: z.string().length(1, 'Gender is required'),
  address: z.string().min(1, 'Address is required'),
  document: z.string().min(1, 'Document is required'),
  series: z.string().min(4, 'Serial is required'),
  number: z.string().min(6, 'Number is required')
})

function ClientRegisterPage() {
  const router = useRouter()

  const [hasMother, setMotherState] = useState(true)
  const [hasFather, setFatherState] = useState(true)
  const [hasCarerFirst, setCarerFirstState] = useState(false)
  const [hasCarerSecond, setCarerSecondState] = useState(false)

  const [motherData, setMotherData] = useState<CreateResponsibleRequest | null>(
    null
  )
  const [fatherData, setFatherData] = useState<CreateResponsibleRequest | null>(
    null
  )
  const [carerFirstData, setCarerFirstData] =
    useState<CreateResponsibleRequest | null>(null)
  const [carerSecondData, setCarerSecondData] =
    useState<CreateResponsibleRequest | null>(null)

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
      sex: 'М',
      address: '',
      document: 'passport',
      series: '',
      number: ''
    }
  })

  type FormSchema = z.infer<typeof childSchema>

  const onSubmit: SubmitHandler<FormSchema> = async data => {
    try {
      const newDocument: CreateDocumentRequest = {
        type: data.document,
        series: data.series,
        number: data.number
      }

      const document = await createDocument(newDocument)

      const newClient: CreateClientRequest = {
        firstName: data.firstName,
        lastName: data.lastName,
        patronymic: data.patronymic,
        birthDate: data.birthDate,
        sex: data.sex,
        address: data.address,
        documentId: document.id
      }

      const client = await createClient(newClient)

      if (fatherData !== null) {
        const newDocument: CreateDocumentRequest = {
          type: 'passport',
          series: fatherData.series,
          number: fatherData.number
        }

        const document = await createDocument(newDocument)
        fatherData.documentId = document.id

        const responsible = await createResponsible(fatherData)
        await createResponsibleOfClient(responsible.id, client.id)
      }
      if (motherData !== null) {
        const newDocument: CreateDocumentRequest = {
          type: 'passport',
          series: motherData.series,
          number: motherData.number
        }

        const document = await createDocument(newDocument)
        motherData.documentId = document.id

        const responsible = await createResponsible(motherData)
        await createResponsibleOfClient(responsible.id, client.id)
      }
      if (carerFirstData !== null) {
        const newDocument: CreateDocumentRequest = {
          type: 'passport',
          series: carerFirstData.series,
          number: carerFirstData.number
        }

        const document = await createDocument(newDocument)
        carerFirstData.documentId = document.id

        const responsible = await createResponsible(carerFirstData)
        await createResponsibleOfClient(responsible.id, client.id)
      }
      if (carerSecondData !== null) {
        const newDocument: CreateDocumentRequest = {
          type: 'passport',
          series: carerSecondData.series,
          number: carerSecondData.number
        }

        const document = await createDocument(newDocument)
        carerSecondData.documentId = document.id

        const responsible = await createResponsible(carerSecondData)
        await createResponsibleOfClient(responsible.id, client.id)
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
                  <FormLabel htmlFor="sex">Пол</FormLabel>
                  <RadioGroup defaultValue="М" id="sex">
                    <Stack direction="row">
                      <Radio
                        {...register('sex')}
                        colorScheme={'accentGreen'}
                        value="М"
                      >
                        М
                      </Radio>
                      <Radio
                        {...register('sex')}
                        colorScheme={'accentGreen'}
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
                <FormLabel htmlFor="childPassport">
                  Документ, удостоверяющий личность
                </FormLabel>
                <RadioGroup defaultValue="passport" id="document" mb={3}>
                  <Stack direction="row">
                    <Radio
                      {...register('document')}
                      colorScheme={'accentGreen'}
                      value="passport"
                    >
                      Паспорт
                    </Radio>
                    <Radio
                      {...register('document')}
                      colorScheme={'accentGreen'}
                      value="birthCertificate"
                    >
                      Свидетельство о рождении
                    </Radio>
                  </Stack>
                </RadioGroup>
                <HStack>
                  <Input
                    as={InputMask}
                    {...register('series')}
                    isInvalid={!!errors.series}
                    errorBorderColor="red.300"
                    id="childPassport"
                    mask="****"
                    placeholder={'0000'}
                    type="text"
                    w={'18%'}
                  />

                  <Input
                    as={InputMask}
                    {...register('number')}
                    isInvalid={!!errors.number}
                    errorBorderColor="red.300"
                    id="childPassport"
                    mask="******"
                    placeholder={'123456'}
                    type="text"
                  />
                </HStack>
              </FormControl>
              <HStack gap={5}>
                <Checkbox
                  colorScheme={'accentGreen'}
                  isChecked={hasMother}
                  onChange={e => setMotherState(e.target.checked)}
                >
                  Мать
                </Checkbox>
                <Checkbox
                  colorScheme={'accentGreen'}
                  isChecked={hasFather}
                  onChange={e => setFatherState(e.target.checked)}
                >
                  Отец
                </Checkbox>
                <Checkbox
                  colorScheme={'accentGreen'}
                  isChecked={hasCarerFirst}
                  onChange={e => setCarerFirstState(e.target.checked)}
                >
                  Опекун
                </Checkbox>
                <Checkbox
                  colorScheme={'accentGreen'}
                  isChecked={hasCarerSecond}
                  onChange={e => setCarerSecondState(e.target.checked)}
                >
                  Опекун
                </Checkbox>
              </HStack>
              <Button
                colorScheme={'accentGreen'}
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
        <ResponsibleForm
          onDataEdit={() => {
            setMotherData(null)
          }}
          onDataSave={(responsibleData: CreateResponsibleRequest) => {
            setMotherData(responsibleData)
          }}
          type={'Мать'}
        />
      )}
      {hasFather && (
        <ResponsibleForm
          onDataEdit={() => {
            setFatherData(null)
          }}
          onDataSave={(responsibleData: CreateResponsibleRequest) => {
            setFatherData(responsibleData)
          }}
          type={'Отец'}
        />
      )}
      {hasCarerFirst && (
        <ResponsibleForm
          onDataEdit={() => {
            setCarerFirstData(null)
          }}
          onDataSave={(responsibleData: CreateResponsibleRequest) => {
            setCarerFirstData(responsibleData)
          }}
          type={'Опекун'}
        />
      )}
      {hasCarerSecond && (
        <ResponsibleForm
          onDataEdit={() => {
            setCarerSecondData(null)
          }}
          onDataSave={(responsibleData: CreateResponsibleRequest) => {
            setCarerSecondData(responsibleData)
          }}
          type={'Опекун'}
        />
      )}
    </VStack>
  )
}

export default ClientRegisterPage
