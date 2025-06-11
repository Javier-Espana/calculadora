import React from 'react'

const Display = ({ value }) => {
  const isTooLong = value.length > 9
  const isTooBig = !isNaN(value) && Number(value) > 999999999

  const displayValue = isTooLong || isTooBig ? 'ERROR' : value

  return (
    <div id="display" data-testid="display" className="calculator-display">
      {displayValue}
    </div>
  )
}

export default Display
