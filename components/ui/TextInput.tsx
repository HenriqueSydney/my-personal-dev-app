/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, useController } from 'react-hook-form'
import { TextInput as PaperTextInput, TextInputProps } from 'react-native-paper'
import { Text } from './Text'
import { View } from 'react-native'

type Props = TextInputProps & {
  label: string
  name: string
  control: Control<any>
}

export function TextInput({ label, name, control, ...rest }: Props) {
  const {
    field,
    formState: { errors },
  } = useController({
    control,
    defaultValue: '',
    name,
  })
  const errorMessage = errors[field?.name]?.message as string

  return (
    <View
      style={{
        gap: 0,
      }}
    >
      <PaperTextInput
        label={label}
        value={field.value}
        onChangeText={field.onChange}
        style={
          errorMessage ? { borderColor: '#ad283a', borderWidth: 1 } : undefined
        }
        {...rest}
      />
      {errorMessage && (
        <Text darkColor="#ad283a" lightColor="#ad283a">
          {errorMessage}
        </Text>
      )}
    </View>
  )
}
