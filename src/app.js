import Display from './components/Display.js'
import { useCalculator } from './hooks/useCalculator.js'

class Calculator {
  constructor () {
    this.display = new Display()
    this.calculator = useCalculator()
    this.firstOperand = null
    this.operator = null
    this.waitingForSecondOperand = false
    this.initialize()
  }

  initialize () {
    const displayElement = this.display.render()
    // Asegura que el display esté en el contenedor correcto
    const displayContainer = document.getElementById('display-container')
    if (displayContainer && !displayContainer.contains(displayElement)) {
      displayContainer.innerHTML = ''
      displayContainer.appendChild(displayElement)
    }
    // Listeners de botones
    document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const value = e.target.dataset.value
        this.handleInput(value)
      })
    })
    // Soporte para teclado físico (opcional, no afecta visualización)
    document.addEventListener('keydown', (e) => {
      const keyMap = {
        '+': '+',
        '-': '-',
        '*': '*',
        '/': '/',
        '%': '%',
        '=': '=',
        Enter: '=',
        '.': '.',
        ',': '.',
        c: 'C',
        C: 'C'
      }
      if (e.key >= '0' && e.key <= '9') {
        this.handleInput(e.key)
      } else if (keyMap[e.key]) {
        if (e.key === 'Enter') e.preventDefault()
        this.handleInput(keyMap[e.key])
      } else if (e.key === 'Backspace') {
        this.resetCalculator()
      }
    })
  }

  handleInput (value) {
    if (!isNaN(value) || value === '.') {
      this.inputDigit(value)
    } else {
      this.handleOperation(value)
    }
  }

  inputDigit (digit) {
    const currentDisplay = this.display.getCurrentValue()
    if (currentDisplay === 'ERROR') return
    if (this.waitingForSecondOperand) {
      // After operator, start new number (do not append to expression)
      this.display.update(digit === '.' ? '0.' : digit)
      this.waitingForSecondOperand = false
      return
    }
    if (digit === '.') {
      if (currentDisplay.includes('.')) return
      if (currentDisplay === '0') {
        this.display.update('0.')
        return
      }
    }
    if (currentDisplay.replace('.', '').length >= 9) return
    const newValue = currentDisplay === '0' && digit !== '.'
      ? digit
      : currentDisplay + digit
    this.display.update(newValue)
  }

  handleOperation (op) {
    const currentDisplayValue = this.display.getCurrentValue()
    let currentValue = parseFloat(currentDisplayValue)
    if (isNaN(currentValue)) {
      const match = currentDisplayValue.match(/^(-?\d+(?:\.\d+)?)([+\-*/%])$/)
      if (match) {
        currentValue = parseFloat(match[1])
      } else {
        currentValue = this.firstOperand !== null ? this.firstOperand : 0
      }
    }
    if (op === 'C') {
      this.resetCalculator()
      return
    }
    if (op === '+/-') {
      this.toggleSign()
      return
    }
    if (currentDisplayValue === 'ERROR') return
    if (op === '=') {
      if (this.operator && this.firstOperand !== null) {
        let secondOperand = currentValue
        const match = currentDisplayValue.match(/[+\-*/%](-?\d+(?:\.\d+)?)$/)
        if (match) {
          secondOperand = parseFloat(match[1])
        }
        this.calculate(this.firstOperand, secondOperand)
        this.operator = null
        this.waitingForSecondOperand = false
      }
      return
    }
    if (this.operator && !this.waitingForSecondOperand) {
      this.calculate(this.firstOperand, currentValue)
      if (this.display.getCurrentValue() === 'ERROR') return
      this.firstOperand = parseFloat(this.display.getCurrentValue())
    } else {
      this.firstOperand = currentValue
    }
    if (['+', '-', '*', '/', '%'].includes(op)) {
      const currentDisplay = this.display.getCurrentValue()
      const hasOperator = /[+\-*/%]$/.test(currentDisplay)
      const newDisplay = hasOperator
        ? currentDisplay.slice(0, -1) + op
        : this.firstOperand.toString() + op
      this.display.update(newDisplay)
    }
    this.operator = op
    this.waitingForSecondOperand = true
  }

  calculate (firstOperand, secondOperand) {
    let second = secondOperand
    if (isNaN(secondOperand)) {
      second = firstOperand
    }
    const result = this.calculator.calculateResult(
      firstOperand,
      second,
      this.operator
    )
    // Solo mostrar ERROR si el resultado es negativo Y la operación NO es toggleSign
    // Pero permitir negativos en el display si el usuario los ingresa manualmente
    if (!isNaN(result) && parseFloat(result) < 0 && this.operator !== '+/-') {
      this.display.update(result)
    } else {
      this.display.update(result)
    }
  }

  toggleSign () {
    const current = this.display.getCurrentValue()
    if (current === '0' || current === 'ERROR') return
    const operatorMatch = current.match(/^(.*?)(-?\d+(\.\d+)?)$/)
    if (!operatorMatch) return
    const prefix = operatorMatch[1]
    const numberStr = operatorMatch[2]
    const toggled = numberStr.startsWith('-')
      ? numberStr.slice(1)
      : '-' + numberStr
    const newDisplay = prefix + toggled
    if (newDisplay.replace(/[-.]/g, '').length <= 9) {
      this.display.update(newDisplay)
    }
  }

  resetCalculator () {
    this.display.clear()
    this.firstOperand = null
    this.operator = null
    this.waitingForSecondOperand = false
  }
}

new Calculator()

export { Calculator }
