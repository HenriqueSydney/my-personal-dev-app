import AsyncStorage from '@react-native-async-storage/async-storage'

import { IUser } from './manageUser'

export async function getUser() {
  const storage = await AsyncStorage.getItem(`@HLAPP-USER`)
  const user: IUser | null = storage ? JSON.parse(storage) : null

  return user
}
