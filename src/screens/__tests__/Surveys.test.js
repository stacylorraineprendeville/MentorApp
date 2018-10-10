import React from 'react'
import { shallow } from 'enzyme'
import { View, Button } from 'react-native'
import { Surveys } from '../Surveys'

const createTestProps = props => ({
  loadSurveys: jest.fn(),
  env: 'development',
  navigation: {
    navigate: jest.fn()
  },
  surveys: [],
  token: {
    token: ''
  },
  ...props
})

describe('Surveys', () => {
  let wrapper
  beforeEach(() => {
    const props = createTestProps({
      surveys: [
        {
          id: 1,
          title: 'Test survey 1'
        },
        {
          id: 2,
          title: 'Other survey 2'
        }
      ]
    })
    wrapper = shallow(<Surveys {...props} />)
  })
  describe('rendering', () => {
    it('renders base View', () => {
      expect(wrapper.find(View)).toHaveLength(1)
    })

    it('renders a list of Surveys', () => {
      expect(wrapper.find(Button)).toHaveLength(2)
      expect(wrapper.find(Button).first()).toHaveProp('title', 'Test survey 1')
      expect(wrapper.find(Button).last()).toHaveProp('title', 'Other survey 2')
    })
  })
  describe('functionality', () => {
    it('can navigate to drafts', () => {
      wrapper
        .find(Button)
        .first()
        .props()
        .onPress()

      expect(
        wrapper.instance().props.navigation.navigate
      ).toHaveBeenCalledTimes(1)
      expect(wrapper.instance().props.navigation.navigate).toHaveBeenCalledWith(
        'Draft',
        { survey: 1 }
      )
    })
  })
  describe('lifecycle', () => {
    it('gets surveys on mount', () => {
      expect(wrapper.instance().props.loadSurveys).toHaveBeenCalledTimes(1)
    })
  })
})
