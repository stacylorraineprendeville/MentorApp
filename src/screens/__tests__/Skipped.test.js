import React from 'react'
import { shallow } from 'enzyme'
import { ScrollView, Image, FlatList } from 'react-native'
import { Divider } from 'react-native-elements'
import Tip from '../../components/Tip'
import { Skipped } from '../lifemap/Skipped'

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
  drafts: [
    {
      draft_id: 1,
      indicator_survey_data: { phone: 'NONE', education: 'RED' }
    }
  ],
  ...props
})

describe('Skipped View', () => {
  let wrapper
  beforeEach(() => {
    const props = createTestProps()
    wrapper = shallow(<Skipped {...props} />)
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
  })
})
