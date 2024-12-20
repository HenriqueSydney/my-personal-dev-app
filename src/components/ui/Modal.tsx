import { ReactNode, useState } from 'react'
import { View } from 'react-native'
import { Button, Modal as PaperModal, Portal } from 'react-native-paper'

import { Text } from './Text'

type Props = {
  buttonLabel: string
  modalTitle: string
  modalContent: ReactNode
}

export function Modal({ buttonLabel, modalTitle, modalContent }: Props) {
  const [visible, setVisible] = useState(false)

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    margin: 40,
    minHeight: 250,
  }
  return (
    <>
      <Portal>
        <PaperModal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
          dismissable={true}
        >
          <View
            style={{
              width: '100%',

              justifyContent: 'space-between',
              borderColor: 'black',
              borderWidth: 1,
              borderStyle: 'solid',
            }}
          >
            {modalTitle && <Text>{modalTitle}</Text>}
            {modalContent}
          </View>
        </PaperModal>
      </Portal>
      <Button onPress={showModal}>{buttonLabel}</Button>
    </>
  )
}
