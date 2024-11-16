import * as Crypto from 'expo-crypto'

/**
 * @deprecated Use something secure. Best way to generate the hash is with specialized lib or withing the backend. Better to use a AuthProvider to Auth purposes. This is only conceptual!!
 */
export async function generateHash(password: string) {
  return await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA512,
    password,
  )
}
