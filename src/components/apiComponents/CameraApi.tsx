import { CameraType, CameraView, useCameraPermissions } from 'expo-camera'
import { useRef, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Button, IconButton, Modal, Portal } from 'react-native-paper'

import { useLanguage } from '@/hooks/useLanguage'
import { useToast } from '@/hooks/useToast'

import { Divider } from '../ui/Divider'
import { Text } from '../ui/Text'

type Props = {
  permittedFacingDirections?: 'back' | 'front' | 'all'
  isCameraOpen: boolean
  setIsCameraOpen: React.Dispatch<React.SetStateAction<boolean>>
  photo: string | null
  setPhoto: React.Dispatch<React.SetStateAction<string | null>>
}

export default function CameraApi({
  permittedFacingDirections = 'all',
  isCameraOpen = false,
  setIsCameraOpen,
  setPhoto,
  photo,
}: Props) {
  const { localizedStrings } = useLanguage()
  const defaultFacingDirection =
    permittedFacingDirections === 'all' ? 'back' : permittedFacingDirections
  const [facing, setFacing] = useState<CameraType>(defaultFacingDirection)
  const [permission, requestPermission] = useCameraPermissions()
  const { showToast } = useToast()
  const cameraRef = useRef<CameraView | null>(null)

  if (!permission || !isCameraOpen) {
    return <View />
  }

  if (!permission.granted) {
    return (
      <Portal>
        <Modal
          visible={isCameraOpen}
          onDismiss={() => setIsCameraOpen(false)}
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 20,
            margin: 40,
            minHeight: 250,
          }}
          dismissable={true}
        >
          <View
            style={{
              width: '100%',
              padding: 5,
              height: 200,
              justifyContent: 'space-between',
            }}
          >
            <View style={{ gap: 5 }}>
              <Text variant="titleMedium" style={{ marginLeft: 10 }}>
                {localizedStrings.cameraApi.askPermissionTitle}
              </Text>
              <Divider />
            </View>
            <Text>{localizedStrings.cameraApi.askPermissionMessage}</Text>
            <Button mode="contained" onPress={requestPermission}>
              {localizedStrings.cameraApi.authorizedButtonLabel}
            </Button>
          </View>
        </Modal>
      </Portal>
    )
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'))
  }

  async function takePicture() {
    try {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync()
        if (photo) {
          setPhoto(photo.uri)
        }
      }
    } catch (error) {
      showToast(localizedStrings.cameraApi.captureError, 'error')
    }
  }

  function confirmPicture() {
    setIsCameraOpen(false)
    showToast(localizedStrings.cameraApi.captureSuccessMessage, 'success')
  }

  return (
    <Portal>
      <View style={styles.container}>
        {photo ? (
          <View style={styles.previewContainer}>
            <Button
              icon="camera-retake"
              mode="outlined"
              onPress={() => setPhoto(null)}
            >
              {localizedStrings.cameraApi.retakePictureButtonLabel}
            </Button>
            <Image
              source={{ uri: photo }}
              style={styles.previewImage}
              alt={localizedStrings.globals.userImageAlt}
            />
            <Button
              icon="camera-plus"
              mode="contained"
              onPress={confirmPicture}
            >
              {localizedStrings.cameraApi.usePictureButtonLabel}
            </Button>
          </View>
        ) : (
          <CameraView
            style={styles.camera}
            facing={facing}
            flash="auto"
            mirror={true}
            ref={cameraRef}
          >
            {permittedFacingDirections === 'all' && (
              <View style={styles.buttonContainer}>
                <IconButton
                  mode="contained-tonal"
                  icon="camera-flip-outline"
                  onPress={toggleCameraFacing}
                />
              </View>
            )}
            <View style={styles.captureButtonContainer}>
              <IconButton
                icon="camera"
                mode="contained"
                onPress={takePicture}
                size={40}
              />
            </View>
          </CameraView>
        )}
      </View>
    </Portal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    minWidth: '100%',
    minHeight: '100%',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  button: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  captureButtonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  captureButton: {
    padding: 20,
    backgroundColor: 'red',
    borderRadius: 50,
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
  },
  previewImage: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
  },
})
