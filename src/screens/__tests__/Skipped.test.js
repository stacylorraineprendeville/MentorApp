import React from 'react'
import { shallow } from 'enzyme'
import { ScrollView, Image } from 'react-native'
import { Skipped } from '../lifemap/Skipped'

const createTestProps = props => ({
  navigation: {
    navigate: jest.fn(),
    getParam: jest.fn(() => ({
      id: 2,
      title: 'Other survey',
      survey_ui_schema: { 'ui:group:indicators': ['a', 'b', 'c'] }
    }))
  },
  drafts: [],
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
  })

  describe('functionality', () => {})
})
