import { getDatabase } from '../libs/sqlite'
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

interface IUserUpdate {
  data: IUserUpdateData
  user: IUser | null
}

export async function userRepository() {
  const db = await getDatabase()
  async function getUserByEmail(email: string) {
    const user = await db.getFirstAsync<DBUser>(
      'SELECT name, password, email, photo FROM users WHERE email = $email;',
      { $email: email },
    )

    return user
  }

  async function createUser(data: IUserCreateData) {
    const user = await getUserByEmail(data.email)

    if (user) {
      throw new Error('Usuário já existe')
    }

    await db.runAsync(
      'INSERT INTO users (name, password, email, photo) values ($name, $password, $email, $photo);',
      {
        $name: data.name,
        $password: data.passwordHash,
        // $newsLetter: newsLatterOption,
        $email: data.email,
        $photo: data.photo,
      },
    )
  }

  async function updateUserByEmail({ data, user }: IUserUpdate) {
    if (!user) {
      user = await getUserByEmail(data.email)
    }

    if (!user) {
      throw new Error('Usuário não encontrado')
    }
    // let newsLatterOption = user.newsLetterOption ? 1 : 0
    // if (data.newsLetterOption) {
    //   newsLatterOption = data.newsLetterOption ? 1 : 0
    // }
    // newsLetter = $newsLetter,
    await db.runAsync(
      'UPDATE users SET name = $name, photo = $photo  WHERE id = $id',
      {
        $name: data.name ?? user.name,
        // $newsLetter: newsLatterOption,
        $photo: data.photo ?? user.photo,
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
    createUser,
  }
}
