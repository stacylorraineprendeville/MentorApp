import React from 'react'
import { shallow } from 'enzyme'
import { ScrollView, Text } from 'react-native'
import { FamilyMembersNames } from '../lifemap/FamilyMembersNames'

import Button from '../../components/Button'

const createTestProps = props => ({
  navigation: {
    getParam: jest.fn(param => (param === 'draft_id' ? 4 : null)),
    navigate: jest.fn()
  },
  drafts: [
    {
      draft_id: 4,
      survey_id: 1,
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
      family_data: {}
    }
  ],
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
