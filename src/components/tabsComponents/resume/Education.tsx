import { List } from 'react-native-paper'

import { Box } from '@/components/ui/Box'
import { Text } from '@/components/ui/Text'
import { useLanguage } from '@/hooks/useLanguage'
import { day } from '@/utils/dateFormatter'

const EDUCATION = [
  {
    organization: 'DevOps Engineering - CEUB University',
    startedAt: '2024-10-01',
    endedAt: '',
    level: `Specialization`,
  },
  {
    organization: 'System Analysis and Development - CEUB University',
    startedAt: '2023-10-01',
    endedAt: '',
    level: `Associate's Degree`,
  },
  {
    organization: 'Human Resources - CEUB University',
    startedAt: '2014-04-04',
    endedAt: '2015-05-09',
    level: `Specialization`,
  },
]

export function Education() {
  const { localizedStrings } = useLanguage()
  return (
    <Box
      darkColor="#0d1117"
      lightColor="#ebebeb"
      style={{ width: '100%', paddingVertical: 15, paddingHorizontal: 10 }}
    >
      <Text variant="headlineMedium">
        {localizedStrings.resumeScreen.educationTitle}
      </Text>
      <Box
        darkColor="#0d1117"
        lightColor="#ebebeb"
        style={{ maxWidth: '100%' }}
      >
        {EDUCATION.map((education) => (
          <List.Item
            key={education.organization}
            title={education.organization}
            titleNumberOfLines={2}
            description={`${education.level} - ${day(education.startedAt).format('MMMM/YYYY')} - ${education.endedAt === '' ? 'Hoje' : day(education.endedAt).format('MMMM/YYYY')}`}
            descriptionNumberOfLines={1}
            left={(props) => <List.Icon {...props} icon="school" />}
          />
        ))}
      </Box>
    </Box>
  )
}
