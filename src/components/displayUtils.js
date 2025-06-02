export function isValidDisplayValue (strValue) {
  return /^(-?\d+(?:\.\d+)?)([+\-*/%])?$/.test(strValue) ||
    /^(-?\d+(?:\.\d+)?[+\-*/%]-?\d+(?:\.\d+)?)$/.test(strValue)
}

export function isNumberInRange (strValue) {
  if (!isNaN(parseFloat(strValue)) && isFinite(strValue)) {
    if (strValue.replace(/[-.]/g, '').length > 9) return false
    if (Math.abs(parseFloat(strValue)) > 999999999) return false
    return true
  }
  return false
}
