import { renderHook, act } from '@testing-library/react'
import useCalculator from './useCalculator'

describe('useCalculator Hook', () => {
  test('initializes with display 0', () => {
    const { result } = renderHook(() => useCalculator())
    expect(result.current.display).toBe('0')
  })

  test('handles number input correctly', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => result.current.inputDigit('5'))
    expect(result.current.display).toBe('5')
  })

  test('concatenates multiple digits', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => result.current.inputDigit('1'))
    act(() => result.current.inputDigit('2'))
    act(() => result.current.inputDigit('3'))
    expect(result.current.display).toBe('123')
  })

  test('handles decimal point correctly', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => result.current.inputDigit('5'))
    act(() => result.current.inputDigit('.'))
    act(() => result.current.inputDigit('2'))
    expect(result.current.display).toBe('5.2')
  })

  test('performs addition correctly', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => result.current.inputDigit('5'))
    act(() => result.current.handleOperation('+'))
    act(() => result.current.inputDigit('3'))
    act(() => result.current.handleOperation('='))
    expect(result.current.display).toBe('8')
  })

  test('clears display with C button', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => result.current.inputDigit('5'))
    act(() => result.current.handleOperation('C'))
    expect(result.current.display).toBe('0')
  })
})