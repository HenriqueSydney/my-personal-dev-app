import { FlatList } from 'react-native'
import { Chip } from 'react-native-paper'

import { Box } from '@/components/ui/Box'
import { Card } from '@/components/ui/Card'
import { Text } from '@/components/ui/Text'
import { day } from '@/utils/dateFormatter'

export type SlugCardProps = {
  title: string
  postedDate: Date
  excerpt: string
  tags: string[]
  image?: {
    dimensions: {
      width: number
      height: number
    }
    alt: string | null
    url: string
  }
}

export function SlugCard({ title, postedDate, excerpt, tags }: SlugCardProps) {
  return (
    <Card
      title={{
        title,
        subTitle: day(postedDate).from(day()),
      }}
    >
      <Box
        darkColor="transparent"
        lightColor="transparent"
        style={{
          gap: 20,
        }}
      >
        <Text numberOfLines={4}>{excerpt}</Text>
        <Box
          darkColor="transparent"
          lightColor="transparent"
          style={{
            gap: 5,
            flexDirection: 'row',
          }}
        >
          <FlatList
            fadingEdgeLength={25}
            data={tags}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 15,
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              minWidth: '100%',
              marginBottom: 5,
            }}
            renderItem={({ item }) => (
              <Chip key={item} compact={true}>
                {item}
              </Chip>
            )}
            keyExtractor={(item) => item}
          />
        </Box>
      </Box>
    </Card>
  )
}
