import React from 'react'
import { shallow } from 'enzyme'
import { ScrollView, Text } from 'react-native'
import { Question } from '../lifemap/Question'

const createTestProps = props => ({
  navigation: {
    navigate: jest.fn(),
    getParam: jest.fn(() => ({
      id: 1,
      title: 'Test survey',
      survey_ui_schema: { 'ui:group:indicators': ['a', 'b'] }
    }))
  },
  ...props
})

describe('Question View', () => {
  let wrapper
  beforeEach(() => {
    const props = createTestProps()
    wrapper = shallow(<Question {...props} />)
  })
  describe('rendering', () => {
    it('renders ScrollView', () => {
      expect(wrapper.find(ScrollView)).toHaveLength(1)
    })

    it('renders Text', () => {
      expect(wrapper.find(Text)).toHaveLength(1)
    })
  })

  describe('functionality', () => {
    it('calculates correctly the number of questions', () => {
      expect(wrapper.instance().numberOfQuestions).toEqual(3)
    })
  })
})
