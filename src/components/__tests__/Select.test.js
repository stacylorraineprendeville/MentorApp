import React from 'react'
import { shallow } from 'enzyme'
import { Picker } from 'react-native'
import Select from '../Select'

const createTestProps = props => ({
  ...props,
  onChange: jest.fn()
})

describe('Select dropdown', () => {
  let wrapper
  let props
  beforeEach(() => {
    props = createTestProps()
    wrapper = shallow(<Select {...props} />)
  })
  it('renders a Picker from an array of countries', () => {
    expect(wrapper.find(Picker)).toHaveLength(1)
    expect(wrapper.find(Picker.Item)).toHaveLength(3)
  })
  it('calls onChange prop when selecting a country', () => {
    wrapper
      .find('#country-select')
      .props()
      .onValueChange('bg')

    expect(wrapper.instance().props.onChange).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().props.onChange).toHaveBeenCalledWith('bg')
  })
})
