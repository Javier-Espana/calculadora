import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

describe('Button Component', () => {
  const mockOnClick = vi.fn()

  test('renders number button correctly', () => {
    render(<Button value="5" className="number" onClick={mockOnClick} />)
    const button = screen.getByText('5')
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('btn number')
  })

  test('renders operation button correctly', () => {
    render(<Button value="+" className="operation" onClick={mockOnClick} />)
    const button = screen.getByText('+')
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('btn operation')
  })

  test('renders zero button with special class', () => {
    render(<Button value="0" className="number zero" onClick={mockOnClick} />)
    const button = screen.getByText('0')
    expect(button).toHaveClass('zero')
  })

  test('calls onClick handler when clicked', () => {
    render(<Button value="5" onClick={mockOnClick} />)
    const button = screen.getByText('5')
    fireEvent.click(button)
    expect(mockOnClick).toHaveBeenCalledWith('5')
  })

  test('displays multiplication symbol as ×', () => {
    render(<Button value="*" />)
    expect(screen.getByText('×')).toBeInTheDocument()
  })
})