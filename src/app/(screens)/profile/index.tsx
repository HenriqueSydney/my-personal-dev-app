import * as Notifications from 'expo-notifications'
import { Link, useNavigation } from 'expo-router'
import { useEffect, useState } from 'react'
import { Button } from 'react-native-paper'

import { Box } from '@/components/ui/Box'
import { Header } from '@/components/ui/Header'
import { SafeBox } from '@/components/ui/SafeBox'
import { Switch } from '@/components/ui/Switch'
import { Text } from '@/components/ui/Text'
import { UserPhoto } from '@/components/ui/UserPhoto'
import { useLanguage } from '@/hooks/useLanguage'
import { useToast } from '@/hooks/useToast'
import { useUser } from '@/hooks/useUser'
import { userRepository } from '@/repositories/user'

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
  const { goBack, canGoBack } = useNavigation()
  const [isDeletingAccount, setIsDeletingAccount] = useState(false)

  if (!user && !isDeletingAccount) {
    showToast(localizedStrings.sharedMessages.errors.userNotFound, 'error')
    goBack()
  }

  async function handleLogout() {
    await setUser(null)
    showToast('Até breve! 😉', 'info')
    goBack()
  }

  async function handleRemoveUser() {
    setIsDeletingAccount(true)
    try {
      if (user) {
        const { deleteUserByEmail } = await userRepository()
        await deleteUserByEmail(user.email)

        await setUser(null)

        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Que pena!',
            body: 'Estarei te aguardando de volta!',
          },
          trigger: null,
        })
        if (canGoBack()) {
          showToast('Que pena =( Volte sempre que desejar! ', 'warning')
          goBack()
        }
      }
    } catch (err) {
      showToast(localizedStrings.sharedMessages.errors.genericError, 'error')
      setIsDeletingAccount(false)
      console.log(err)
    }
  }

  useEffect(() => {
    if (user) {
      setIsDeletingAccount(false)
    }
  }, [user])

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
            disabled={true}
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
            <Link href="/edit-profile" asChild>
              <Button icon="account-edit" mode="contained">
                {localizedStrings.profile.updateProfileButtonLabel}
              </Button>
            </Link>
            <Link href="/update-password" asChild>
              <Button icon="pencil-lock" mode="outlined">
                {localizedStrings.profile.updatePasswordLabel}
              </Button>
            </Link>
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
