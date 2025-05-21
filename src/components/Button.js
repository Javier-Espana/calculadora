export default class Button {
  constructor (value, onClick) {
    this.button = document.createElement('button')
    this.button.textContent = value
    this.button.dataset.value = value
    this.button.addEventListener('click', () => onClick(value))
  }

  render () {
    return this.button
  }
}
