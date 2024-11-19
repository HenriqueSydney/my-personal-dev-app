import { getDatabase } from '../libs/sqlite'
import { getUser } from '../storage/getUser'
import { DBUser, IUser } from '../storage/manageUser'

type IUserCreateData = {
  email: string
  name: string
  photo: string
  newsLetterOption: boolean
  passwordHash: string
}

type IUserUpdateData = {
  email: string
  name?: string
  photo?: string
  newsLetterOption?: boolean
}

export interface IUserSelectData {
  id: number
  name: string
  email: string
  photo: string
  password: string
  newsLetterOption: boolean
}

interface IUserPasswordUpdate {
  newHashedPassword: string
  user?: IUser | null
}

interface IUserUpdate {
  data: IUserUpdateData
  user: IUser | null
}

export async function userRepository() {
  const db = await getDatabase()
  async function getUserByEmail(
    email: string,
  ): Promise<IUserSelectData | null> {
    const dbUser = await db.getFirstAsync<DBUser>(
      'SELECT name, password, email, photo, newsLetter FROM users WHERE email = $email;',
      { $email: email },
    )

    if (dbUser) {
      const user = {
        ...dbUser,
        newsLetterOption: dbUser.newsLetter === 1,
      }

      return user
    }

    return null
  }

  async function createUser(data: IUserCreateData) {
    const user = await getUserByEmail(data.email)

    if (user) {
      throw new Error('Usuário já existe')
    }

    const newsLatterOption = data.newsLetterOption ? 1 : 0

    await db.runAsync(
      'INSERT INTO users (name, password, email, photo, newsLetter) values ($name, $password, $email, $photo, $newsLetter);',
      {
        $name: data.name,
        $password: data.passwordHash,
        $newsLetter: newsLatterOption,
        $email: data.email,
        $photo: data.photo,
      },
    )
  }

  async function updateUserByEmail({ data, user }: IUserUpdate) {
    if (!user) {
      user = await getUser()
    }

    if (!user) {
      throw new Error('Usuário não encontrado')
    }
    let newsLatterOption = user.newsLetterOption ? 1 : 0
    if (data.newsLetterOption) {
      newsLatterOption = data.newsLetterOption ? 1 : 0
    }

    await db.runAsync(
      'UPDATE users SET name = $name, photo = $photo, newsLetter = $newsLetter  WHERE email = $email',
      {
        $name: data.name ?? user.name,
        $newsLetter: newsLatterOption,
        $photo: data.photo ?? user.photo,
        $email: user.email,
      },
    )
  }

  async function updateUserPasswordByEmail({
    newHashedPassword,
    user,
  }: IUserPasswordUpdate) {
    if (!user) {
      user = await getUser()
    }

    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    await db.runAsync(
      'UPDATE users SET password = $newPassword  WHERE email = $email',
      {
        $newPassword: newHashedPassword,
        $email: user.email,
      },
    )
  }

  async function deleteUserByEmail(email: string): Promise<void> {
    await db.runAsync('DELETE FROM users WHERE email = $email', {
      $email: email,
    })
  }

  return {
    getUserByEmail,
    deleteUserByEmail,
    updateUserByEmail,
    updateUserPasswordByEmail,
    createUser,
  }
}
