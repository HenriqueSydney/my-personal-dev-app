import { PostList } from '@/components/PostList'
import { ProjectList } from '@/components/ProjectList'
import { Header } from '@/components/ui/Header'
import { SafeBox } from '@/components/ui/SafeBox'

import { ContactContainer } from './components/home/ContactContainer'
import { DeveloperContainer } from './components/home/DeveloperContainer'

export default function HomeScreen() {
  return (
    <SafeBox
      style={{
        alignItems: 'center',
        gap: 24,
        height: '100%',
        paddingTop: 10,
      }}
    >
      <Header marginBottom={10} />
      <DeveloperContainer />
      <ProjectList />
      <PostList mainPage={true} />
      <ContactContainer />
    </SafeBox>
  )
}