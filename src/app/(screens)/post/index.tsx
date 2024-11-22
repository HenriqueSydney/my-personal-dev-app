/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { Linking, View } from 'react-native'
import { Avatar } from 'react-native-paper'
import { RichText } from 'react-native-prismic-richtext'

import ParallaxScrollView from '@/components/ParallaxScrollView'
import { Box } from '@/components/ui/Box'
import { Header } from '@/components/ui/Header'
import { SafeBox } from '@/components/ui/SafeBox'
import { Text } from '@/components/ui/Text'
import { useLanguage } from '@/hooks/useLanguage'
import { useToast } from '@/hooks/useToast'
import { client } from '@/libs/prismic'
import { day } from '@/utils/dateFormatter'
import { extractTextFromPrismic } from '@/utils/extractTextFromPrismic'

import { SkeletonPost } from './SkeletonPost'
import { SkeletonText } from './SkeletonText'

type PostProps = {
  title: string
  image: {
    src: string
    alt: string
  }
  publishDate: string
  publishDateDistance: string
  conteudo: any
  timeToRead: number
}

export default function Post() {
  const { localizedStrings } = useLanguage()
  const { showToast } = useToast()
  const [post, setPost] = useState<PostProps | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { slug } = useLocalSearchParams() as { slug: string }

  async function getPost() {
    try {
      const prismicPost = await client.getByUID('posts', slug)
      const PostText = extractTextFromPrismic(prismicPost?.data.conteudo)

      const timeToRead = PostText.split(/\s+/).length / 200

      const postMapped: PostProps = {
        title: (prismicPost?.data.titulo[0].text as string) ?? '',
        image: {
          src: (prismicPost?.data.imagem_principal.url as string) ?? '',
          alt: (prismicPost?.data.imagem_principal.alt as string) ?? '',
        },
        publishDate: prismicPost?.first_publication_date
          ? day(prismicPost?.first_publication_date)
              .format('MMM DD, YYYY')
              .replace(/^\w/, (c) => c.toUpperCase())
          : '',
        publishDateDistance: prismicPost?.first_publication_date
          ? day(prismicPost?.first_publication_date).from(day())
          : '',
        conteudo: prismicPost?.data.conteudo,
        timeToRead: Math.ceil(timeToRead),
      }

      setPost(postMapped)
      setIsLoading(false)
    } catch (error) {
      showToast(localizedStrings.sharedMessages.errors.genericError, 'error')
    }
  }

  useEffect(() => {
    getPost()
  }, [])

  return (
    <SafeBox
      style={{
        alignItems: 'center',
        gap: 24,
        height: '100%',
      }}
    >
      <Header title={post?.title} />
      <ParallaxScrollView
        headerBackgroundColor={{ dark: '#000000', light: '#FFF' }}
        headerImage={{
          src: post?.image?.src
            ? { uri: post?.image.src }
            : require('@/assets/images/blog.jpg'),
          alt: post?.image?.alt ? post.image.alt : '',
        }}
      >
        <Text variant="headlineLarge" lightColor="#FFF" darkColor="#FFF">
          {post?.title}
        </Text>
      </ParallaxScrollView>
      <Box
        style={{
          width: '100%',
          marginTop: 15,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
            <Avatar.Image
              source={require('@/assets/images/eu.jpg')}
              size={50}
            />
            <View>
              <Text variant="titleMedium">Henrique Lima</Text>
              <Text>{localizedStrings.globals.job}</Text>
            </View>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {isLoading && (
              <>
                <SkeletonText variant="primary" />
                <SkeletonText variant="secondary" />
              </>
            )}

            {!isLoading && (
              <>
                <Text>
                  {post?.publishDateDistance} | {post?.publishDate}
                </Text>
                <Text>
                  {post?.timeToRead} {localizedStrings.postScreen.readTime}
                </Text>
              </>
            )}
          </View>
        </View>
        <Box style={{ padding: 5 }}>
          {isLoading && <SkeletonPost />}
          {!isLoading && post && (
            <RichText
              richText={post?.conteudo}
              // default style for texts
              defaultStyle={{
                color: '#000',
              }}
              // specific style for each tag
              styles={{
                hyperlink: { textDecorationLine: 'underline' },
                hyperlinkHover: {
                  textDecorationLine: undefined,
                },
                heading1: { fontSize: 30, marginTop: 15, marginBottom: 10 },
                heading2: { fontSize: 27, marginTop: 15, marginBottom: 10 },
                heading3: { fontSize: 24, marginTop: 15, marginBottom: 10 },
                heading4: { fontSize: 22, marginTop: 15, marginBottom: 10 },
                heading5: { fontSize: 19, marginTop: 15, marginBottom: 10 },
                heading6: { fontSize: 18, marginTop: 15, marginBottom: 10 },
                paragraph: { fontSize: 16, lineHeight: 22 },
                list: {
                  marginLeft: 8,
                  marginVertical: 8,
                  fontSize: 16,
                  lineHeight: 22,
                },
                oList: {
                  marginLeft: 8,
                  marginVertical: 8,
                  fontSize: 16,
                  lineHeight: 22,
                },
                listItem: {
                  marginLeft: 8,
                  marginVertical: 8,
                  fontSize: 16,
                  lineHeight: 22,
                },
                oListItem: {
                  marginLeft: 8,
                  marginVertical: 8,
                  fontSize: 16,
                  lineHeight: 22,
                },
                strong: {
                  fontWeight: 'bold',
                },
                em: {
                  fontStyle: 'italic',
                },
              }}
              onLinkPress={(data: any | undefined) => {
                if (data?.link_type === 'Web') {
                  // const url = data.url.replace(
                  //   'https://makerist-ar://',
                  //   'makerist-ar://',
                  // )
                  return Linking.openURL(data.url)
                }
              }}
            />
          )}
        </Box>
      </Box>
    </SafeBox>
  )
}
