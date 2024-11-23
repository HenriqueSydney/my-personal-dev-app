import { PropsWithChildren } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useThemeColor } from '@/hooks/useThemeColor'

import { Footer } from './Footer'

type Props = PropsWithChildren<{
  lightColor?: string
  darkColor?: string
  style?: StyleProp<ViewStyle>
}>

export function SafeBox({ style, children, lightColor, darkColor }: Props) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background',
  )
  return (
    <SafeAreaView
      style={[{ backgroundColor, flex: 1, minWidth: '100%' }, style]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView fadingEdgeLength={100} style={{ minHeight: '100%' }}>
          <View style={{ minHeight: '100%', justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>{children}</View>
            <Footer />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
