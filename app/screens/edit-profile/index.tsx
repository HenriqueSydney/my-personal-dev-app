import { zodResolver } from '@hookform/resolvers/zod'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from 'expo-router'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View } from 'react-native'
import { Button, IconButton } from 'react-native-paper'
import * as zod from 'zod'

import { userRepository } from '@/app/repositories/user'
import { Box } from '@/components/ui/Box'
import { Header } from '@/components/ui/Header'
import { SafeBox } from '@/components/ui/SafeBox'
import { Skeleton } from '@/components/ui/Skeleton'
import { Switch } from '@/components/ui/Switch'
import { TextInput } from '@/components/ui/TextInput'
import { UserPhoto } from '@/components/ui/UserPhoto'
import { useLanguage } from '@/hooks/useLanguage'
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
  const { localizedStrings } = useLanguage()
  const { user, setUser } = useUser()
  const { showToast } = useToast()
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState<string | null>(null)
  const { goBack } = useNavigation()

  if (!user) {
    showToast(localizedStrings.sharedMessages.errors.userNotFound, 'error')
    goBack()
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
      showToast(localizedStrings.sharedMessages.errors.userNotFound, 'error')
      return
    }
    try {
      const { updateUserByEmail } = await userRepository()
      if (userPhoto) {
        const fileName = userPhoto.split('/').pop()
        const pathToAppUserPhoto = `${FileSystem.documentDirectory}${fileName}`

        // Copia a imagem para o diretório do app
        await FileSystem.copyAsync({
          from: userPhoto,
          to: pathToAppUserPhoto,
        })

        await updateUserByEmail({
          user,
          data: {
            email: user.email,
            name: data.name,
            photo: pathToAppUserPhoto,
            newsLetterOption: data.newsLetter,
          },
        })

        const updatedUser = Object.assign(user, {
          name: data.name,
          photo: pathToAppUserPhoto,
        })
        await setUser(updatedUser)
      } else {
        await updateUserByEmail({
          user,
          data: {
            email: user.email,
            name: data.name,
            newsLetterOption: data.newsLetter,
          },
        })

        const updatedUser = Object.assign(user, {
          name: data.name,
        })
        await setUser(updatedUser)
      }
      showToast(localizedStrings.profile.updateProfileSuccessMessage, 'success')
      goBack()
    } catch (error) {
      console.log(error)
      showToast(localizedStrings.sharedMessages.errors.genericError, 'error')
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
        showToast(
          localizedStrings.sharedMessages.photoSelectionCanceled,
          'warning',
        )
        return
      }

      if (photoSelected.assets[0].uri) {
        const photoUri = photoSelected.assets[0].uri

        setUserPhoto(photoUri)
      }
    } catch (error) {
      showToast(localizedStrings.sharedMessages.errors.genericError, 'error')
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
      <Header
        title={localizedStrings.profile.updateProfileButtonLabel}
        marginBottom={10}
      />
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
        <TextInput
          label={localizedStrings.globals.namePlaceholder}
          control={control}
          name="name"
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
        <Box style={{ gap: 25, marginTop: 35 }}>
          <Button
            icon="account-group"
            mode="contained"
            onPress={handleSubmit(onFormSubmit)}
          >
            {localizedStrings.profile.updateProfileButtonLabel}
          </Button>
        </Box>
      </Box>
    </SafeBox>
  )
}
