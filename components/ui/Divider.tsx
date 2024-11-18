import { Divider as PaperDivider, DividerProps } from 'react-native-paper'

import { useThemeColor } from '@/hooks/useThemeColor'

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
      testID="divider-test-id"
      theme={{
        colors: { primary: backgroundColor, outlineVariant: backgroundColor },
      }}
      style={{ borderColor: backgroundColor, backgroundColor }}
      {...rest}
    />
  )
}
