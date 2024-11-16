import { Link, useNavigation } from 'expo-router'
import { View } from 'react-native'
import { Appbar, Avatar } from 'react-native-paper'

import { useThemeColor } from '@/hooks/useThemeColor'
import { useUser } from '@/hooks/useUser'

import { Text } from './Text'

type Props = {
  title?: string
  marginBottom?: number
  showLoginIcon?: boolean
}

export function Header({
  title = '',
  marginBottom = 0,
  showLoginIcon = true,
}: Props) {
  const { user } = useUser()

  const backgroundColor = useThemeColor(
    { light: '#f7f6f6', dark: '#131922' },
    'background',
  )
  const { goBack, navigate } = useNavigation()
  return (
    <View
      style={{
        marginBottom,
        minWidth: '100%',
      }}
    >
      <Appbar.Header
        style={[
          { backgroundColor },
          {
            shadowColor: 'black',
            shadowOffset: {
              height: 30,
              width: 30,
            },
            paddingRight: 16,
          },
        ]}
        elevated={true}
      >
        {title && <Appbar.BackAction onPress={() => goBack()} />}
        {<Appbar.Content title={title} />}
        {!user && showLoginIcon && (
          <Appbar.Action
            icon="login"
            onPress={() => navigate('screens/login/index')}
          />
        )}

        {user && (
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <View style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
              <Text variant="titleSmall">Bem vindo,</Text>
              <Text>{user.name.split(' ')[0]}</Text>
            </View>
            <Link href="/screens/profile">
              <View>
                <Avatar.Image source={{ uri: user.photo }} size={40} />
              </View>
            </Link>
          </View>
        )}
      </Appbar.Header>
    </View>
  )
}
