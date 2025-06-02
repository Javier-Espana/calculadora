export default class DisplayDom {
  constructor () {
    this.display = document.createElement('div')
    this.display.id = 'display'
    this.display.textContent = '0'
    this.value = '0'
  }
  setValue (val) {
    this.value = val
    this.display.textContent = val
  }
  getValue () { return this.value }
  getDom () { return this.display }
}
