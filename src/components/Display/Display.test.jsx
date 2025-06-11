import { render, screen } from '@testing-library/react'
import Display from './Display'

describe('Display Component', () => {
  test('renders default value (0)', () => {
    render(<Display value="0" />)
    expect(screen.getByTestId('display')).toHaveTextContent('0')
  })

  test('renders numeric values correctly', () => {
    render(<Display value="123.45" />)
    expect(screen.getByTestId('display')).toHaveTextContent('123.45')
  })


  test('shows ERROR for values > 999999999', () => {
    render(<Display value="1000000000" />)
    expect(screen.getByTestId('display')).toHaveTextContent('ERROR')
  })

  test('limits to 9 characters', () => {
    render(<Display value="1234567890" />)
    expect(screen.getByTestId('display')).toHaveTextContent('ERROR')
  })
})