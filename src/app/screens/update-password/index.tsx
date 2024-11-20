import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from 'expo-router'
import { useForm } from 'react-hook-form'
import { Button } from 'react-native-paper'
import * as zod from 'zod'

import { Box } from '@/components/ui/Box'
import { Header } from '@/components/ui/Header'
import { SafeBox } from '@/components/ui/SafeBox'
import { TextInput } from '@/components/ui/TextInput'
import { UserPhoto } from '@/components/ui/UserPhoto'
import { useLanguage } from '@/hooks/useLanguage'
import { useToast } from '@/hooks/useToast'
import { useUser } from '@/hooks/useUser'
import { userRepository } from '@/repositories/user'
import { generateHash } from '@/utils/generateHash'

const signUpFormValidationSchema = zod.object({
  oldPassword: zod
    .string({
      message: 'A senha atual é obrigatória',
      required_error: 'A senha atual é obrigatório',
    })
    .min(3, {
      message: 'Informe ao menos 8 caracteres para o campo da senha atual',
    }),

  newPassword: zod
    .string({
      message: 'A nova senha é obrigatória',
      required_error: 'A nova senha é obrigatório',
    })
    .min(3, {
      message: 'Informe ao menos 8 caracteres para o campo da nova senha',
    }),
  confimPassword: zod.string({
    message: 'A confirmação da senha é obrigatória',
    required_error: 'A confirmação da senha é obrigatório',
  }),
})

export type SignUpForm = zod.infer<typeof signUpFormValidationSchema>

export default function UpdatePassword() {
  const { localizedStrings } = useLanguage()
  const { user } = useUser()
  const { showToast } = useToast()
  const { goBack } = useNavigation()

  if (!user) {
    showToast(localizedStrings.sharedMessages.errors.userNotFound, 'error')
    goBack()
  }

  const contactForm = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormValidationSchema),
  })

  const { handleSubmit, control, setError } = contactForm

  const onFormSubmit = async (data: SignUpForm) => {
    if (!user) {
      showToast(localizedStrings.sharedMessages.errors.userNotFound, 'error')
      return
    }
    try {
      if (data.confimPassword !== data.newPassword) {
        setError('confimPassword', {
          message: localizedStrings.sharedMessages.missMatchPasswords,
        })
        return
      }
      const { updateUserPasswordByEmail } = await userRepository()

      const newHashedPassword = await generateHash(data.newPassword)

      await updateUserPasswordByEmail({
        user,
        newHashedPassword,
      })

      showToast(
        localizedStrings.profile.updatePasswordSuccessMessage,
        'success',
      )
      goBack()
    } catch (error) {
      console.log(error)
      showToast(localizedStrings.sharedMessages.errors.genericError, 'error')
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
        title={localizedStrings.profile.changePasswordLabel}
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
        <Box>
          <UserPhoto image={{ uri: user?.photo }} size={180} />
        </Box>
      </Box>
      <Box style={{ marginTop: 35, gap: 16, padding: 10 }}>
        <TextInput
          label={localizedStrings.profile.oldPasswordLabel}
          control={control}
          name="oldPassword"
          secureTextEntry={true}
        />
        <TextInput
          label={localizedStrings.profile.newPasswordLabel}
          control={control}
          name="newPassword"
          secureTextEntry={true}
        />
        <TextInput
          label={localizedStrings.profile.confirmPasswordLabel}
          control={control}
          name="confimPassword"
          secureTextEntry={true}
        />

        <Box style={{ gap: 25, marginTop: 35 }}>
          <Button
            icon="pencil-lock"
            mode="contained"
            onPress={handleSubmit(onFormSubmit)}
          >
            {localizedStrings.profile.updatePasswordLabel}
          </Button>
        </Box>
      </Box>
    </SafeBox>
  )
}
