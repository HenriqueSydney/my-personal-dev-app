/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod'
import * as FileSystem from 'expo-file-system'
import { useNavigation } from 'expo-router'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button } from 'react-native-paper'
import * as zod from 'zod'

import { Box } from '@/components/ui/Box'
import { Header } from '@/components/ui/Header'
import { SafeBox } from '@/components/ui/SafeBox'
import { Switch } from '@/components/ui/Switch'
import { TextInput } from '@/components/ui/TextInput'
import { useLanguage } from '@/hooks/useLanguage'
import { useToast } from '@/hooks/useToast'
import { findFirstErrorZodMessage } from '@/utils/findFirstErrorZodMessage'
import { generateHash } from '@/utils/generateHash'

import { userRepository } from '../../repositories/user'
import PhotoSelectionArea from './PhotoSelectionArea'

const signUpFormValidationSchema = zod.object({
  name: zod
    .string({
      message: 'O nome é obrigatório',
      required_error: 'O nome é obrigatório',
    })
    .min(3, { message: 'Informe ao menos 8 caracteres para o campo do nome' })
    .max(40, { message: 'O campo do nome permite apenas 40 caracteres' }),
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
    .min(3, { message: 'Informe ao menos 8 caracteres para o campo da senha' }),
  confimPassword: zod.string({
    message: 'A confirmação da senha é obrigatória',
    required_error: 'A confirmação da senha é obrigatório',
  }),
  newsLetter: zod.boolean({
    message: 'A informação se deseja ou não receber a Newsletter é obrigatória',
    required_error:
      'A informação se deseja ou não receber a Newsletter é obrigatória',
  }),
})

export type SignUpForm = zod.infer<typeof signUpFormValidationSchema>

export default function SignUp() {
  const { localizedStrings } = useLanguage()
  const navigation = useNavigation()

  const { showToast } = useToast()
  const [userPhoto, setUserPhoto] = useState<string | null>(null)

  const contactForm = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormValidationSchema),
    defaultValues: {
      email: '',
      password: '',
      confimPassword: '',
      name: '',
      newsLetter: true,
    },
  })

  const {
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
  } = contactForm

  const onFormSubmit = async (data: SignUpForm) => {
    try {
      if (data.confimPassword !== data.password) {
        setError('confimPassword', {
          message: localizedStrings.sharedMessages.missMatchPasswords,
        })
        return
      }

      const passwordHash = await generateHash(data.password)

      if (!userPhoto) {
        showToast(localizedStrings.sharedMessages.askForPhotoSelection, 'error')
        return
      }
      const { getUserByEmail, createUser } = await userRepository()

      const doesUserExists = await getUserByEmail(data.email)

      if (doesUserExists) {
        throw new Error(
          localizedStrings.sharedMessages.errors.userAlreadyExists,
        )
      }

      const fileName = userPhoto.split('/').pop()
      const pathToAppUserPhoto = `${FileSystem.documentDirectory}${fileName}`

      // Copia a imagem para o diretório do app
      await FileSystem.copyAsync({
        from: userPhoto,
        to: pathToAppUserPhoto,
      })

      await createUser({
        name: data.name,
        passwordHash,
        newsLetterOption: data.newsLetter,
        email: data.email,
        photo: pathToAppUserPhoto,
      })

      reset()
      navigation.navigate('screens/login/index')
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message, 'error')
      } else {
        showToast(localizedStrings.sharedMessages.errors.genericError, 'error')
      }
    }
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
    <SafeBox>
      <Header
        title={localizedStrings.signUpScreen.header}
        marginBottom={10}
        showLoginIcon={false}
      />
      <Box
        style={{
          width: '100%',
          paddingBottom: 25,
          paddingHorizontal: 10,
          gap: 15,
        }}
      >
        <Box style={{ justifyContent: 'space-between', gap: 20 }}>
          <Box style={{ gap: 16 }}>
            <PhotoSelectionArea
              setUserPhoto={setUserPhoto}
              userPhoto={userPhoto}
            />
            <Box style={{ marginTop: 10, gap: 16 }}>
              <TextInput
                label={localizedStrings.globals.namePlaceholder}
                control={control}
                name="name"
              />
              <TextInput
                label={localizedStrings.globals.emailPlaceholder}
                control={control}
                name="email"
                textContentType="emailAddress"
              />
              <TextInput
                label={localizedStrings.signUpScreen.passwordLabel}
                control={control}
                name="password"
                secureTextEntry={true}
              />
              <TextInput
                label={localizedStrings.signUpScreen.confirmPasswordLabel}
                control={control}
                name="confimPassword"
                secureTextEntry={true}
              />
              <Controller
                control={control}
                name="newsLetter"
                render={({ field }) => {
                  return (
                    <Switch
                      label={localizedStrings.globals.newsLatterLabel}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )
                }}
              />
            </Box>
          </Box>
          <Box>
            <Button
              icon="account-group"
              mode="contained"
              onPress={handleSubmit(onFormSubmit)}
            >
              {localizedStrings.signUpScreen.signUpButtonLabel}
            </Button>
          </Box>
        </Box>
      </Box>
    </SafeBox>
  )
}
