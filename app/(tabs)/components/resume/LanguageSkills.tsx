import { List } from 'react-native-paper'

import { Box } from '@/components/ui/Box'
import { Text } from '@/components/ui/Text'

const LANGUAGE_SKILLS = [
  {
    title: 'Português',
    description: 'Língua Nativa;',
  },
  {
    title: 'Inglês',
    description: 'Avançado em: Conversação, Escrita, Leitura.',
  },
]

export function LanguageSkills() {
  return (
    <Box style={{ width: '100%', paddingVertical: 15, paddingHorizontal: 10 }}>
      <Text variant="headlineMedium">Domínio de Idioma</Text>
      <Box style={{ maxWidth: '100%' }}>
        {LANGUAGE_SKILLS.map((language) => (
          <List.Item
            key={language.title}
            title={language.title}
            description={language.description}
            descriptionNumberOfLines={2}
            left={(props) => <List.Icon {...props} icon="book-education" />}
          />
        ))}
      </Box>
    </Box>
  )
}
