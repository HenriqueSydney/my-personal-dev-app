import ParallaxScrollView from '@/components/ParallaxScrollView'
import { Box } from '@/components/ui/Box'
import { Header } from '@/components/ui/Header'
import { SafeBox } from '@/components/ui/SafeBox'
import { Text } from '@/components/ui/Text'

import { LoginFormContainer } from './LoginForm'

export default function Login() {
  return (
    <SafeBox
      style={{
        alignItems: 'center',
        gap: 24,
        height: '100%',
        paddingTop: 10,
      }}
    >
      <Header title="Entrar" showLoginIcon={false} />
      <ParallaxScrollView
        headerBackgroundColor={{ dark: '#000000', light: '#FFF' }}
        headerImage={{
          src: require('@/assets/images/blog.jpg'),
          alt: 'Imagem de um computador',
        }}
      >
        <Text variant="headlineLarge" lightColor="#FFF" darkColor="#FFF">
          Entrar com sua conta
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
