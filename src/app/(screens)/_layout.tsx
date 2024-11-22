import { Stack } from 'expo-router'
import React from 'react'
export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="/profile/index"
        options={{
          headerShown: false,
          navigationBarHidden: false,
        }}
      />

      <Stack.Screen
        name="/edit-profile/index"
        options={{
          headerShown: false,
          navigationBarHidden: false,
        }}
      />
      <Stack.Screen
        name="/update-password/index"
        options={{
          headerShown: false,
          navigationBarHidden: false,
        }}
      />
      <Stack.Screen
        name="/signup/index"
        options={{
          headerShown: false,
          navigationBarHidden: false,
        }}
      />
      <Stack.Screen
        key="Login"
        name="/login/index"
        options={{
          headerShown: false,
          navigationBarHidden: false,
        }}
      />
      <Stack.Screen
        key="Post"
        name="/post/index"
        options={{
          headerShown: false,
          navigationBarHidden: false,
        }}
      />
    </Stack>
  )
}
