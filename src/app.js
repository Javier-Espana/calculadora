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
    if (displayElement.parentNode) {
      displayElement.parentNode.removeChild(displayElement)
    }
    const displayContainer = document.getElementById('display-container')
    if (displayContainer) {
      displayContainer.appendChild(displayElement)
    } else {
      // Fallback: insert as first child if container not found
      const calculatorElement = document.getElementById('calculator')
      calculatorElement.insertBefore(displayElement, calculatorElement.firstChild)
    }

    document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const value = e.target.dataset.value
        this.handleInput(value)
      })
    })

    // Soporte para teclado físico
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
        // Solo prevenir el comportamiento por defecto si es Enter
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

    // Si hay error, no hacer nada
    if (currentDisplay === 'ERROR') return

    // Resetear display si estamos esperando el segundo operando
    if (this.waitingForSecondOperand) {
      this.display.clear()
      this.waitingForSecondOperand = false
    }

    // Manejar punto decimal
    if (digit === '.') {
      if (currentDisplay.includes('.')) return
      if (currentDisplay === '0') {
        this.display.update('0.')
        return
      }
    }

    // Limitar a 9 caracteres
    if (currentDisplay.replace('.', '').length >= 9) return

    // Actualizar display
    const newValue = currentDisplay === '0' && digit !== '.'
      ? digit
      : currentDisplay + digit
    this.display.update(newValue)
  }

  handleOperation (op) {
    const currentDisplayValue = this.display.getCurrentValue()
    // Si el display muestra un operador (ej: '5+'), extraer solo el número
    let currentValue = parseFloat(currentDisplayValue)
    if (isNaN(currentValue)) {
      const match = currentDisplayValue.match(/^(-?\d+(?:\.\d+)?)([+\-*/%])$/)
      if (match) {
        currentValue = parseFloat(match[1])
      } else {
        currentValue = this.firstOperand !== null ? this.firstOperand : 0
      }
    }

    // Operación Clear
    if (op === 'C') {
      this.resetCalculator()
      return
    }

    // Operación cambio de signo
    if (op === '+/-') {
      this.toggleSign()
      return
    }

    // Si hay error, no procesar operaciones
    if (currentDisplayValue === 'ERROR') return

    // Operación igual
    if (op === '=') {
      if (this.operator && this.firstOperand !== null) {
        // Obtener segundo operando desde el display actual
        let secondOperand = currentValue
        // Si el display es como '5+3', extraer el número después del operador
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

    // Si se pulsa un operador y ya hay uno pendiente y no estamos esperando el segundo operando,
    // calcular el resultado parcial antes de guardar el nuevo operador
    if (this.operator && !this.waitingForSecondOperand) {
      this.calculate(this.firstOperand, currentValue)
      if (this.display.getCurrentValue() === 'ERROR') return
      this.firstOperand = parseFloat(this.display.getCurrentValue())
    } else {
      this.firstOperand = currentValue
    }

    // Mostrar el número y el operador en pantalla (ej: 5+)
    if (['+', '-', '*', '/', '%'].includes(op)) {
      const currentDisplay = this.display.getCurrentValue()
      const hasOperator = /[+\-*/%]$/.test(currentDisplay)
      const newDisplay = hasOperator
        ? currentDisplay.slice(0, -1) + op // reemplaza operador
        : this.firstOperand.toString() + op // añade operador si no lo hay
      this.display.update(newDisplay)
    }

    this.operator = op
    this.waitingForSecondOperand = true
  }

  calculate (firstOperand, secondOperand) {
    // Si el display muestra solo el operador, usar el primer operando como segundo
    let second = secondOperand
    if (isNaN(secondOperand)) {
      second = firstOperand
    }
    const result = this.calculator.calculateResult(
      firstOperand,
      second,
      this.operator
    )
    this.display.update(result)
  }

  toggleSign () {
    const current = this.display.getCurrentValue()

    if (current === '0' || current === 'ERROR') return

    // Detectar si hay una expresión con operador
    const operatorMatch = current.match(/^(.*?)(-?\d+(\.\d+)?)$/)
    if (!operatorMatch) return

    const prefix = operatorMatch[1] // puede incluir número y operador, ej: '5+'
    const numberStr = operatorMatch[2] // número final, ej: '3' o '-3'

    const toggled = numberStr.startsWith('-')
      ? numberStr.slice(1)
      : '-' + numberStr

    const newDisplay = prefix + toggled

    // Validación simple de longitud (ignorando el signo y punto decimal)
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
