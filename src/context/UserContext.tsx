import { createContext, ReactNode, useEffect, useState } from 'react'

import { getUser } from '@/storage/getUser'
import { IUser, manageUser } from '@/storage/manageUser'

interface UserContextType {
  user: IUser | null
  setUser: (user: IUser | null) => Promise<void>
}

export const UserContext = createContext({} as UserContextType)

interface UserContextProviderProps {
  children: ReactNode
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [userState, setUserState] = useState<IUser | null>(null)

  async function getUserFromStorage() {
    const user = await getUser()
    setUserState(user)
  }

  async function setUser(user: IUser | null) {
    await manageUser(user)
    setUserState(user)
  }

  useEffect(() => {
    getUserFromStorage()
  }, [])

  return (
    <UserContext.Provider
      value={{
        user: userState,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
