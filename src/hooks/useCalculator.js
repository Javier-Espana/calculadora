import { useState } from 'react'

const useCalculator = () => {
  const [display, setDisplay] = useState('0')
  const [firstOperand, setFirstOperand] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false)

  const calculateResult = (first, second, op) => {
    let result
    switch (op) {
      case '+': result = first + second; break
      case '-': result = first - second; break
      case '*': result = first * second; break
      case '%': result = first * (second / 100); break
      case '/':
        if (second === 0) return 'ERROR'
        result = first / second
        break
      default: return null
    }

    if (!isFinite(result) || Math.abs(result) > 999999999) return 'ERROR'

    if (result.toString().includes('.')) {
      const str = result.toString()
      const integerPart = str.split('.')[0]
      const decimalPlaces = Math.min(8 - integerPart.length, 6)
      result = parseFloat(result.toFixed(decimalPlaces))
    }

    return result.toString()
  }

  const inputDigit = (digit) => {
    if (display === 'ERROR') return
    
    if (waitingForSecondOperand) {
      setDisplay(digit === '.' ? '0.' : digit)
      setWaitingForSecondOperand(false)
      return
    }

    if (digit === '.') {
      if (display.includes('.')) return
      if (display === '0') {
        setDisplay('0.')
        return
      }
    }

    if (display.replace('.', '').length >= 9) return
    const newValue = display === '0' && digit !== '.' ? digit : display + digit
    setDisplay(newValue)
  }

  const handleOperation = (op) => {
    const currentValue = parseFloat(display)
    
    if (op === 'C') {
      setDisplay('0')
      setFirstOperand(null)
      setOperator(null)
      setWaitingForSecondOperand(false)
      return
    }

    if (op === '+/-') {
      if (display === '0' || display === 'ERROR') return
      setDisplay(display.startsWith('-') ? display.slice(1) : `-${display}`)
      return
    }

    if (display === 'ERROR') return

    if (op === '=') {
      if (operator && firstOperand !== null) {
        const result = calculateResult(firstOperand, currentValue, operator)
        setDisplay(result)
        setOperator(null)
        setWaitingForSecondOperand(false)
      }
      return
    }

    if (operator && !waitingForSecondOperand) {
      const result = calculateResult(firstOperand, currentValue, operator)
      if (result === 'ERROR') return
      setDisplay(result)
      setFirstOperand(parseFloat(result))
    } else {
      setFirstOperand(currentValue)
    }

    setOperator(op)
    setWaitingForSecondOperand(true)
  }

  return {
    display,
    inputDigit,
    handleOperation
  }
}

export default useCalculator