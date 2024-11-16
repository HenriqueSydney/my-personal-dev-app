/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from 'expo-router'
import * as SQLite from 'expo-sqlite'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View } from 'react-native'
import { Avatar, Button, IconButton } from 'react-native-paper'
import * as zod from 'zod'

import { Box } from '@/components/ui/Box'
import { Header } from '@/components/ui/Header'
import { SafeBox } from '@/components/ui/SafeBox'
import { Skeleton } from '@/components/ui/Skeleton'
import { Switch } from '@/components/ui/Switch'
import { TextInput } from '@/components/ui/TextInput'
import { UserPhoto } from '@/components/ui/UserPhoto'
import { useToast } from '@/hooks/useToast'
import { findFirstErrorZodMessage } from '@/utils/findFirstErrorZodMessage'
import { generateHash } from '@/utils/generateHash'

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
    .min(3, { message: 'Informe ao menos 8 caracteres para o campo do nome' }),
  confimPassword: zod
    .string({
      message: 'A confirmação da senha é obrigatória',
      required_error: 'A confirmação da senha é obrigatório',
    })
    .min(3, { message: 'Informe ao menos 8 caracteres para o campo do nome' }),
  newsLetter: zod.boolean({
    message: 'A informação se deseja ou não receber a Newsletter é obrigatória',
    required_error:
      'A informação se deseja ou não receber a Newsletter é obrigatória',
  }),
})

export type SignUpForm = zod.infer<typeof signUpFormValidationSchema>

export default function SignUp() {
  const navigation = useNavigation()
  const db = SQLite.useSQLiteContext()

  const { showToast } = useToast()
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState<string | null>(null)

  const contactForm = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormValidationSchema),
    defaultValues: {
      email: 'henrique@hotmail.com',
      password: '12345678',
      confimPassword: '12345678',
      name: 'Henrique',
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
          message: 'A confirmação da senha deve ser igual à senha',
        })
        return
      }

      const passwordHash = await generateHash(data.password)

      if (!userPhoto) {
        showToast('Por favor, selecione uma foto', 'error')
        return
      }

      const doesUserExists = await db.getFirstAsync(
        'SELECT name, password, email, photo FROM users WHERE email=?;',
        data.email,
      )

      if (doesUserExists) {
        throw new Error('Usuário já existe')
      }

      const fileName = userPhoto.split('/').pop()
      const pathToAppUserPhoto = `${FileSystem.documentDirectory}${fileName}`

      // Copia a imagem para o diretório do app
      await FileSystem.copyAsync({
        from: userPhoto,
        to: pathToAppUserPhoto,
      })

      const newsLetterBooleanLike = data.newsLetter ? 1 : 0

      await db.runAsync(
        'INSERT INTO users (name, password, email, photo) values (?, ?, ?, ?);',
        [
          data.name,
          passwordHash,
          data.email,
          pathToAppUserPhoto,
          newsLetterBooleanLike,
        ],
      )

      reset()
      navigation.navigate('screens/login/index')
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message, 'error')
      } else {
        showToast('Um erro aconteceu. Tente novamente', 'error')
      }
    }
  }

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true)
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (photoSelected.canceled) {
        showToast('Usuário cancelou a seleção da foto', 'warning')
        return
      }

      if (photoSelected.assets[0].uri) {
        const photoUri = photoSelected.assets[0].uri

        setUserPhoto(photoUri)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
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
      <Header title="Cadastrar" marginBottom={10} showLoginIcon={false} />
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
            {photoIsLoading && <Skeleton />}
            {userPhoto && !photoIsLoading && (
              <Box
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box>
                  <UserPhoto image={{ uri: userPhoto }} size={180} />
                  <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
                    <IconButton
                      icon="camera-plus"
                      onPress={handleUserPhotoSelect}
                      mode="contained"
                    />
                  </View>
                </Box>
              </Box>
            )}

            {!userPhoto && !photoIsLoading && (
              <Box
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box>
                  <Avatar.Icon icon="face-man-shimmer" size={180} />
                  <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
                    <IconButton
                      icon="camera-plus"
                      onPress={handleUserPhotoSelect}
                      mode="contained"
                    />
                  </View>
                </Box>
              </Box>
            )}

            <Box style={{ marginTop: 10, gap: 16 }}>
              <TextInput label="Nome" control={control} name="name" />
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
              <TextInput
                label="Confirmação da Senha"
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
                      label="Aceito receber a Newsletter"
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
              Cadastrar
            </Button>
          </Box>
        </Box>
      </Box>
    </SafeBox>
  )
}
