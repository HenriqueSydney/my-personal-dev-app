import { useThemeColor } from '@/hooks/useThemeColor'
import { TextProps, Text as PaperText } from 'react-native-paper'
import { LabelProps } from 'react-native-paper/lib/typescript/components/TextInput/types'

export type ThemedTextProps = TextProps<LabelProps> & {
  lightColor?: string
  darkColor?: string
}

export function Text({ lightColor, darkColor, ...rest }: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

  return <PaperText style={[{ color }]} {...rest} />
}
