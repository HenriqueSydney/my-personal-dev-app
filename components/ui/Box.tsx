import { useThemeColor } from '@/hooks/useThemeColor'
import { PropsWithChildren } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'

type Props = PropsWithChildren<{
  lightColor?: string
  darkColor?: string
  style?: StyleProp<ViewStyle>
}>

export function Box({ style, children, lightColor, darkColor }: Props) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background',
  )
  return <View style={[{ backgroundColor }, style]}>{children}</View>
}
