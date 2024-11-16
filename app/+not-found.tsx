import { Link, Stack } from 'expo-router'
import { Image } from 'react-native'
import { Button } from 'react-native-paper'

import { Box } from '@/components/ui/Box'
import { SafeBoxWithoutScrollView } from '@/components/ui/SafeBoxWithoutScrollView'
import { Text } from '@/components/ui/Text'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Voltar' }} />
      <SafeBoxWithoutScrollView>
        <Box
          style={{
            width: '100%',
            paddingHorizontal: 10,
            gap: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={require('@/assets/images/image_404.png')}
            alt="Imagem de página não localizada"
            width={200}
            height={150}
            style={{ maxHeight: 270, maxWidth: 320 }}
          />
          <Text
            variant="titleMedium"
            style={{ textAlign: 'center', marginBottom: 10 }}
          >
            Opss... Estou constrangido de ter te trazido até aqui. Volte a tela
            ou vá para pagina inicial
          </Text>

          <Link href="/(tabs)" asChild>
            <Button icon="home-outline" mode="outlined">
              Ir para a tela inicial
            </Button>
          </Link>
        </Box>
      </SafeBoxWithoutScrollView>
    </>
  )
}
