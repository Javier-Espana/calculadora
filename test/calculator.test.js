import Calculator from '../src/app.js'

describe('Calculator', () => {
  let calculator

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="calculator">
        <div id="display-container"></div>
        <div class="keyboard">
          <!-- Botones simulados para testing -->
        </div>
      </div>
    `
    calculator = new Calculator()
  })

  test('should concatenate numbers', () => {
    calculator.handleInput('1')
    calculator.handleInput('2')
    expect(calculator.display.getCurrentValue()).toBe('12')
  })

  test('should clear display after operation', () => {
    calculator.handleInput('5')
    calculator.handleInput('+')
    calculator.handleInput('3')
    expect(calculator.display.getCurrentValue()).toBe('3')
  })

  test('should show ERROR for negative results', () => {
    calculator.handleInput('5')
    calculator.handleInput('-')
    calculator.handleInput('10')
    calculator.handleInput('=')
    expect(calculator.display.getCurrentValue()).toBe('ERROR')
  })

  test('should limit to 9 digits', () => {
    calculator.handleInput('123456789')
    expect(calculator.display.getCurrentValue()).toBe('123456789')
    calculator.handleInput('0') // Este no debería agregarse
    expect(calculator.display.getCurrentValue()).toBe('123456789')
  })

  test('should prevent multiple decimals', () => {
    calculator.handleInput('5')
    calculator.handleInput('.')
    calculator.handleInput('.')
    calculator.handleInput('5')
    expect(calculator.display.getCurrentValue()).toBe('5.5')
  })
})
