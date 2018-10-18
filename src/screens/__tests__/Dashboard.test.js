import React from 'react'
import { shallow } from 'enzyme'
import { ScrollView, Text } from 'react-native'
import { Dashboard } from '../Dashboard'

const createTestProps = props => ({
  navigation: {
    navigate: arg => arg
  },
  ...props
})

describe('Dashboard View', () => {
  let wrapper
  let props
  beforeEach(() => {
    props = createTestProps()
    wrapper = shallow(<Dashboard {...props} />)
  })
  describe('rendering', () => {
    it('renders <ScrollView />', () => {
      expect(wrapper.find(ScrollView)).toHaveLength(1)
    })
  })
  describe('rendering', () => {
    it('renders Text />', () => {
      expect(wrapper.find(Text)).toHaveLength(1)
    })
  })
})
