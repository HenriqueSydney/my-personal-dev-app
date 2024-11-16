import { useCallback } from 'react'
import { Alert, Linking, View } from 'react-native'
import { Card as PaperCard, Icon } from 'react-native-paper'

import { Text } from '@/components/ui/Text'
import { useToast } from '@/hooks/useToast'

type Props = {
  projectName: string
  url: string
  description: string
  language?: string
}

export function ProjectCard({
  projectName,
  url,
  description,
  language,
}: Props) {
  const { showToast } = useToast()
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url)
    if (supported) {
      await Linking.openURL(url)
    } else {
      showToast('Falha ao tentar acessar a URL', 'error')
      Alert.alert(`Don't know how to open this URL: ${url}`)
    }
  }, [url])
  return (
    <PaperCard
      mode="elevated"
      onPress={handlePress}
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

      <PaperCard.Title
        title={projectName}
        subtitle={description}
        titleVariant="titleMedium"
      />

      <PaperCard.Content style={{ overflow: 'hidden' }}>
        <Text>{language}</Text>
      </PaperCard.Content>
    </PaperCard>
  )
}
