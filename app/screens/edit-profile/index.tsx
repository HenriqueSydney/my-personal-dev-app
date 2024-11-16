import { zodResolver } from '@hookform/resolvers/zod'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from 'expo-router'
import * as SQLite from 'expo-sqlite'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View } from 'react-native'
import { Button, IconButton } from 'react-native-paper'
import * as zod from 'zod'

import { Box } from '@/components/ui/Box'
import { Header } from '@/components/ui/Header'
import { SafeBox } from '@/components/ui/SafeBox'
import { Skeleton } from '@/components/ui/Skeleton'
import { Switch } from '@/components/ui/Switch'
import { TextInput } from '@/components/ui/TextInput'
import { UserPhoto } from '@/components/ui/UserPhoto'
import { useToast } from '@/hooks/useToast'
import { useUser } from '@/hooks/useUser'

const signUpFormValidationSchema = zod.object({
  name: zod
    .string({
      message: 'O nome é obrigatório',
      required_error: 'O nome é obrigatório',
    })
    .min(3, { message: 'Informe ao menos 8 caracteres para o campo do nome' })
    .max(40, { message: 'O campo do nome permite apenas 40 caracteres' }),

  newsLetter: zod.boolean({
    message: 'A informação se deseja ou não receber a Newsletter é obrigatória',
    required_error:
      'A informação se deseja ou não receber a Newsletter é obrigatória',
  }),
})

export type SignUpForm = zod.infer<typeof signUpFormValidationSchema>

export default function Profile() {
  const db = SQLite.useSQLiteContext()
  const { user, setUser } = useUser()
  const { showToast } = useToast()
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState<string | null>(null)
  const { navigate, goBack } = useNavigation()

  if (!user) {
    showToast('Usuário não localizado!', 'error')
    navigate('(tabs)')
  }

  const contactForm = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormValidationSchema),
    defaultValues: {
      name: user?.name,
      newsLetter: true,
    },
  })

  const { handleSubmit, control } = contactForm

  const onFormSubmit = async (data: SignUpForm) => {
    if (!user) {
      showToast('Usuário não localizado!', 'error')
      return
    }
    try {
      const newsLetterBooleanLike = data.newsLetter ? 1 : 0
      if (userPhoto) {
        const fileName = userPhoto.split('/').pop()
        const pathToAppUserPhoto = `${FileSystem.documentDirectory}${fileName}`

        // Copia a imagem para o diretório do app
        await FileSystem.copyAsync({
          from: userPhoto,
          to: pathToAppUserPhoto,
        })

        await db.runAsync(
          'UPDATE users SET name = $name,  newsLetterOption = $newsLetterBooleanLike, photo = $photo  WHERE id = $id',
          {
            $name: data.name,
            $newsLetterBooleanLike: newsLetterBooleanLike,
            $photo: pathToAppUserPhoto,
            $id: user.id,
          },
        )
        const updatedUser = Object.assign(user, {
          name: data.name,
          photo: pathToAppUserPhoto,
        })
        await setUser(updatedUser)
      } else {
        await db.runAsync(
          'UPDATE users SET name = $name,  newsLetterOption = $newsLetterBooleanLike WHERE id = $id',
          {
            $name: data.name,
            $newsLetterBooleanLike: newsLetterBooleanLike,
            $id: user.id,
          },
        )
        const updatedUser = Object.assign(user, {
          name: data.name,
        })
        await setUser(updatedUser)
      }
      showToast('Perfil atualizado com sucesso', 'success')
      goBack()
    } catch (error) {
      showToast('Um erro ocorreu. Tente novamente', 'error')
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
      showToast('Um erro ocorreu. Tente novamente', 'error')
    } finally {
      setPhotoIsLoading(false)
    }
  }

  return (
    <SafeBox
      style={{
        alignItems: 'center',
        gap: 24,
        height: '100%',
      }}
    >
      <Header title="Editar perfil" marginBottom={10} />
      <Box
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 25,
        }}
      >
        {photoIsLoading && <Skeleton />}
        {!photoIsLoading && (
          <Box>
            <UserPhoto image={{ uri: user?.photo }} size={180} />
            <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
              <IconButton
                icon="account-edit"
                onPress={handleUserPhotoSelect}
                mode="contained"
              />
            </View>
          </Box>
        )}
      </Box>
      <Box style={{ marginTop: 35, gap: 16, padding: 10 }}>
        <TextInput label="Nome" control={control} name="name" />
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
        <Box style={{ gap: 25, marginTop: 35 }}>
          <Button
            icon="account-group"
            mode="outlined"
            onPress={handleSubmit(onFormSubmit)}
          >
            Atualizar cadastro
          </Button>
        </Box>
      </Box>
    </SafeBox>
  )
}
