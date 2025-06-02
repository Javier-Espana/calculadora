import Display from '../src/components/Display.js'
import Button from '../src/components/Button.js'

export default {
  title: 'Calculator/Components'
}

export const DisplayStory = () => {
  const display = new Display()
  display.update('123+456')
  return display.render()
}
DisplayStory.storyName = 'Display (expresión)'

export const ButtonStory = () => {
  const button = new Button('7', () => alert('Botón presionado'))
  return button.render()
}
ButtonStory.storyName = 'Button (número)'

export const DisplayErrorStory = () => {
  const display = new Display()
  display.update('ERROR')
  return display.render()
}
DisplayErrorStory.storyName = 'Display (ERROR)'

export const ButtonOperationStory = () => {
  const button = new Button('+', () => alert('Operación +'))
  return button.render()
}
ButtonOperationStory.storyName = 'Button (operación +)'

export const DisplayDecimalStory = () => {
  const display = new Display()
  display.update('3.1415926')
  return display.render()
}
DisplayDecimalStory.storyName = 'Display (decimales)'
