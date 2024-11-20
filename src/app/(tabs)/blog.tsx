import { useState } from 'react'
import { Searchbar } from 'react-native-paper'

import ParallaxScrollView from '@/components/ParallaxScrollView'
import { PostList } from '@/components/PostList'
import { Box } from '@/components/ui/Box'
import { Header } from '@/components/ui/Header'
import { SafeBox } from '@/components/ui/SafeBox'
import { Text } from '@/components/ui/Text'
import { useLanguage } from '@/hooks/useLanguage'

export default function TabTwoScreen() {
  const { localizedStrings } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  return (
    <SafeBox
      style={{
        alignItems: 'center',
        gap: 24,
        height: '100%',
        paddingTop: 10,
      }}
    >
      <Header title="Blog" />
      <ParallaxScrollView
        headerBackgroundColor={{ dark: '#000000', light: '#FFF' }}
        headerImage={{
          src: require('@/assets/images/blog.jpg'),
          alt: localizedStrings.blogScreen.headerImageAlt,
        }}
      >
        <Text variant="headlineLarge" lightColor="#FFF" darkColor="#FFF">
          {localizedStrings.blogScreen.title}
        </Text>
      </ParallaxScrollView>
      <Box
        style={{
          width: '100%',
          marginTop: 15,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
        }}
      >
        <Searchbar
          placeholder={localizedStrings.globals.search}
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{ marginHorizontal: 10 }}
        />
        <PostList query={searchQuery} />
      </Box>
    </SafeBox>
  )
}
