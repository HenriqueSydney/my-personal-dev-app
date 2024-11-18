import { Avatar } from 'react-native-paper'

import { Box } from '@/components/ui/Box'
import { SocialMedia } from '@/components/ui/SocialMedia'
import { Text } from '@/components/ui/Text'
import { useLanguage } from '@/hooks/useLanguage'

export function DeveloperContainer() {
  const { localizedStrings } = useLanguage()
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
        <Text variant="headlineSmall">{localizedStrings.globals.job}</Text>
      </Box>
      <Box
        style={{
          alignItems: 'center',
        }}
      >
        <Text style={{ textAlign: 'center' }}>
          {localizedStrings.globals.jobDescription}
        </Text>

        <SocialMedia />
      </Box>
    </Box>
  )
}
