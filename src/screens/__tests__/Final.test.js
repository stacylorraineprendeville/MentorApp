import React from 'react'
import { shallow } from 'enzyme'
import { ScrollView, Image, FlatList, Text } from 'react-native'
import { Divider } from 'react-native-elements'
import { Final } from '../lifemap/Final'
import RoundImage from '../../components/RoundImage'
import Button from '../../components/Button'
import Tip from '../../components/Tip'

const createTestProps = props => ({
  navigation: {
    navigate: jest.fn(),
    getParam: jest.fn(param => {
      if (param === 'draft_id') {
        return 1
      }
      if (param === 'survey') {
        return {
          id: 2,
          title: 'Other survey',
          survey_ui_schema: { 'ui:group:indicators': ['a', 'b', 'c'] }
        }
      }
    })
  },
  ...props
})

describe('Skipped Questions View when questions are skipped', () => {
  let wrapper
  beforeEach(() => {
    const props = createTestProps({
      drafts: [
        {
          draft_id: 1,
          indicator_survey_data: { phone: 'NONE', education: 'RED' }
        }
      ]
    })
    wrapper = shallow(<Final {...props} />)
  })
  describe('rendering', () => {
    it('renders ScrollView', () => {
      expect(wrapper.find(ScrollView)).toHaveLength(1)
    })
    it('renders Image', () => {
      expect(wrapper.find(Image)).toHaveLength(1)
    })
    it('renders Divider', () => {
      expect(wrapper.find(Divider)).toHaveLength(1)
    })
    it('rendersFlatList', () => {
      expect(wrapper.find(FlatList)).toHaveLength(1)
    })
    it('renders Tip', () => {
      expect(wrapper.find(Tip)).toHaveLength(1)
    })
  })
  describe('functionality', () => {
    it('passess the correct data to FlatList', () => {
      expect(wrapper.find(FlatList).props().data).toEqual(['phone'])
    })
    it('has correct initial state', () => {
      expect(wrapper.instance().state).toEqual({ checkedBoxes: [] })
    })
  })
})

describe('Final Lifemap View when no questions are skipped', () => {
  let wrapper
  beforeEach(() => {
    const props = createTestProps({
      drafts: [
        {
          draft_id: 1,
          indicator_survey_data: { phone: 'GREEN', education: 'RED' }
        }
      ]
    })
    wrapper = shallow(<Final {...props} />)
  })
  describe('rendering', () => {
    it('renders ScrollView', () => {
      expect(wrapper.find(ScrollView)).toHaveLength(1)
    })
    it('renders RoundImage', () => {
      expect(wrapper.find(RoundImage)).toHaveLength(1)
    })
    it('renders Text', () => {
      expect(wrapper.find(Text)).toHaveLength(2)
    })
    it('renders Button', () => {
      expect(wrapper.find(Button)).toHaveLength(1)
    })
  })

  describe('functionality', () => {
    it('calls handleClick function when Button is clicked', () => {
      wrapper
        .find(Button)
        .props()
        .handleClick()
      expect(
        wrapper.instance().props.navigation.navigate
      ).toHaveBeenCalledTimes(1)
      expect(wrapper.instance().props.navigation.navigate).toHaveBeenCalledWith(
        'Dashboard'
      )
    })
  })
})
