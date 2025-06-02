import Display from '../src/components/Display.js'
import Button from '../src/components/Button.js'

// Configuración del grupo de historias para Storybook
export default {
  title: 'Calculator/Components'
}

// Historia: Muestra una expresión en el display
export const DisplayStory = () => {
  const display = new Display()
  display.update('123+456')
  return display.render()
}
DisplayStory.storyName = 'Display (expresión)'

// Historia: Muestra un botón numérico
export const ButtonStory = () => {
  const button = new Button('7', () => alert('Botón presionado'))
  return button.render()
}
ButtonStory.storyName = 'Button (número)'

// Historia: Muestra un error en el display
export const DisplayErrorStory = () => {
  const display = new Display()
  display.update('ERROR')
  return display.render()
}
DisplayErrorStory.storyName = 'Display (ERROR)'

// Historia: Muestra un botón de operación
export const ButtonOperationStory = () => {
  const button = new Button('+', () => alert('Operación +'))
  return button.render()
}
ButtonOperationStory.storyName = 'Button (operación +)'

// Historia: Muestra un número decimal en el display
export const DisplayDecimalStory = () => {
  const display = new Display()
  display.update('3.1415926')
  return display.render()
}
DisplayDecimalStory.storyName = 'Display (decimales)'
