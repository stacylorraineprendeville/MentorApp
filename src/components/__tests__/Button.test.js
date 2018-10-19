import React from 'react'

import { shallow } from 'enzyme'
import { TouchableOpacity, Text } from 'react-native'
import Button from '../Button'

const createTestProps = props => ({
  ...props,
  handleClick: jest.fn(),
  text: 'Some button text'
})

describe('Button Component', () => {
  let wrapper
  let props
  beforeEach(() => {
    props = createTestProps()
    wrapper = shallow(<Button {...props} />)
  })
  describe('rendering', () => {
    it('renders <TouchableOpacity />', () => {
      expect(wrapper.find(TouchableOpacity)).toHaveLength(1)
    })
  })
  describe('rendering', () => {
    it('renders Text />', () => {
      expect(wrapper.find(Text)).toHaveLength(1)
    })
  })
  describe('functionality', () => {
    it('should call handleClick onPress', () => {
      wrapper
        .find(TouchableOpacity)
        .props()
        .onPress()

      expect(wrapper.instance().props.handleClick).toHaveBeenCalledTimes(1)
    })
  })
})
