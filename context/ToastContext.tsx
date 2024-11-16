import { createContext, ReactNode, useCallback, useState } from 'react'
import { Portal, Snackbar } from 'react-native-paper'

import { Text } from '@/components/ui/Text'
type ToastType = 'success' | 'warning' | 'error' | 'info'

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void
  closeToast: () => void
}

export const ToastContext = createContext({} as ToastContextType)

interface ToastContextProviderProps {
  children: ReactNode
}

export function ToastContextProvider({ children }: ToastContextProviderProps) {
  const [toast, setToast] = useState<{
    message: string
    type: ToastType
  } | null>(null)
  const [visible, setVisible] = useState(false)
  const [toastDuration, setToastDuration] = useState(3000)

  const showToast = useCallback(
    (message: string, type: ToastType, duration = 3000) => {
      setToast({ message, type })
      setVisible(true)

      setToastDuration(duration)
    },
    [],
  )

  const closeToast = useCallback(() => {
    setVisible(false)
  }, [])

  const onDismiss = () => setVisible(false)

  const colorMap = {
    success: '#65a30d',
    error: '#e11d48',
    warning: '#d97706',
    info: '#2563eb',
  } as const

  return (
    <ToastContext.Provider value={{ showToast, closeToast }}>
      {children}
      <Portal>
        <Snackbar
          visible={visible}
          onDismiss={onDismiss}
          duration={toastDuration}
          style={{ backgroundColor: toast ? colorMap[toast.type] : '#000' }}
        >
          <Text variant="titleSmall">{toast?.message}</Text>
        </Snackbar>
      </Portal>
    </ToastContext.Provider>
  )
}
