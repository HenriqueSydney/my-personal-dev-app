import { CameraType, CameraView, useCameraPermissions } from 'expo-camera'
import { useRef, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Button, IconButton, Portal } from 'react-native-paper'

import { useToast } from '@/hooks/useToast'

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
  const defaultFacingDirection =
    permittedFacingDirections === 'all' ? 'back' : permittedFacingDirections
  const [facing, setFacing] = useState<CameraType>(defaultFacingDirection)
  const [permission, requestPermission] = useCameraPermissions()
  const { showToast } = useToast()
  const cameraRef = useRef<CameraView | null>(null)

  if (!isCameraOpen) {
    return <View />
  }

  if (!permission) {
    return (
      <View>
        <Text>Usuário não autorizou uso da Câmera</Text>
      </View>
    )
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission}>Autorizar</Button>
      </View>
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
      showToast('Erro ao capturar a foto', 'error')
    }
  }

  function confirmPicture() {
    setIsCameraOpen(false)
    showToast('Foto capturada com sucesso!', 'success')
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
              Tirar uma nova foto
            </Button>
            <Image source={{ uri: photo }} style={styles.previewImage} />
            <Button
              icon="camera-plus"
              mode="contained"
              onPress={confirmPicture}
            >
              Utilizar a foto
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
