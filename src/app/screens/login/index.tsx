import ParallaxScrollView from '@/components/ParallaxScrollView'
import { Box } from '@/components/ui/Box'
import { Header } from '@/components/ui/Header'
import { SafeBox } from '@/components/ui/SafeBox'
import { Text } from '@/components/ui/Text'
import { useLanguage } from '@/hooks/useLanguage'

import { LoginFormContainer } from './LoginForm'

export default function Login() {
  const { localizedStrings } = useLanguage()

  return (
    <SafeBox
      style={{
        alignItems: 'center',
        gap: 24,
        height: '100%',
        paddingTop: 10,
      }}
    >
      <Header
        title={localizedStrings.loginScreen.header}
        showLoginIcon={false}
      />
      <ParallaxScrollView
        headerBackgroundColor={{ dark: '#000000', light: '#FFF' }}
        headerImage={{
          src: require('@/assets/images/blog.jpg'),
          alt: localizedStrings.loginScreen.headerImageAlt,
        }}
      >
        <Text variant="headlineLarge" lightColor="#FFF" darkColor="#FFF">
          {localizedStrings.loginScreen.title}
        </Text>
      </ParallaxScrollView>
      <Box
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 16,
        }}
      >
        <LoginFormContainer />
      </Box>
    </SafeBox>
  )
}
