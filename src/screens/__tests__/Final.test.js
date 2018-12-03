import React from 'react'
import { shallow } from 'enzyme'
import { ScrollView, Image, FlatList, Text } from 'react-native'
import { Final } from '../lifemap/Final'
import RoundImage from '../../components/RoundImage'
import Button from '../../components/Button'
import Tip from '../../components/Tip'

const createTestProps = props => ({
  navigation: {
    navigate: jest.fn(),
    getParam: jest.fn(param => {
      if (param === 'draftId') {
        return 1
      }
      if (param === 'survey') {
        return {
          id: 2,
          title: 'Other survey',
          surveyStoplightQuestions: [
            { phone: 'phone' },
            { education: 'education' },
            { c: 'c' }
          ]
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
          draftId: 1,
          indicatorSurveyDataList: [
            { key: 'phone', value: 0 },
            { key: 'education', value: 3 }
          ]
        }
      ]
    })
    wrapper = shallow(<Final {...props} />)
  })
  describe('rendering', () => {
    it('renders ScrollView', () => {
      expect(wrapper.find(ScrollView)).toHaveLength(2)
    })
    it('renders Image', () => {
      expect(wrapper.find(Image)).toHaveLength(1)
    })

    it('rendersFlatList', () => {
      expect(wrapper.find(FlatList)).toHaveLength(1)
    })
    it('renders Tip', () => {
      expect(wrapper.find(Tip)).toHaveLength(1)
    })
    it('renders Button', () => {
      expect(wrapper.find(Button)).toHaveLength(1)
    })
  })
  describe('functionality', () => {
    it('passess the correct data to FlatList', () => {
      expect(wrapper.find(FlatList).props().data).toEqual([
        { key: 'phone', value: 0 }
      ])
    })
    it('has correct initial state', () => {
      expect(wrapper.instance().state).toEqual({ continueIsClicked: false })
    })

    it('changes state when contunue is clicked', () => {
      wrapper
        .find(Button)
        .props()
        .handleClick()
      expect(wrapper.instance().state).toEqual({ continueIsClicked: true })
    })
  })
})

describe('Final Lifemap View when no questions are skipped', () => {
  let wrapper
  beforeEach(() => {
    const props = createTestProps({
      drafts: [
        {
          draftId: 1,
          indicatorSurveyDataList: [
            { key: 'phone', value: 3 },
            { key: 'education', value: 1 }
          ]
        }
      ]
    })
    wrapper = shallow(<Final {...props} />)
  })
  describe('rendering', () => {
    it('renders ScrollView', () => {
      expect(wrapper.find(ScrollView)).toHaveLength(2)
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
