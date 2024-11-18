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
import { useLanguage } from '@/hooks/useLanguage'
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
  const { localizedStrings } = useLanguage()
  const { user, setUser } = useUser()
  const { showToast } = useToast()
  const { goBack, navigate } = useNavigation()

  if (!user) {
    showToast(localizedStrings.sharedMessages.errors.userNotFound, 'error')
    goBack()
  }

  async function handleLogout() {
    await setUser(null)
    showToast('Até breve! 😉', 'info')
    goBack()
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
        goBack()
      }
    } catch (err) {
      showToast(localizedStrings.sharedMessages.errors.genericError, 'error')
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
        <Box style={{ position: 'absolute', top: -30, right: 5 }}>
          <Button icon="logout" onPress={handleLogout}>
            {localizedStrings.profile.signOutLabel}
          </Button>
        </Box>
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
            <Text variant="titleMedium">
              {localizedStrings.globals.namePlaceholder}:
            </Text>
            <Text>{user?.name}</Text>
          </Box>
          <Box style={{ marginTop: 15, gap: 4 }}>
            <Text variant="titleMedium">
              {localizedStrings.globals.emailPlaceholder}:
            </Text>
            <Text>{user?.email}</Text>
          </Box>

          <Switch
            label={localizedStrings.globals.newsLatterLabel}
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
              {localizedStrings.profile.updateProfileButtonLabel}
            </Button>
            <Button
              icon="pencil-lock"
              mode="outlined"
              onPress={() => navigate('screens/update-password/index')}
            >
              {localizedStrings.profile.updatePasswordLabel}
            </Button>
          </Box>

          <Button
            icon="account-remove"
            mode="text"
            textColor="#f87171"
            onPress={handleRemoveUser}
          >
            {localizedStrings.profile.deleteAccountButtonLabel}
          </Button>
        </Box>
      </Box>
    </SafeBox>
  )
}
