import Display from './Display'

export default {
  title: 'Components/Display',
  component: Display,
  argTypes: {
    value: {
      control: {
        type: 'text'
      }
    }
  }
}

const Template = (args) => <Display {...args} />

export const Default = Template.bind({})
Default.args = {
  value: '0'
}

export const WithValue = Template.bind({})
WithValue.args = {
  value: '123456789'
}

export const ErrorState = Template.bind({})
ErrorState.args = {
  value: 'ERROR'
}