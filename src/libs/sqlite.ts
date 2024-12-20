import { type SQLiteDatabase } from 'expo-sqlite'
import * as SQLite from 'expo-sqlite'

export async function migrateDbIfNeeded(db: SQLiteDatabase, version = 0) {
  const DATABASE_VERSION = version
  const userVersion = await db.getFirstAsync<{
    user_version: number
  }>('PRAGMA user_version')

  let currentDbVersion = userVersion?.user_version

  if (currentDbVersion && currentDbVersion >= DATABASE_VERSION) {
    return
  }

  if (currentDbVersion !== undefined && currentDbVersion === 0) {
    await db.execAsync(`
  PRAGMA journal_mode = 'wal';
  CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      password TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      photo TEXT,
      newsletter INTEGER NOT NULL DEFAULT 0
    );
  `)

    currentDbVersion = 1
  }
  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`)
}

type DatabaseInstance = SQLiteDatabase | null

let dbInstance: DatabaseInstance = null

/**
 * Retorna a instância única do banco de dados.
 */
export const getDatabase = async (): Promise<SQLiteDatabase> => {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync('UserDB.db')
    await migrateDbIfNeeded(dbInstance, 0)
  }
  return dbInstance
}
