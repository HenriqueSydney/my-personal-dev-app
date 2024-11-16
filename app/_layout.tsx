import 'react-native-reanimated'

import { PrismicProvider } from '@prismicio/react'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { SQLiteProvider } from 'expo-sqlite'
import { useEffect } from 'react'
import { PaperProvider } from 'react-native-paper'

import { ToastContextProvider } from '@/context/ToastContext'
import { UserContextProvider } from '@/context/UserContext'
import { useColorScheme } from '@/hooks/useColorScheme'

import { client } from './libs/prismic'
import { migrateDbIfNeeded } from './libs/sqlite'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <PaperProvider>
        <PrismicProvider client={client}>
          <SQLiteProvider databaseName="UserDB.db" onInit={migrateDbIfNeeded}>
            <UserContextProvider>
              <ToastContextProvider>
                <Stack>
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="screens/profile/index"
                    options={{ headerShown: false, navigationBarHidden: false }}
                  />

                  <Stack.Screen
                    name="screens/edit-profile/index"
                    options={{ headerShown: false, navigationBarHidden: false }}
                  />

                  <Stack.Screen
                    name="screens/signup"
                    options={{ headerShown: false, navigationBarHidden: false }}
                  />
                  <Stack.Screen
                    key="Login"
                    name="screens/login/index"
                    options={{ headerShown: false, navigationBarHidden: false }}
                  />
                  <Stack.Screen
                    key="Post"
                    name="screens/post/index"
                    options={{ headerShown: false, navigationBarHidden: false }}
                  />
                  <Stack.Screen name="+not-found" />
                </Stack>
              </ToastContextProvider>
            </UserContextProvider>
          </SQLiteProvider>
        </PrismicProvider>
      </PaperProvider>
    </ThemeProvider>
  )
}
