import { CameraType, CameraView, useCameraPermissions } from 'expo-camera'
import { useState } from 'react'
import { Button, Image, StyleSheet, Text, View } from 'react-native'
import { IconButton, Portal } from 'react-native-paper'

import { useToast } from '@/hooks/useToast'

type Props = {
  permittedFacingDirections?: 'back' | 'front' | 'all'
  isCameraOpen: boolean
  setIsCameraOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CameraApi({
  permittedFacingDirections = 'all',
  isCameraOpen = false,
  setIsCameraOpen,
}: Props) {
  const defaultFacingDirection =
    permittedFacingDirections === 'all' ? 'back' : permittedFacingDirections
  const [facing, setFacing] = useState<CameraType>(defaultFacingDirection)
  const [permission, requestPermission] = useCameraPermissions()
  const { showToast } = useToast()

  const [photo, setPhoto] = useState<string | null>(null) // Estado para a foto capturada

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
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    )
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'))
  }

  async function takePicture() {
    try {
      setIsCameraOpen(false)
      showToast('Foto capturada com sucesso!', 'success')
    } catch (error) {
      showToast('Erro ao capturar a foto', 'error')
    }
  }

  return (
    <Portal>
      <View style={styles.container}>
        {photo ? (
          <View style={styles.previewContainer}>
            <Image source={{ uri: photo }} style={styles.previewImage} />
            <Button title="Retake Photo" onPress={() => setPhoto(null)} />
          </View>
        ) : (
          <CameraView
            style={styles.camera}
            facing={facing}
            flash="auto"
            mirror={true}
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
  },
  previewImage: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
  },
})
