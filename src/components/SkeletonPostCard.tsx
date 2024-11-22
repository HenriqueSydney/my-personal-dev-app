import ContentLoader, { Rect } from 'react-content-loader/native'
import { Card } from 'react-native-paper'

import { Box } from './ui/Box'

export function SkeletonPostCard() {
  return (
    <Card mode="elevated" style={{ marginBottom: 15 }}>
      <Box darkColor="transparent" lightColor="transparent">
        <ContentLoader
          speed={2}
          width={350}
          height={200}
          backgroundColor="#868686"
          foregroundColor="#cccccc"
        >
          <Rect x="10" y="15" rx="3" ry="3" width="200" height="22" />
          <Rect x="10" y="45" rx="3" ry="3" width="100" height="14" />
          <Rect x="10" y="80" rx="3" ry="3" width="320" height="14" />
          <Rect x="10" y="98" rx="3" ry="3" width="350" height="14" />
          <Rect x="10" y="116" rx="3" ry="3" width="330" height="14" />
          <Rect x="10" y="134" rx="3" ry="3" width="355" height="14" />
          <Rect x="10" y="160" rx="3" ry="3" width="80" height="28" />
          <Rect x="105" y="160" rx="3" ry="3" width="110" height="28" />
          <Rect x="230" y="160" rx="3" ry="3" width="90" height="28" />
        </ContentLoader>
      </Box>
    </Card>
  )
}
