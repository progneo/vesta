import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  VStack
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

const FormSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have than 8 characters')
})

function SignInCard() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { isSubmitting, errors }
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })
  type FormSchema = z.infer<typeof FormSchema>

  const onSubmit: SubmitHandler<FormSchema> = async data => {
    const signInData = await signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false
    })

    if (signInData?.error) {
      console.log(signInData.error)
    } else {
      router.push('/')
    }
  }

  useEffect(() => {
    setFocus('username')
  }, [])

  return (
    <Flex justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} color={'#695549'}>
            Вход в личный кабинет
          </Heading>
        </Stack>
        <Box rounded={'lg'} bg={'white'} boxShadow={'xs'} p={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl id="username">
                <FormLabel color={'#695549'}>Имя пользователя</FormLabel>
                <Input
                  {...register('username')}
                  colorScheme={'pink'}
                  isInvalid={!!errors.username}
                  errorBorderColor="red.300"
                  type="text"
                  id="username"
                />
              </FormControl>
              <FormControl>
                <FormLabel color={'#695549'}>Пароль</FormLabel>
                <Input
                  {...register('password')}
                  isInvalid={!!errors.password}
                  errorBorderColor="red.300"
                  type="password"
                  id="password"
                />
              </FormControl>
              <VStack pt={4}>
                <Button
                  bg={'#cadd8d'}
                  w={'300px'}
                  color={'#61674e'}
                  _hover={{
                    bg: '#9baa6c'
                  }}
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Войти
                </Button>
              </VStack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}

export default SignInCard
