import React from 'react'

import { shallow } from 'enzyme'
import { TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import SkippedListItem from '../SkippedListItem'

const createTestProps = props => ({
  handleClick: jest.fn(),
  item: 'Indicator name',
  ...props
})

describe('SkippedListItem Component', () => {
  let wrapper
  let props
  beforeEach(() => {
    props = createTestProps()
    wrapper = shallow(<SkippedListItem {...props} />)
  })

  describe('rendering', () => {
    it('renders TouchableOpacity', () => {
      expect(wrapper.find(TouchableOpacity)).toHaveLength(1)
    })
    it('renders Text', () => {
      expect(wrapper.find(Text)).toHaveLength(1)
    })
    it('renders Icon', () => {
      expect(wrapper.find(Icon)).toHaveLength(1)
    })
    it('renders the correct indicator name', () => {
      expect(
        wrapper
          .find(Text)
          .first()
          .props().children
      ).toEqual('Indicator name')
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
})
