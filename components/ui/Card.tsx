import { PropsWithChildren, ReactNode } from 'react'
import { IconButton, Card as PaperCard } from 'react-native-paper'

type Props = PropsWithChildren<{
  title?: {
    title: string
    subTitle?: string
  }
  actions?: ReactNode[]
}>

export function Card({ children, title, actions }: Props) {
  return (
    <PaperCard mode="elevated" style={{ marginBottom: 15 }}>
      {actions && (
        <PaperCard.Actions>
          <IconButton icon="chevron-right" />
        </PaperCard.Actions>
      )}
      {title && (
        <PaperCard.Title
          title={title.title}
          subtitle={title.subTitle ? title.subTitle : undefined}
          titleVariant="headlineSmall"
        />
      )}
      <PaperCard.Content>{children}</PaperCard.Content>
    </PaperCard>
  )
}
