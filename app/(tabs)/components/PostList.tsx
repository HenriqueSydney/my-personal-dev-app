/* eslint-disable @typescript-eslint/no-explicit-any */
import * as prismic from '@prismicio/client'
import { Link } from 'expo-router'
import { useEffect, useState } from 'react'
import { Button } from 'react-native-paper'

import { client } from '@/app/libs/prismic'
import { Box } from '@/components/ui/Box'
import { Text } from '@/components/ui/Text'
import { useLanguage } from '@/hooks/useLanguage'
import { day } from '@/utils/dateFormatter'

import { SlugCard, SlugCardProps } from './SlugCard'

type Props = {
  mainPage?: boolean
  postsPerPage?: number
  query?: string
}

// type Posts = {
//   id: string
//   first_publication_date: string
//   data: {
//     image_principal: {
//       dimensions: {
//         width: number
//         height: number
//       }
//       alt: string | null
//       url: string
//     }
//     titulo: {
//       text: string
//     }[]
//     conteudo: any[]
//     tags: {
//       tag: {
//         text: string
//       }[]
//     }[]
//   }
// }

type PostsType = SlugCardProps & {
  id: string
  uid: string
}

export function PostList({
  mainPage = false,
  postsPerPage,
  query = undefined,
}: Props) {
  const { localizedStrings } = useLanguage()
  const [posts, setPosts] = useState<PostsType[]>([])
  async function fetchPosts() {
    try {
      const prismicPosts = await client.getAllByType('posts', {
        orderings: {
          field: 'document.first_publication_date',
          direction: 'desc',
        },
        filters:
          query && query !== ''
            ? [prismic.filter.fulltext('document', query)]
            : undefined,
        pageSize: mainPage ? 5 : postsPerPage,
      })

      const mappedPrismicPosts: PostsType[] = prismicPosts.map((post: any) => {
        return {
          title: post.data.titulo[0].text,
          excerpt:
            post.data.conteudo.find(
              (content: any) => content.type === 'paragraph',
            )?.text ?? '',
          id: post.id,
          uid: post.uid,
          postedDate: post.first_publication_date,
          tags: post.data.tags
            .map((tag: any) => tag.tag)
            .flat()
            .map((tag: any) => tag.text),
          image: post.data.image_principal,
        }
      })

      setPosts(mappedPrismicPosts)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [query])

  return (
    <Box
      darkColor={mainPage ? undefined : '#0d1117'}
      lightColor={mainPage ? undefined : '#ebebeb'}
      style={{
        width: '100%',
        paddingVertical: 25,
        paddingHorizontal: 10,
      }}
    >
      {mainPage && (
        <Text variant="headlineMedium">
          {localizedStrings.homeScreen.postList.title}
        </Text>
      )}
      <Box
        darkColor={mainPage ? undefined : '#0d1117'}
        lightColor={mainPage ? undefined : '#ebebeb'}
        style={{ marginTop: 15 }}
      >
        {posts.map((post) => (
          <Link
            key={post.id}
            href={{
              pathname: '/screens/post',
              params: { slug: post.uid },
            }}
          >
            <SlugCard
              title={post.title}
              excerpt={post.excerpt}
              postedDate={day(post.postedDate).toDate()}
              tags={post.tags}
            />
          </Link>
        ))}
      </Box>
      {mainPage && (
        <Link href="/blog" asChild>
          <Button icon="post-outline" mode="outlined">
            {localizedStrings.homeScreen.postList.readMorePostsButtonLabel}...
          </Button>
        </Link>
      )}
    </Box>
  )
}
