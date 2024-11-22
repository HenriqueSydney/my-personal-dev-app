import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ProjectList } from '@/components/ProjectList'
import { Education } from '@/components/tabsComponents/resume/Education'
import { EmploymentHistory } from '@/components/tabsComponents/resume/EmploymentHistory'
import { HardSkills } from '@/components/tabsComponents/resume/HardSkills'
import { LanguageSkills } from '@/components/tabsComponents/resume/LanguageSkills'
import { SoftSkills } from '@/components/tabsComponents/resume/SoftSkills'
import { Box } from '@/components/ui/Box'
import { Header } from '@/components/ui/Header'
import { IconWithText } from '@/components/ui/IconWithText'
import { SafeBox } from '@/components/ui/SafeBox'
import { Text } from '@/components/ui/Text'
import { useLanguage } from '@/hooks/useLanguage'
import { day } from '@/utils/dateFormatter'

export default function Resume() {
  const { localizedStrings } = useLanguage()
  return (
    <SafeBox
      style={{
        alignItems: 'center',
        gap: 24,
        height: '100%',
        paddingTop: 10,
      }}
    >
      <Header title={localizedStrings.globals.resume} />
      <ParallaxScrollView
        headerBackgroundColor={{ dark: '#000000', light: '#FFF' }}
        headerImage={{
          src: require('@/assets/images/curriculo.jpg'),
          alt: localizedStrings.resumeScreen.headerImageAlt,
        }}
      >
        <Text variant="headlineLarge" lightColor="#FFF" darkColor="#FFF">
          {localizedStrings.resumeScreen.title}
        </Text>
      </ParallaxScrollView>
      <Box
        style={{
          width: '100%',
          marginTop: 15,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          style={{
            gap: 16,
          }}
        >
          <Text variant="titleLarge">Henrique Sydney Ribeiro Lima</Text>
          <Box
            style={{
              flexDirection: 'row',
              gap: 16,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconWithText
              icon="face-man-shimmer"
              text={day('1989-04-24').fromNow(true)}
            />
            <IconWithText icon="laptop" text={localizedStrings.globals.job} />
          </Box>
        </Box>
        <Box
          darkColor="#0d1117"
          lightColor="#ebebeb"
          style={{
            width: '100%',
            paddingVertical: 20,
            paddingHorizontal: 10,
            marginTop: 20,
            gap: 8,
          }}
        >
          <Text variant="headlineMedium">
            {localizedStrings.resumeScreen.profileTitle}
          </Text>
          <Text>
            Desenvolvedor React, Next, Node, Python, com domínio em em SQL e
            NoSQL. Adepto a cultura DevOps, com conhecimentos em CI/CD, IaC, K8s
            e Cloud.
          </Text>
          <Text>
            Possuo conhecimentos e experiência em desenvolvimento, design,
            testes e manutenção softwares. Tenho pro eficiência nas linguagens
            JavaScript, com TypeScript e frameworks da Stack React, e PHP.
          </Text>
          <Text>
            Apaixonado por programação. Sempre buscando novos conhecimentos e
            desafios.
          </Text>
          <Box
            darkColor="#0d1117"
            lightColor="#ebebeb"
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}
          >
            <Text>Brasília (DF) | Brasil | (61) 995125151</Text>
          </Box>
        </Box>
        <EmploymentHistory />
        <SoftSkills />
        <HardSkills />
        <Education />
        <LanguageSkills />
        <ProjectList />
      </Box>
    </SafeBox>
  )
}
