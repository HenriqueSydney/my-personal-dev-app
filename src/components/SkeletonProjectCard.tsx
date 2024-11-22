import ContentLoader, { Rect } from 'react-content-loader/native'
import { View } from 'react-native'
import { Card as PaperCard, Icon } from 'react-native-paper'

export function SkeletonProjectCard() {
  return (
    <PaperCard
      mode="elevated"
      style={{
        width: 200,
        height: 170,
        margin: 5,
      }}
      contentStyle={{
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
      }}
    >
      <View
        style={{
          position: 'absolute',
          opacity: 0.25,
          justifyContent: 'center',
          alignItems: 'center',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Icon source="github" size={150} />
      </View>
      <View
        style={{
          position: 'absolute',
          opacity: 0.5,
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          top: 5,
          right: 5,
        }}
      >
        <Icon source="launch" size={20} />
      </View>
      <View
        style={{
          position: 'absolute',
          opacity: 0.5,
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          bottom: 5,
          right: 5,
        }}
      >
        <Icon source="code-tags" size={20} />
      </View>
      <ContentLoader
        speed={2}
        width={400}
        height={160}
        viewBox="0 0 400 160"
        backgroundColor="#868686"
        foregroundColor="#cccccc"
      >
        <Rect x="20" y="20" rx="3" ry="3" width="88" height="14" />
        <Rect x="20" y="47" rx="3" ry="3" width="52" height="12" />
        <Rect x="20" y="140" rx="3" ry="3" width="60" height="12" />
      </ContentLoader>
    </PaperCard>
  )
}
