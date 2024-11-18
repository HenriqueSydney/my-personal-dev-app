import { render, screen } from '@testing-library/react-native'
import React from 'react'

import { Footer } from './Footer'
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
describe('Footer Component', () => {
  it('should renders Footer Component correctly', () => {
    render(<Footer />)

    // Verifica se o título e subtítulo são renderizados corretamente
    expect(
      screen.getByText('All rights reserved © 2024 Henrique Lima'),
    ).toBeTruthy()
  })
})
