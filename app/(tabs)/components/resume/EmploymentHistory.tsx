import { List } from 'react-native-paper'

import { Box } from '@/components/ui/Box'
import { Text } from '@/components/ui/Text'
import { day } from '@/utils/dateFormatter'

const HISTORY = [
  {
    organization: 'Receita Federal',
    startedAt: '2016-01-01',
    endedAt: '',
    contributions: [
      {
        title: 'Tech Lead',
        description:
          'Responsável pela gestão de equipe de desenvolvimento de projetos de Gestão de Pessoas, desde junho/2020',
      },
      {
        title: 'Desenvolvimento de sistema',
        description:
          'Responsável pela análise de requisitos, implementação de funcionalidades, modelagem de banco de dados e implementação de soluções.',
      },
      {
        title: 'Implementação de soluções',
        description:
          'Responsável pela implementação direta de soluções completas, referente a todo ciclo de desenvolvimento, incluindo a construção de Pipelines CI/CD, Monitoramento e Observabilidade e Configuração de Infraestrutura.',
      },
    ],
  },
]

export function EmploymentHistory() {
  return (
    <Box style={{ width: '100%', paddingVertical: 15, paddingHorizontal: 10 }}>
      <Text variant="headlineMedium">Employment History</Text>
      {HISTORY.map((history) => (
        <Box key={history.organization} style={{ padding: 5 }}>
          <Text variant="titleMedium">{history.organization}</Text>
          <Text variant="titleSmall">{`${day(history.startedAt).format('MMMM/YYYY')} - ${history.endedAt === '' ? 'Hoje' : day(history.endedAt).format('MMMM/YYYY')}`}</Text>
          <Box style={{ maxWidth: '100%' }}>
            {history.contributions.map((contribution) => (
              <List.Item
                key={contribution.title}
                title={contribution.title}
                description={contribution.description}
                descriptionNumberOfLines={6}
                left={(props) => (
                  <List.Icon {...props} icon="professional-hexagon" />
                )}
              />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  )
}
