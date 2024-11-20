import axios from 'axios'
import { useEffect, useState } from 'react'
import { FlatList } from 'react-native'

import { Box } from '@/components/ui/Box'
import { Text } from '@/components/ui/Text'
import { useLanguage } from '@/hooks/useLanguage'

import { ProjectCard } from './ProjectCard'

interface IProjects {
  id: string
  projectName: string
  url: string
  description: string
  language?: string
}

type GitHubApiRepoListResponse = {
  id: number
  name: string
  description: string
  html_url: string
  language?: string
  topics: string[]
}

export function ProjectList() {
  const { localizedStrings } = useLanguage()
  const [projects, setProjects] = useState<IProjects[]>([])
  async function fetchGitHubRepo() {
    try {
      const repository = await axios.get(
        `https://api.github.com/users/henriqueSydney/repos?per_page=100`,
      )

      if (repository.status !== 200) {
        throw new Error('GitHub Repo not found')
      }

      const { data } = repository

      const projectsFromApi: IProjects[] = data
        .map((proj: GitHubApiRepoListResponse) => {
          if (proj.topics.includes('personal')) {
            return {
              id: String(proj.id),
              projectName: proj.name,
              description: proj.description,
              url: proj.html_url,
              language: proj.language,
            }
          }
          return null
        })
        .filter((proj: GitHubApiRepoListResponse | null) => proj !== null)
      setProjects([...projectsFromApi])
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchGitHubRepo()
  }, [])

  return (
    <Box
      darkColor="#0d1117"
      lightColor="#ebebeb"
      style={{ width: '100%', paddingVertical: 25, paddingHorizontal: 10 }}
    >
      <Text variant="headlineMedium">
        {localizedStrings.homeScreen.projectListTitle}
      </Text>
      <Box
        darkColor="#0d1117"
        lightColor="#ebebeb"
        style={{ flexDirection: 'row', marginTop: 15 }}
      >
        <FlatList
          fadingEdgeLength={50}
          data={projects}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProjectCard
              key={item.id}
              description={item.description}
              projectName={item.description}
              url={item.url}
              language={item.language}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </Box>
    </Box>
  )
}
