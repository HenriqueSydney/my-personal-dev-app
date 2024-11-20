import { IconButton } from 'react-native-paper'

import { Box } from '@/components/ui/Box'

export function SocialMedia() {
  return (
    <Box
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <IconButton icon="twitter" />
      <IconButton icon="facebook" />
      <IconButton icon="github" />
      <IconButton icon="whatsapp" />
    </Box>
  )
}
