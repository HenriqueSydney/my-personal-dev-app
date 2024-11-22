import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'react-native-paper'
import * as zod from 'zod'

import { Box } from '@/components/ui/Box'
import { Text } from '@/components/ui/Text'
import { TextInput } from '@/components/ui/TextInput'
import { useLanguage } from '@/hooks/useLanguage'
import { useToast } from '@/hooks/useToast'
import { useUser } from '@/hooks/useUser'
import { findFirstErrorZodMessage } from '@/utils/findFirstErrorZodMessage'

const concatFormValidationSchema = zod.object({
  text: zod
    .string({
      message: 'O texto da mensagem é obrigatório',
      required_error: 'O texto da mensagem é obrigatório',
    })
    .min(20, {
      message:
        'Informe ao menos 20 caracteres para o campo do texto da mensagem',
    })
    .max(1000, {
      message: 'O campo do texto da mensagem permite apenas 1000 caracteres',
    }),
  name: zod
    .string({
      message: 'O nome é obrigatório',
      required_error: 'O nome é obrigatório',
    })
    .min(3, { message: 'Informe ao menos 3 caracteres para o campo do nome' })
    .max(40, { message: 'O campo do nome permite apenas 40 caracteres' }),
  email: zod
    .string({
      message: 'O email é obrigatório',
      required_error: 'O email é obrigatório',
    })
    .email({ message: 'Digite um email válido' }),
})

export type ContactForm = zod.infer<typeof concatFormValidationSchema>

export function ContactContainer() {
  const { localizedStrings } = useLanguage()
  const { showToast } = useToast()
  const { user } = useUser()

  const contactForm = useForm<ContactForm>({
    resolver: zodResolver(concatFormValidationSchema),
    defaultValues: {
      email: user?.email ?? '',
      text: '',
      name: user?.name ?? '',
    },
  })

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = contactForm

  async function onSubmit() {
    showToast(
      localizedStrings.homeScreen.contactContainer.messageSendSuccessMessage,
      'success',
    )
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
      darkColor="#0d1117"
      lightColor="#ebebeb"
      style={{
        width: '100%',
        paddingVertical: 25,
        paddingHorizontal: 10,
        gap: 15,
      }}
    >
      <Text variant="headlineMedium">
        {localizedStrings.homeScreen.contactContainer.title}
      </Text>
      <TextInput
        label={localizedStrings.globals.namePlaceholder}
        control={control}
        name="name"
      />
      <TextInput
        label={
          localizedStrings.homeScreen.contactContainer.contactEmailPlaceholder
        }
        control={control}
        name="email"
      />
      <TextInput
        label={localizedStrings.globals.messagePlaceholder}
        numberOfLines={10}
        multiline={true}
        control={control}
        style={{ minHeight: 120 }}
        name="text"
      />
      <Button
        icon="email-send"
        mode="outlined"
        onPress={handleSubmit(onSubmit)}
      >
        {localizedStrings.globals.sendButtonLabel}
      </Button>
    </Box>
  )
}
