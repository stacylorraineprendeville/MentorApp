import React from 'react'
import { shallow } from 'enzyme'
import { Picker } from 'react-native'
import Select from '../Select'

const createTestProps = props => ({
  onChange: jest.fn(),
  data: [],
  label: '',
  value: '',
  placeholder: 'This is a select',
  field: 'test',
  countrySelect: true,
  required: false,
  detectError: jest.fn(),
  ...props
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
  it('calls onChange input when selecting an item', () => {
    const spy = jest.spyOn(wrapper.instance(), 'validateInput')

    wrapper
      .find(Picker)
      .props()
      .onValueChange('bg')

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('bg')
    expect(wrapper.instance().props.onChange).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().props.onChange).toHaveBeenCalledWith('bg', 'test')
    expect(wrapper.instance().props.detectError).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().props.detectError).toHaveBeenCalledWith(
      false,
      'test'
    )
  })
  it('shows an error when empty', () => {
    props = createTestProps({ required: true })
    wrapper = shallow(<Select {...props} />)
    const spy = jest.spyOn(wrapper.instance(), 'handleError')

    wrapper
      .find(Picker)
      .props()
      .onValueChange('')

    expect(spy).toHaveBeenCalledTimes(1)
  })
  it('shows a list of items from data prop if not a country select', () => {
    props = createTestProps({
      countrySelect: false,
      data: ['item1', 'item2']
    })
    wrapper = shallow(<Select {...props} />)

    expect(wrapper.find(Picker.Item)).toHaveLength(3)
    expect(wrapper.find(Picker.Item).last()).toHaveProp({
      value: 'item2',
      label: 'item2'
    })
  })
})
