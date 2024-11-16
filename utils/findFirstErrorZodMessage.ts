/* eslint-disable @typescript-eslint/no-explicit-any */
type NestedObject = {
  [key: string]: {
    message?: string
    [key: string]: any
  }
}

export function findFirstErrorZodMessage(obj: NestedObject) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj[key], 'message')) {
      return obj[key].message
    }
  }
  return null
}
