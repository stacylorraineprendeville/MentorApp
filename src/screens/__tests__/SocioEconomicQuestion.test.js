import React from 'react'
import { shallow } from 'enzyme'
import { SocioEconomicQuestion } from '../lifemap/SocioEconomicQuestion'
import Select from '../../components/Select'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import data from '../__mocks__/fake-socio-economic-data.json'

const createTestProps = props => ({
  navigation: {
    navigate: jest.fn(),
    push: jest.fn(),
    getParam: param => (param === 'survey' ? data : null),
    setParams: jest.fn()
  },
  drafts: [
    {
      surveyId: 1,
      survey_version_id: 19,
      created: 1542801890805,
      draftId: 1,
      economic_survey_data: {},
      indicator_survey_data: {},
      status: 'In progress',
      family_data: {
        count_family_members: '2',
        familyMembersList: [
          {
            firstName: 'man',
            gender: 'Male',
            birthDate: 418078800
          }
        ]
      },
      personal_survey_data: {
        firstName: 'dan',
        lastName: 'man',
        gender: 'Male',
        dateOfBirth: 324334800,
        document: 'Permanent resident card number',
        documentNumber: 'asdggasddsa',
        countryOfBirth: 'DZ',
        country: 'DZ'
      }
    }
  ],
  ...props
})

describe('SocioEconomicQuestion screens', () => {
  let wrapper
  let props
  describe('initial screen', () => {
    beforeEach(() => {
      props = createTestProps()
      wrapper = shallow(<SocioEconomicQuestion {...props} />)
    })

    it('sets navigation socioEconomics param', () => {
      expect(
        wrapper.instance().props.navigation.setParams
      ).toHaveBeenCalledTimes(1)

      expect(
        wrapper.instance().props.navigation.setParams
      ).toHaveBeenCalledWith({ socioEconomics: expect.any(Object) })
    })
  })

  describe('after data is set', () => {
    beforeEach(() => {
      props = createTestProps({
        navigation: {
          push: jest.fn(),
          navigate: jest.fn(),
          getParam: () => ({
            currentScreen: 1,
            totalScreens: 3,
            questionsPerScreen: [
              [
                {
                  questionText:
                    'Is there any member with disabilities in your household? Please indicate the disability type',
                  answerType: 'select',
                  required: true,
                  options: [
                    { value: 'PHYSICAL', text: 'Phisical' },
                    { value: 'MENTAL', text: 'Mental' },
                    { value: 'LEARNING', text: 'Learning' },
                    {
                      value: 'NO-MEMBER-DISABILITIES',
                      text: 'No member with disabilities'
                    }
                  ]
                },
                {
                  questionText:
                    'What is the property title situation of your household?',
                  answerType: 'select'
                }
              ]
            ]
          }),
          setParams: jest.fn()
        }
      })
      wrapper = shallow(<SocioEconomicQuestion {...props} />)
    })

    it('renders Select elements for each select question', () => {
      expect(wrapper.find(Select)).toHaveLength(2)
    })

    it('shows a select with all props', () => {
      expect(wrapper.find(Select).first()).toHaveProp({
        required: true,
        label:
          'Is there any member with disabilities in your household? Please indicate the disability type',
        data: [
          { value: 'PHYSICAL', text: 'Phisical' },
          { value: 'MENTAL', text: 'Mental' },
          { value: 'LEARNING', text: 'Learning' },
          {
            value: 'NO-MEMBER-DISABILITIES',
            text: 'No member with disabilities'
          }
        ]
      })
    })

    it('renders a continue button', () => {
      expect(wrapper.find(Button)).toHaveLength(1)

      expect(wrapper.find(Button).last()).toHaveProp({
        colored: true,
        text: 'Continue'
      })
    })

    it('navigates to next socio-economics screen on pressing continue', () => {
      wrapper
        .find(Button)
        .last()
        .props()
        .handleClick()

      expect(wrapper.instance().props.navigation.push).toHaveBeenCalledTimes(1)

      expect(wrapper.instance().props.navigation.push).toHaveBeenCalledWith(
        'SocioEconomicQuestion',
        expect.any(Object)
      )
    })
  })

  describe('non-initial screen', () => {
    beforeEach(() => {
      props = createTestProps({
        navigation: {
          navigate: jest.fn(),
          getParam: param =>
            param === 'socioEconomics'
              ? {
                  currentScreen: 3,
                  totalScreens: 3,
                  questionsPerScreen: [
                    [],
                    [],
                    [
                      {
                        questionText:
                          'Please estimate your gross monthly household income (i.e, before taxes National Insurance contributions or other deductions)',
                        answerType: 'text',
                        dimension: 'Income',
                        required: true,
                        forFamilyMember: true,
                        options: []
                      }
                    ]
                  ]
                }
              : 1,
          setParams: jest.fn()
        }
      })
      wrapper = shallow(<SocioEconomicQuestion {...props} />)
    })

    it('renders a TextInput for each text question for each family member', () => {
      expect(wrapper.find(TextInput)).toHaveLength(2)
    })

    it('sets the correct TextInput props', () => {
      expect(wrapper.find(TextInput).first()).toHaveProp({
        required: true,
        placeholder:
          'Please estimate your gross monthly household income (i.e, before taxes National Insurance contributions or other deductions)'
      })
    })

    it('navigates to next non-socio-economic screen after done with all questions', () => {
      wrapper
        .find(Button)
        .last()
        .props()
        .handleClick()

      expect(
        wrapper.instance().props.navigation.navigate
      ).toHaveBeenCalledTimes(1)

      expect(wrapper.instance().props.navigation.navigate).toHaveBeenCalledWith(
        'BeginLifemap',
        expect.any(Object)
      )
    })
  })
})
