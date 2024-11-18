import { Box } from '@/components/ui/Box'
import { Text } from '@/components/ui/Text'

import { SocialMedia } from './SocialMedia'

export function Footer() {
  return (
    <Box
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
      }}
    >
      <SocialMedia />
      <Text>All rights reserved © 2024 Henrique Lima</Text>
    </Box>
  )
}
