import { List } from 'react-native-paper'

import { Box } from '@/components/ui/Box'
import { Text } from '@/components/ui/Text'
import { useLanguage } from '@/hooks/useLanguage'

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
  const { localizedStrings } = useLanguage()
  return (
    <Box style={{ width: '100%', paddingVertical: 15, paddingHorizontal: 10 }}>
      <Text variant="headlineMedium">
        {localizedStrings.resumeScreen.languageFluencyTitle}
      </Text>
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
