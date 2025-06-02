export function useCalculator () {
  const validateInput = (value) => {
    if (value === 'ERROR') return false
    if (value.length >= 9) return false
    return true
  }

  const calculateResult = (first, second, operator) => {
    let result
    switch (operator) {
      case '+': result = first + second; break
      case '-': result = first - second; break
      case '*': result = first * second; break
      case '%':
        // Calculadora estándar: porcentaje es (first * second) / 100
        result = first * (second / 100)
        break
      case '/':
        if (second === 0) return 'ERROR'
        result = first / second
        break
      default: return null
    }

    // Validaciones de resultado
    if (!isFinite(result) || Math.abs(result) > 999999999) return 'ERROR'

    // Manejo de decimales
    if (result.toString().includes('.')) {
      const str = result.toString()
      const integerPart = str.split('.')[0]
      const decimalPlaces = Math.min(8 - integerPart.length, 6)
      result = parseFloat(result.toFixed(decimalPlaces))
    }

    return result.toString()
  }

  return { validateInput, calculateResult }
}
