import * as Notifications from 'expo-notifications'
import { useNavigation } from 'expo-router'
import { Button } from 'react-native-paper'

import { userRepository } from '@/app/repositories/user'
import { Box } from '@/components/ui/Box'
import { Header } from '@/components/ui/Header'
import { SafeBox } from '@/components/ui/SafeBox'
import { Switch } from '@/components/ui/Switch'
import { Text } from '@/components/ui/Text'
import { UserPhoto } from '@/components/ui/UserPhoto'
import { useToast } from '@/hooks/useToast'
import { useUser } from '@/hooks/useUser'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

export default function Profile() {
  const { user, setUser } = useUser()
  const { showToast } = useToast()
  const { navigate } = useNavigation()

  if (!user) {
    showToast('Usuário não localizado!', 'error')
    navigate('(tabs)')
  }

  async function handleRemoveUser() {
    try {
      if (user) {
        const { deleteUserByEmail } = await userRepository()
        await deleteUserByEmail(user.email)

        await setUser(null)
        showToast('Que pena =( Volte sempre que desejar! ', 'warning')
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Que pena!',
            body: 'Estarei te aguardando de volta!',
          },
          trigger: null,
        })
        navigate('(tabs)')
      }
    } catch (err) {
      showToast('Usuário não localizado!', 'error')
      console.log(err)
    }
  }

  return (
    <SafeBox
      style={{
        alignItems: 'center',
        gap: 24,
        height: '100%',
        flex: 1,
      }}
    >
      <Header title="Perfil" marginBottom={10} />
      <Box
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 25,
        }}
      >
        <Box>
          <UserPhoto image={{ uri: user?.photo }} size={180} />
        </Box>
      </Box>
      <Box
        style={{
          marginTop: 25,
          paddingHorizontal: 30,
          flex: 1,
        }}
      >
        <Box
          style={{
            gap: 8,
          }}
        >
          <Box style={{ marginTop: 15, gap: 4 }}>
            <Text variant="titleMedium">Nome:</Text>
            <Text>{user?.name}</Text>
          </Box>
          <Box style={{ marginTop: 15, gap: 4 }}>
            <Text variant="titleMedium">Email:</Text>
            <Text>{user?.email}</Text>
          </Box>

          <Switch
            label="Aceito receber a Newsletter"
            value={user?.newsLetterOption ?? false}
            disabled={false}
          />
        </Box>
        <Box
          style={{
            gap: 25,
            marginTop: 35,
            flex: 1,
            justifyContent: 'space-between',
          }}
        >
          <Box style={{ gap: 8 }}>
            <Button
              icon="account-edit"
              mode="contained"
              onPress={() => navigate('screens/edit-profile/index')}
            >
              Editar cadastro
            </Button>
            <Button icon="pencil-lock" mode="outlined" onPress={() => {}}>
              Alterar senha
            </Button>
          </Box>

          <Button
            icon="account-remove"
            mode="text"
            textColor="#f87171"
            onPress={handleRemoveUser}
          >
            Deletar conta
          </Button>
        </Box>
      </Box>
    </SafeBox>
  )
}
