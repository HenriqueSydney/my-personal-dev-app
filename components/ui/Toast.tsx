import { useEffect, useState } from 'react'
import { Portal, Snackbar } from 'react-native-paper'
import { Text } from './Text'

type Props = {
  message?: string | null
  type: 'success' | 'warning' | 'error' | 'info'
}

export function Toast({ message, type }: Props) {
  const [toastVisible, setToastVisible] = useState(false)

  const onToggleToast = () => setToastVisible((prevState) => !prevState)

  const onDismissToast = () => setToastVisible(false)

  const colorMap = {
    success: '#65a30d',
    error: '#e11d48',
    warning: '#d97706',
    info: '#2563eb',
  } as const

  useEffect(() => {
    if (message) {
      onToggleToast()
    }
  }, [message])

  return (
    <Portal>
      <Snackbar
        visible={toastVisible}
        onDismiss={onDismissToast}
        duration={3000}
        style={{ backgroundColor: colorMap[type] }}
      >
        <Text variant="titleSmall">{message}</Text>
      </Snackbar>
    </Portal>
  )
}
