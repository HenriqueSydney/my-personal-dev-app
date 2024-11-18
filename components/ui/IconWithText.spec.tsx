import { render, screen } from '@testing-library/react-native'
import React from 'react'

import { IconWithText } from './IconWithText'

jest.mock('react-native-paper', () => {
  const RealModule = jest.requireActual('react-native-paper')
  return {
    ...RealModule,
    Icon: jest.fn(({ icon, ...props }) => (
      <div {...props} data-testid="icon-button">
        {icon}
      </div>
    )),
  }
})

describe('IconWithText component', () => {
  it('should render IconWithText component with icon and text', () => {
    const icon = 'home'
    const text = 'Home'

    render(<IconWithText icon={icon} text={text} />)

    const displayedText = screen.getByText(text)
    expect(displayedText).toBeTruthy()
  })
})
