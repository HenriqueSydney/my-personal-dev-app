import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { View } from 'react-native'
import { Avatar, IconButton } from 'react-native-paper'

import CameraApi from '@/components/apiComponents/CameraApi'
import { Box } from '@/components/ui/Box'
import Menu from '@/components/ui/Menu'
import { Skeleton } from '@/components/ui/Skeleton'
import { UserPhoto } from '@/components/ui/UserPhoto'
import { useLanguage } from '@/hooks/useLanguage'
import { useToast } from '@/hooks/useToast'

type Props = {
  userPhoto: string | null
  setUserPhoto: React.Dispatch<React.SetStateAction<string | null>>
}

export default function PhotoSelectionArea({ userPhoto, setUserPhoto }: Props) {
  const { localizedStrings } = useLanguage()

  const { showToast } = useToast()
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const [isCameraOpen, setIsCameraOpen] = useState(false)

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true)
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (photoSelected.canceled) {
        showToast(
          localizedStrings.sharedMessages.photoSelectionCanceled,
          'warning',
        )
        return
      }

      if (photoSelected.assets[0].uri) {
        const photoUri = photoSelected.assets[0].uri

        setUserPhoto(photoUri)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }
  }

  function handleOpenPhotoSelectionMenu() {
    setIsMenuVisible(true)
  }

  return (
    <Box>
      <CameraApi
        permittedFacingDirections="front"
        isCameraOpen={isCameraOpen}
        setIsCameraOpen={setIsCameraOpen}
        setPhoto={setUserPhoto}
        photo={userPhoto}
      />
      {photoIsLoading && <Skeleton />}
      {userPhoto && !photoIsLoading && (
        <Box
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box>
            <UserPhoto image={{ uri: userPhoto }} size={180} />

            <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
              <IconButton
                icon="camera-plus"
                onPress={handleOpenPhotoSelectionMenu}
                mode="contained"
              />
            </View>
          </Box>
        </Box>
      )}

      {!userPhoto && !photoIsLoading && (
        <Box
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box>
            <Avatar.Icon icon="face-man-shimmer" size={180} />
            <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
              <Menu
                anchor={
                  <IconButton
                    icon="camera-plus-outline"
                    onPress={handleOpenPhotoSelectionMenu}
                    mode="contained"
                  />
                }
                isVisible={isMenuVisible}
                toggleVisibility={setIsMenuVisible}
                menuItens={[
                  {
                    title: 'Selecionar Photo',
                    icon: 'folder-image',
                    onPressFn: handleUserPhotoSelect,
                  },
                  {
                    title: 'Tirar uma foto',
                    icon: 'camera-plus',
                    onPressFn: () => setIsCameraOpen(true),
                  },
                ]}
              />
            </View>
          </Box>
        </Box>
      )}
    </Box>
  )
}
