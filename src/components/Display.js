import { isValidDisplayValue, isNumberInRange } from './displayUtils.js'
import DisplayDom from './DisplayDom.js'

export default class Display {
  constructor () {
    this.dom = new DisplayDom()
  }
  update (value) {
    const strValue = value.toString()
    if (isValidDisplayValue(strValue) || isNumberInRange(strValue)) {
      this.dom.setValue(strValue)
      return
    }
    this.dom.setValue('ERROR')
  }
  clear () { this.update('0') }
  getCurrentValue () { return this.dom.getValue() }
  render () { return this.dom.getDom() }
}
