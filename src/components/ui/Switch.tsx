import { View } from 'react-native'
import { Switch as PaperSwitch } from 'react-native-paper'

import { Text } from './Text'

type Props = {
  label: string
  value: boolean
  onChange?: (value: boolean) => void
  disabled?: boolean
}

export function Switch({
  label,
  value = false,
  onChange,
  disabled = false,
}: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <Text variant="labelLarge">{label}</Text>
      <PaperSwitch value={value} onValueChange={onChange} disabled={disabled} />
    </View>
  )
}
