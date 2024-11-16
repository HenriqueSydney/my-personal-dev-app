/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDatabase } from '../libs/sqlite'
import { DBUser, IUser } from '../storage/manageUser'

interface IUserDBUpdateData {
  email: string
  name?: string
  photo?: string
  newsLetterOption?: boolean
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

  async function updateUserByEmail(
    data: IUserDBUpdateData,
    user: IUser | null,
  ) {
    if (!user) {
      user = await getUserByEmail(data.email)
    }

    if (!user) {
      throw new Error('Usuário não encontrado')
    }
    let newsLatterOption = user.newsLetterOption ? 1 : 0
    if (data.newsLetterOption) {
      newsLatterOption = data.newsLetterOption ? 1 : 0
    }

    await db.runAsync(
      'UPDATE users SET name = $name,  newsLetterOption = $newsLetterBooleanLike, photo = $photo  WHERE id = $id',
      {
        $name: data.name ?? user.name,
        $newsLetterBooleanLike: newsLatterOption,
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
  }
}
