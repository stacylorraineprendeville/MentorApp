import React from 'react'
import { shallow } from 'enzyme'
import { Text } from 'react-native'
import Select from '../Select'

const createTestProps = props => ({
  onChange: jest.fn(),
  options: [],
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
  it('renders all necessary text fields', () => {
    expect(wrapper.find(Text)).toHaveLength(3)
  })
})
