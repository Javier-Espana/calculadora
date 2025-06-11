import Button from './Button'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
    className: {
      control: {
        type: 'select',
        options: ['number', 'operation', 'number zero']
      }
    }
  }
}

const Template = (args) => <Button {...args} />

export const One = Template.bind({})
One.args = {
  value: '1',
  className: 'number'
}

export const Two = Template.bind({})
Two.args = {
  value: '2',
  className: 'number'
}

export const Three = Template.bind({})
Three.args = {
  value: '3',
  className: 'number'
}

export const Four = Template.bind({})
Four.args = {
  value: '4',
  className: 'number'
}

export const Five = Template.bind({})
Five.args = {
  value: '5',
  className: 'number'
}

export const Six = Template.bind({})
Six.args = {
  value: '6',
  className: 'number'
}

export const Seven = Template.bind({})
Seven.args = {
  value: '7',
  className: 'number'
}

export const Eight = Template.bind({})
Eight.args = {
  value: '8',
  className: 'number'
}

export const Nine = Template.bind({})
Nine.args = {
  value: '9',
  className: 'number'
}

export const Zero = Template.bind({})
Zero.args = {
  value: '0',
  className: 'number zero'
}

export const Decimal = Template.bind({})
Decimal.args = {
  value: '.',
  className: 'number'
}

export const Addition = Template.bind({})
Addition.args = {
  value: '+',
  className: 'operation'
}

export const Subtraction = Template.bind({})
Subtraction.args = {
  value: '-',
  className: 'operation'
}

export const Multiplication = Template.bind({})
Multiplication.args = {
  value: '*',
  className: 'operation'
}

export const Division = Template.bind({})
Division.args = {
  value: '/',
  className: 'operation'
}

export const Percentage = Template.bind({})
Percentage.args = {
  value: '%',
  className: 'operation'
}

export const Equals = Template.bind({})
Equals.args = {
  value: '=',
  className: 'operation'
}

export const Clear = Template.bind({})
Clear.args = {
  value: 'C',
  className: 'operation'
}

export const SignToggle = Template.bind({})
SignToggle.args = {
  value: '+/-',
  className: 'operation'
}