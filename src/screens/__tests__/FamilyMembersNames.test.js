import React from 'react'
import { shallow } from 'enzyme'
import { ScrollView, Text } from 'react-native'
import { FamilyMembersNames } from '../lifemap/FamilyMembersNames'

import Button from '../../components/Button'

const createTestProps = props => ({
  navigation: {
    getParam: jest.fn(),
    navigate: jest.fn()
  },
  drafts: [],
  ...props
})

describe('FamilyMembersNames View', () => {
  let wrapper
  beforeEach(() => {
    const props = createTestProps()
    wrapper = shallow(<FamilyMembersNames {...props} />)
  })
  describe('rendering', () => {
    it('renders ScrollView', () => {
      expect(wrapper.find(ScrollView)).toHaveLength(1)
    })

    it('renders Button', () => {
      expect(wrapper.find(Button)).toHaveLength(1)
    })
  })

  describe('functionality', () => {
    it('calls navigate function when button is pressed', () => {
      wrapper
        .find(Button)
        .props()
        .handleClick()

      expect(
        wrapper.instance().props.navigation.navigate
      ).toHaveBeenCalledTimes(1)
    })
  })
})
