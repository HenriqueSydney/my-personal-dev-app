import { List } from 'react-native-paper'

import { Box } from '@/components/ui/Box'
import { Text } from '@/components/ui/Text'

const SOFT_SKILLS = [
  'Foco no cliente',
  'Comunicação eficaz',
  'Adaptabilidade e Flexibilidade',
  'Resolução de Problemas',
  'Aprendizado contínuo',
  'Proatividade',
]

export function SoftSkills() {
  return (
    <Box
      darkColor="#0d1117"
      lightColor="#ebebeb"
      style={{ width: '100%', paddingVertical: 15, paddingHorizontal: 10 }}
    >
      <Text variant="headlineMedium">Soft Skills</Text>
      <Box
        darkColor="#0d1117"
        lightColor="#ebebeb"
        style={{ maxWidth: '100%' }}
      >
        {SOFT_SKILLS.map((skills) => (
          <List.Item
            key={skills}
            title={skills}
            descriptionNumberOfLines={1}
            left={(props) => (
              <List.Icon {...props} icon="account-group-outline" />
            )}
          />
        ))}
      </Box>
    </Box>
  )
}
