import { render, screen } from '@testing-library/react-native'
import React from 'react'

import { Card } from './Card'
import { Text } from './Text'

describe('Card Component', () => {
  it('should renders Card Component with title and subtitle', () => {
    render(
      <Card title={{ title: 'Card Title', subTitle: 'Card Subtitle' }}>
        <></>
      </Card>,
    )

    // Verifica se o título e subtítulo são renderizados corretamente
    expect(screen.getByText('Card Title')).toBeTruthy()
    expect(screen.getByText('Card Subtitle')).toBeTruthy()
  })

  it('should renders Card Component with title, but without subtitle', () => {
    render(
      <Card title={{ title: 'Card Title' }}>
        <></>
      </Card>,
    )

    // Verifica se apenas o título é renderizado
    expect(screen.getByText('Card Title')).toBeTruthy()
    expect(screen.queryByText('Card Subtitle')).toBeNull()
  })

  it('should renders Card Component with actions', () => {
    render(
      <Card actions={[<Text key="teste">Hello Test</Text>]}>
        <></>
      </Card>,
    )

    expect(screen.getByTestId('test-id-card-action')).toBeTruthy()
    expect(screen.getByText('Hello Test')).toBeTruthy()
  })

  it('should renders Card Component with Content', () => {
    render(
      <Card>
        <Text>Child Content</Text>
      </Card>,
    )

    // Verifica se o conteúdo dos filhos está presente
    expect(screen.getByText('Child Content')).toBeTruthy()
  })
})
