import React from 'react'
import { shallow } from 'enzyme'
import { ScrollView, Text, ProgressBarAndroid, View } from 'react-native'

import { Question } from '../lifemap/Question'
import Slider from '../../components/Slider'
import Checkbox from '../../components/Checkbox'

const createTestProps = props => ({
  navigation: {
    navigate: jest.fn(),
    getParam: jest.fn(param => {
      if (param === 'survey') {
        return survey
      } else if (param === 'step') {
        return 0
      } else if (param === 'draft_id') {
        return 1
      }
    })
  },
  addSurveyData: jest.fn(),
  ...props
})

describe('Question View', () => {
  let wrapper
  beforeEach(() => {
    const props = createTestProps()
    wrapper = shallow(<Question {...props} />)
    survey.survey_schema.required = []
  })
  describe('rendering', () => {
    it('renders ScrollView', () => {
      expect(wrapper.find(ScrollView)).toHaveLength(1)
    })
    it('renders Text', () => {
      expect(wrapper.find(Text)).toHaveLength(2)
    })
    it('renders ProgressBarAndroid', () => {
      expect(wrapper.find(ProgressBarAndroid)).toHaveLength(1)
    })
    it('renders Slider', () => {
      expect(wrapper.find(Slider)).toHaveLength(1)
    })
  })

  describe('functionality', () => {
    it('calls selectAnswer when slide is clicked', () => {
      const spy = jest.spyOn(wrapper.instance(), 'selectAnswer')
      wrapper
        .find(Slider)
        .props()
        .selectAnswer()

      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('calls selectAnswer with argument NONE when checkbox is checked', () => {
      const spy = jest.spyOn(wrapper.instance(), 'selectAnswer')
      wrapper
        .find(Checkbox)
        .props()
        .onIconPress()

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith('NONE')
    })
    it('renders CheckBox when indicator is not required', () => {
      expect(wrapper.find(Checkbox)).toHaveLength(1)
    })
    it('renders Text when indicator is required', () => {
      survey.survey_schema.required = ['phone']
      const props = createTestProps()
      wrapper = shallow(<Question {...props} />)
      expect(wrapper.find(Checkbox)).toHaveLength(0)
      expect(wrapper.find(Text)).toHaveLength(3)
    })
  })
})
const survey = {
  id: 1,
  title: 'Test survey 1',
  survey_ui_schema: { 'ui:group:indicators': ['phone'] },
  survey_schema: {
    properties: {
      phone: {
        title: {
          es: 'Cuenta con teléfono o celular?'
        },
        items: {
          enum: [
            {
              url: 'https://s3.us-east-2.amazonaws.com/fp-psp-images/25-3.jpg',
              value: 'GREEN',
              description:
                'La familia cuenta con servicio de telefonía fija o celular disponible de manera constante.'
            },
            {
              url: 'https://s3.us-east-2.amazonaws.com/fp-psp-images/25-2.jpg',
              value: 'YELLOW',
              description:
                'La familia cuenta con servicio de telefonía fija o celular, pero puede utilizarlo solamente parte del tiempo.'
            },
            {
              url: 'https://s3.us-east-2.amazonaws.com/fp-psp-images/25-1.jpg',
              value: 'RED',
              description:
                'La familia no cuenta con servicio de telefonía (ni celular ni fija).'
            },
            {
              url: 'NONE',
              value: 'NONE',
              description: ''
            }
          ]
        }
      }
    },
    required: []
  }
}
