import React from 'react'
import useCalculator from '../hooks/useCalculator'
import Display from '../components/Display/Display'
import Button from '../components/Button/Button'
import '../styles/main.css'

const Calculator = () => {
  const { display, inputDigit, handleOperation } = useCalculator()

  return (
    <div id="calculator">
      <Display value={display} />
      <div className="keyboard">
        <div className="row">
          <Button value="C" onClick={handleOperation} className="operation" />
          <Button value="+/-" onClick={handleOperation} className="operation" />
          <Button value="%" onClick={handleOperation} className="operation" />
          <Button value="/" onClick={handleOperation} className="operation" />
        </div>
        <div className="row">
          <Button value="7" onClick={inputDigit} className="number" />
          <Button value="8" onClick={inputDigit} className="number" />
          <Button value="9" onClick={inputDigit} className="number" />
          <Button value="*" onClick={handleOperation} className="operation" />
        </div>
        <div className="row">
          <Button value="4" onClick={inputDigit} className="number" />
          <Button value="5" onClick={inputDigit} className="number" />
          <Button value="6" onClick={inputDigit} className="number" />
          <Button value="-" onClick={handleOperation} className="operation" />
        </div>
        <div className="row">
          <Button value="1" onClick={inputDigit} className="number" />
          <Button value="2" onClick={inputDigit} className="number" />
          <Button value="3" onClick={inputDigit} className="number" />
          <Button value="+" onClick={handleOperation} className="operation" />
        </div>
        <div className="row">
          <Button value="0" onClick={inputDigit} className="number zero" />
          <Button value="." onClick={inputDigit} className="number" />
          <Button value="=" onClick={handleOperation} className="operation" />
        </div>
      </div>
    </div>
  )
}

export default Calculator