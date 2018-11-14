import React from 'react'
import { shallow } from 'enzyme'
import { Picker } from 'react-native'
import CountrySelect from '../CountrySelect'

const createTestProps = props => ({
  ...props,
  onChange: jest.fn()
})

describe('CountrySelect dropdown', () => {
  let wrapper
  let props
  beforeEach(() => {
    props = createTestProps()
    wrapper = shallow(<CountrySelect {...props} />)
  })
  it('renders a Picker from an array of countries', () => {
    expect(wrapper.find(Picker)).toHaveLength(1)
    expect(wrapper.find(Picker.Item)).toHaveLength(2)
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
