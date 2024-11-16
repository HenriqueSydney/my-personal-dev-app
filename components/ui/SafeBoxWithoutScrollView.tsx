import { useThemeColor } from '@/hooks/useThemeColor'
import { PropsWithChildren } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Footer } from './Footer'

type Props = PropsWithChildren<{
  lightColor?: string
  darkColor?: string
  style?: StyleProp<ViewStyle>
}>

export function SafeBoxWithoutScrollView({
  style,
  children,
  lightColor,
  darkColor,
}: Props) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background',
  )
  return (
    <SafeAreaView style={[{ backgroundColor, flex: 1 }, style]}>
      <View style={{ minHeight: '90%', justifyContent: 'space-between' }}>
        <View>{children}</View>
        <Footer />
      </View>
    </SafeAreaView>
  )
}
