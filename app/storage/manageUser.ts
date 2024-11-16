import AsyncStorage from '@react-native-async-storage/async-storage'

export interface IUser {
  id: number
  name: string
  email: string
  photo: string
  newsLetterOption: boolean
}

export interface DBUser {
  id: number
  name: string
  email: string
  photo: string
  newsLetterOption: boolean
  password: string
}

export async function manageUser(user: IUser | null) {
  if (!user) {
    await AsyncStorage.removeItem(`@HLAPP-USER`)
    return
  }
  await AsyncStorage.setItem(`@HLAPP-USER`, JSON.stringify(user))
}
