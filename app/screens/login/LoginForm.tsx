import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigation } from 'expo-router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'react-native-paper'
import * as zod from 'zod'

import { userRepository } from '@/app/repositories/user'
import { IUser } from '@/app/storage/manageUser'
import { Box } from '@/components/ui/Box'
import { Text } from '@/components/ui/Text'
import { TextInput } from '@/components/ui/TextInput'
import { useToast } from '@/hooks/useToast'
import { useUser } from '@/hooks/useUser'
import { findFirstErrorZodMessage } from '@/utils/findFirstErrorZodMessage'
import { generateHash } from '@/utils/generateHash'

const loginFormValidationSchema = zod.object({
  email: zod
    .string({
      message: 'O email é obrigatório',
      required_error: 'O email é obrigatório',
    })
    .email({ message: 'Digite um email válido' }),
  password: zod
    .string({
      message: 'A senha é obrigatória',
      required_error: 'A senha é obrigatório',
    })
    .min(3, { message: 'Informe ao menos 8 caracteres para o campo do nome' }),
})

export type LoginForm = zod.infer<typeof loginFormValidationSchema>

export function LoginFormContainer() {
  const navigation = useNavigation()
  const { showToast } = useToast()

  const { setUser } = useUser()

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginFormValidationSchema),
    defaultValues: {
      email: 'henrique@hotmail.com',
      password: '12345678',
    },
  })

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = loginForm

  const onLogin = async (data: LoginForm) => {
    try {
      const { getUserByEmail } = await userRepository()
      const user = await getUserByEmail(data.email)

      if (!user) {
        throw new Error('Credenciais inválidas')
      }

      const passwordHashToCompare = await generateHash(data.password)

      if (user.password !== passwordHashToCompare) {
        throw new Error('Credenciais inválidas')
      }

      const userWithoutPassword: IUser = {
        email: user.email,
        id: user.id,
        name: user.name,
        newsLetterOption: true,
        photo: user.photo,
      }

      await setUser(userWithoutPassword)
      navigation.navigate('(tabs)')
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message, 'error')
      } else {
        showToast(
          'Um erro ocorreu ao tentar entrar em sua conta. Tente novamente',
          'error',
        )
      }
    }
    reset()
  }

  useEffect(() => {
    if (errors) {
      const firstErrorZodMessage = findFirstErrorZodMessage(errors)
      if (firstErrorZodMessage) {
        showToast(firstErrorZodMessage, 'error')
      }
    }
  }, [errors])

  return (
    <Box
      style={{
        width: '100%',
        paddingVertical: 25,
        paddingHorizontal: 10,
        gap: 15,
      }}
    >
      <Box style={{ justifyContent: 'space-between', gap: 40 }}>
        <Box style={{ gap: 16 }}>
          <Text variant="headlineMedium">Entrar</Text>

          <TextInput
            label="E-mail"
            control={control}
            name="email"
            textContentType="emailAddress"
          />
          <TextInput
            label="Senha"
            control={control}
            name="password"
            secureTextEntry={true}
          />
        </Box>
        <Box style={{ gap: 16 }}>
          <Button icon="login" mode="contained" onPress={handleSubmit(onLogin)}>
            Entrar
          </Button>
          <Link href="/screens/signup" asChild>
            <Button icon="account-group" mode="outlined">
              Cadastre-se
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
