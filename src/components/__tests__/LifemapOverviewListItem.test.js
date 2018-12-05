import React from 'react'

import { shallow } from 'enzyme'
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import colors from '../../theme.json'
import LifemapOverviewListItem from '../LifemapOverviewListItem'

const createTestProps = props => ({
  name: 'Family Savings',
  color: 2,
  handleClick: jest.fn(),
  ...props
})

describe('LifemapOverviewListItem Component', () => {
  let wrapper
  let props
  beforeEach(() => {
    props = createTestProps()
    wrapper = shallow(<LifemapOverviewListItem {...props} />)
  })

  describe('rendering', () => {
    it('renders <TouchableOpacity />', () => {
      expect(wrapper.find(TouchableOpacity)).toHaveLength(1)
    })
    it('renders <View />', () => {
      expect(wrapper.find(View)).toHaveLength(1)
    })
    it('renders <Text />', () => {
      expect(wrapper.find(Text)).toHaveLength(1)
    })
    it('renders Icon', () => {
      expect(wrapper.find(Icon)).toHaveLength(2)
    })
  })
  describe('functionality', () => {
    it('passes the correct name to Text', () => {
      expect(wrapper.find(Text).props().children).toEqual('Family Savings')
    })

    it('renders icon in correct color', () => {
      expect(
        wrapper
          .find(Icon)
          .first()
          .props().color
      ).toEqual(colors.gold)
    })
  })
})
