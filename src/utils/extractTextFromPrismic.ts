/* eslint-disable @typescript-eslint/no-explicit-any */
export function extractTextFromPrismic(data: any) {
  let text = ''

  // Função recursiva para extrair apenas os valores da chave "text"
  function traverse(node: any) {
    if (typeof node === 'object' && node !== null) {
      // Verifica se a chave "text" está presente no objeto
      if ('text' in node) {
        text += ' ' + node.text
      } else {
        // Continua percorrendo o objeto para encontrar mais chaves "text"
        Object.values(node).forEach((value) => traverse(value))
      }
    } else if (Array.isArray(node)) {
      node.forEach((element) => traverse(element))
    }
  }

  traverse(data)

  // Remover espaços extras no início e no fim
  return text.trim()
}
