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

import { I18nContextProvider } from '@/context/I18nContext'
import { ToastContextProvider } from '@/context/ToastContext'
import { UserContextProvider } from '@/context/UserContext'
import { useColorScheme } from '@/hooks/useColorScheme'

import { client } from '../libs/prismic'
import { migrateDbIfNeeded } from '../libs/sqlite'

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
            <I18nContextProvider>
              <UserContextProvider>
                <ToastContextProvider>
                  <Stack>
                    <Stack.Screen
                      name="(tabs)"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(screens)"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen name="+not-found" />
                  </Stack>
                </ToastContextProvider>
              </UserContextProvider>
            </I18nContextProvider>
          </SQLiteProvider>
        </PrismicProvider>
      </PaperProvider>
    </ThemeProvider>
  )
}
