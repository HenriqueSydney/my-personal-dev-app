import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'react-native-paper'
import * as zod from 'zod'

import { Box } from '@/components/ui/Box'
import { Text } from '@/components/ui/Text'
import { TextInput } from '@/components/ui/TextInput'
import { useToast } from '@/hooks/useToast'
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
  const { showToast } = useToast()

  const contactForm = useForm<ContactForm>({
    resolver: zodResolver(concatFormValidationSchema),
    defaultValues: {
      email: '',
      text: '',
      name: '',
    },
  })

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = contactForm

  async function onSubmit() {
    showToast('Mensagem enviada com sucesso', 'success')
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
      <Text variant="headlineMedium">Open to Work</Text>
      <TextInput label="Nome" control={control} name="name" />
      <TextInput label="E-mail para contato" control={control} name="email" />
      <TextInput
        label="Escreva sua mensagem"
        numberOfLines={5}
        control={control}
        name="text"
      />
      <Button
        icon="email-send"
        mode="outlined"
        onPress={handleSubmit(onSubmit)}
      >
        Enviar
      </Button>
    </Box>
  )
}
