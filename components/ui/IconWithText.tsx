import { Icon } from 'react-native-paper'

import { Box } from './Box'
import { Text } from './Text'

type Props = {
  text: string
  icon: string
}

export function IconWithText({ icon, text }: Props) {
  return (
    <Box
      style={{
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon source={icon} size={15} />
      <Text>{text}</Text>
    </Box>
  )
}
