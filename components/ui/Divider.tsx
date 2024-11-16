import { useThemeColor } from '@/hooks/useThemeColor'
import { DividerProps, Divider as PaperDivider } from 'react-native-paper'

type IProps = DividerProps & {
  lightColor?: string
  darkColor?: string
}

export function Divider({ lightColor, darkColor, ...rest }: IProps) {
  const backgroundColor = useThemeColor(
    { light: darkColor, dark: lightColor },
    'background',
  )
  return (
    <PaperDivider
      theme={{
        colors: { primary: backgroundColor, outlineVariant: backgroundColor },
      }}
      style={{ borderColor: backgroundColor, backgroundColor }}
      {...rest}
    />
  )
}
