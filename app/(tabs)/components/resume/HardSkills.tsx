import { List } from 'react-native-paper'

import { Box } from '@/components/ui/Box'
import { Text } from '@/components/ui/Text'

const HARD_SKILLS = [
  {
    topic: 'Linguagens de Programação',
    items: ['JavaScript', 'TypeScript', 'PHP', 'Python'],
  },
  {
    topic: 'Frameworks',
    items: ['React', 'Next.js', 'React Native'],
  },
  {
    topic: 'Banco de Dados',
    items: ['MySQL', 'PostgreSQL', 'SQLite', 'MongoDB', 'Redis'],
  },
  {
    topic: 'DevOps e Infraestrutura',
    items: [
      'CI/CD',
      'GitLab CI',
      'GitHub Actions',
      'Terraform',
      'Docker',
      'Kubernetes',
    ],
  },
  {
    topic: 'Monitoramento e Observabilidade',
    items: ['Grafana', 'Prometheus', 'Grafana Loki'],
  },
  {
    topic: 'Análise e Especificação de Sistemas',
    items: ['Análise de Sistemas', 'Especificação de Requisitos'],
  },
]

export function HardSkills() {
  return (
    <Box style={{ width: '100%', paddingVertical: 15, paddingHorizontal: 10 }}>
      <Text variant="headlineMedium">Hard Skills</Text>
      <Box style={{ maxWidth: '100%' }}>
        {HARD_SKILLS.map((skills) => (
          <List.Item
            key={skills.topic}
            title={skills.topic}
            description={`${skills.items.join('; ')}.`}
            descriptionNumberOfLines={4}
            left={(props) => <List.Icon {...props} icon="devices" />}
          />
        ))}
      </Box>
    </Box>
  )
}
