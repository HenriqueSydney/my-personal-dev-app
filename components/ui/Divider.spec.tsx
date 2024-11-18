import { render, screen } from '@testing-library/react-native'
import React from 'react'

import { Divider } from './Divider'

describe('Divider Component', () => {
  it('should renders Divider Component correctly', () => {
    render(<Divider />)

    // Verifica se o título e subtítulo são renderizados corretamente
    expect(screen.getByTestId('divider-test-id')).toBeTruthy()
  })
})
