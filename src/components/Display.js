export default class Display {
  constructor () {
    this.display = document.createElement('div')
    this.display.id = 'display'
    this.display.textContent = '0'
    this.value = '0'
  }
  update (value) {
    const strValue = value.toString()
    if (/^(-?\d+(?:\.\d+)?)([+\-*/%])?$/.test(strValue) || /^(-?\d+(?:\.\d+)?[+\-*/%]-?\d+(?:\.\d+)?)$/.test(strValue)) {
      this.value = strValue
      this.display.textContent = strValue
      return
    }
    if (!isNaN(parseFloat(strValue)) && isFinite(strValue)) {
      if (strValue.replace(/[-.]/g, '').length > 9) {
        this.display.textContent = 'ERROR'
        this.value = 'ERROR'
        return
      }
      if (Math.abs(parseFloat(strValue)) > 999999999) {
        this.display.textContent = 'ERROR'
        this.value = 'ERROR'
        return
      }
      this.value = strValue
      this.display.textContent = strValue
      return
    }
    this.display.textContent = 'ERROR'
    this.value = 'ERROR'
  }
  clear () {
    this.update('0')
  }
  getCurrentValue () {
    return this.value
  }
  render () {
    return this.display
  }
}
