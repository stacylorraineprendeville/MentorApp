import React from 'react'

import { shallow } from 'enzyme'
import { Text, ActivityIndicator, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Loading from '../Loading'

const createTestProps = props => ({
  time: 'ok',
  ...props
})

describe('Loading Component', () => {
  let wrapper
  let props
  beforeEach(() => {
    props = createTestProps()
    wrapper = shallow(<Loading {...props} />)
  })
  describe('rendering', () => {
    it('renders <View />', () => {
      expect(wrapper.find(View)).toHaveLength(1)
    })
    it('renders <Text />', () => {
      expect(wrapper.find(Text)).toHaveLength(3)
    })
    it('renders <ActivityIndicator />', () => {
      expect(wrapper.find(ActivityIndicator)).toHaveLength(1)
    })
  })
  describe('functionality', () => {
    it('shows correct text when time property is set to ok', () => {
      expect(
        wrapper
          .find(Text)
          .at(1)
          .render()
          .text()
      ).toBe('Yes!')

      expect(
        wrapper
          .find(Text)
          .at(2)
          .render()
          .text()
      ).toBe('We will be ready soon.')
    })

    it('shows correct text when time property is set to slow', () => {
      props = createTestProps({ time: 'slow' })
      wrapper = shallow(<Loading {...props} />)
      expect(
        wrapper
          .find(Text)
          .at(1)
          .render()
          .text()
      ).toBe('Oops!')

      expect(
        wrapper
          .find(Text)
          .at(2)
          .render()
          .text()
      ).toBe('This might take a while...')
    })
  })
})
