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
