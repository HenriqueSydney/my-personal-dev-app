import { render, screen } from '@testing-library/react-native'
import React from 'react'

import { useThemeColor } from '@/hooks/useThemeColor'

import { SafeBox } from './SafeBox' // Caminho correto para o seu componente
import { Text } from './Text'

jest.mock('@/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn(),
}))
jest.mock('react-native-paper', () => {
  const RealModule = jest.requireActual('react-native-paper')
  return {
    ...RealModule,
    IconButton: jest.fn(({ icon, ...props }) => (
      <div {...props} data-testid="icon-button">
        {icon}
      </div>
    )),
  }
})
const mockedUseThemeColor = useThemeColor as jest.Mock

describe('SafeBox Component', () => {
  it('should render SafeBox with children and footer', () => {
    const lightColor = 'lightblue'
    const darkColor = 'darkblue'
    const childrenText = 'Test content'

    // Mock do hook useThemeColor para retornar a cor de fundo
    mockedUseThemeColor.mockReturnValue(lightColor)

    // Renderizando o componente com conteúdo de teste
    render(
      <SafeBox lightColor={lightColor} darkColor={darkColor}>
        <Text>{childrenText}</Text>
      </SafeBox>,
    )

    // Verificando se o texto do conteúdo foi renderizado
    expect(screen.getByText(childrenText)).toBeTruthy()

    // Verificando se o Footer foi renderizado
    expect(
      screen.getByText('All rights reserved © 2024 Henrique Lima'),
    ).toBeTruthy()
  })
})
