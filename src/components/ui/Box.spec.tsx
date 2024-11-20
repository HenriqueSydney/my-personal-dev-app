import { render, screen } from '@testing-library/react-native'
import * as React from 'react'

import { useThemeColor } from '@/hooks/useThemeColor'

import { Box } from './Box'
import { Text } from './Text'

jest.mock('@/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn(),
}))

const mockedUseThemeColor = useThemeColor as jest.Mock

describe('Box component', () => {
  it('should be able to render Box component correctly', () => {
    render(
      <Box>
        <Text>Hello Test</Text>
      </Box>,
    )

    const box = screen.getByTestId('text-id-box')

    expect(box).toBeTruthy()
  })

  it('should be able to render Box component with correct theme color', () => {
    mockedUseThemeColor.mockReturnValueOnce('#fff')
    render(
      <Box>
        <Text>Hello Test</Text>
      </Box>,
    )

    const box = screen.getByTestId('text-id-box')

    expect(box.props.style).toEqual(
      expect.arrayContaining([{ backgroundColor: '#fff' }]),
    )
  })
})
