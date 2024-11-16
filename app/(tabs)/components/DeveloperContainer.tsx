import { Avatar } from 'react-native-paper'

import { Box } from '@/components/ui/Box'
import { SocialMedia } from '@/components/ui/SocialMedia'
import { Text } from '@/components/ui/Text'

export function DeveloperContainer() {
  return (
    <Box
      style={{
        alignItems: 'center',
        gap: 24,
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <Avatar.Image source={require('@/assets/images/eu.jpg')} size={180} />

      <Box
        style={{
          alignItems: 'center',
        }}
      >
        <Text variant="headlineLarge">Henrique Lima</Text>
        <Text variant="headlineSmall">Web Developer</Text>
      </Box>
      <Box
        style={{
          alignItems: 'center',
        }}
      >
        <Text style={{ textAlign: 'center' }}>
          Desenvolvedor React, Next, Node, Python, com domínio em em SQL e
          NoSQL. Adepto a cultura DevOps, com conhecimentos em CI/CD, IaC, K8s e
          Cloud.
        </Text>

        <SocialMedia />
      </Box>
    </Box>
  )
}
