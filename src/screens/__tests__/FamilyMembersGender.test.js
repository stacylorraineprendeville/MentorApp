import React from 'react'
import { shallow } from 'enzyme'
import { ScrollView, Text } from 'react-native'
import { FamilyMembersGender } from '../lifemap/FamilyMembersGender'

import Button from '../../components/Button'
import Select from '../../components/Select'

const createTestProps = props => ({
  navigation: {
    getParam: jest.fn(
      param =>
        param === 'draftId'
          ? 4
          : {
              surveyPersonalQuestions: [
                {
                  id: 22,
                  questionText: 'Enter your gender',
                  answerType: 'select',
                  options: [
                    {
                      text: 'Female',
                      value: 'F'
                    },
                    {
                      text: 'Male',
                      value: 'M'
                    },
                    {
                      text: 'Prefer not to disclose',
                      value: 'O'
                    }
                  ]
                }
              ]
            }
    ),
    navigate: jest.fn()
  },
  drafts: [
    {
      draftId: 4,
      surveyId: 1,
      personal_survey_data: {
        firstName: 'Jane',
        lastName: 'Doe',
        documentNumber: '5468568',
        email: 'jane@doe.com',
        phone: '40965035',
        gender: 'F'
      },
      economic_survey_data: {
        familyCar: 'Yes'
      },
      indicator_survey_data: {
        income: 'GREEN'
      },
      family_data: {
        countFamilyMembers: 2,
        familyMembersList: [{ firstName: 'Demo', gender: 'Male' }]
      }
    }
  ],
  addSurveyData: jest.fn(),
  ...props
})

describe('FamilyMembersGender View', () => {
  let wrapper
  beforeEach(() => {
    const props = createTestProps()
    wrapper = shallow(<FamilyMembersGender {...props} />)
  })
  describe('rendering', () => {
    it('renders ScrollView', () => {
      expect(wrapper.find(ScrollView)).toHaveLength(1)
    })

    it('renders Button', () => {
      expect(wrapper.find(Button)).toHaveLength(1)
    })
    it('renders Select', () => {
      expect(wrapper.find(Select)).toHaveLength(1)
    })
    it('renders Text', () => {
      expect(wrapper.find(Text)).toHaveLength(1)
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
  it('gives Select the proper value', () => {
    expect(wrapper.find(Select).props().value).toBe('Male')
  })

  it('calls addFamilyMemberGender on valid date', () => {
    const spy = jest.spyOn(wrapper.instance(), 'addFamilyMemberGender')

    wrapper
      .find(Select)
      .last()
      .props()
      .onChange()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('enables Button by default', () => {
    expect(
      wrapper
        .find(Button)
        .last()
        .props().disabled
    ).toBe(false)
  })
  it('disables Button when an error occurs', () => {
    wrapper.setState({ errorsDetected: ['error'] })

    expect(
      wrapper
        .find(Button)
        .last()
        .props().disabled
    ).toBe(true)
  })
})
