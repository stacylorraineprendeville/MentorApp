import React from 'react'

import { shallow } from 'enzyme'
import { Text, View } from 'react-native'

import LifemapOverview from '../LifemapOverview'
import LifemapOverviewListItem from '../LifemapOverviewListItem'

const createTestProps = props => ({
  surveyData: [
    {
      codeName: 'FamilySavings',
      questionText: 'Family Savings',
      dimension: 'Health & Environment'
    },
    {
      codeName: 'FamilyIncome',
      questionText: 'Family Income',
      dimension: 'Income'
    }
  ],
  draftData: [
    {
      key: 'FamilySavings',
      value: 2
    },
    {
      key: 'FamilyIncome',
      value: 3
    }
  ],
  navigateToScreen: jest.fn(),
  ...props
})

describe('LifemapOverview Component', () => {
  let wrapper
  let props
  beforeEach(() => {
    props = createTestProps()
    wrapper = shallow(<LifemapOverview {...props} />)
  })

  describe('rendering', () => {
    it('renders View', () => {
      expect(wrapper.find(View)).toHaveLength(3)
    })
    it('renders Text', () => {
      expect(wrapper.find(Text)).toHaveLength(2)
    })
    it('renders LifemapOverviewListItem', () => {
      expect(wrapper.find(LifemapOverviewListItem)).toHaveLength(2)
    })
  })
  describe('functionality', () => {
    it('passes the correct name to LifemapOverviewListItem', () => {
      expect(
        wrapper
          .find(LifemapOverviewListItem)
          .first()
          .props().name
      ).toEqual('Family Savings')
    })

    it('passes the correct color to LifemapOverviewListItem', () => {
      expect(
        wrapper
          .find(LifemapOverviewListItem)
          .first()
          .props().color
      ).toEqual(2)
    })

    it('calls navigateToScreen with the correct arg for priority', () => {
      wrapper
        .find(LifemapOverviewListItem)
        .first()
        .props()
        .handleClick()
      expect(wrapper.instance().props.navigateToScreen).toHaveBeenCalledTimes(1)
      expect(wrapper.instance().props.navigateToScreen).toHaveBeenCalledWith(
        'AddPriority',
        'FamilySavings'
      )
    })

    it('calls navigateToScreen with the correct arg for achievement', () => {
      wrapper
        .find(LifemapOverviewListItem)
        .last()
        .props()
        .handleClick()
      expect(wrapper.instance().props.navigateToScreen).toHaveBeenCalledTimes(1)
      expect(wrapper.instance().props.navigateToScreen).toHaveBeenCalledWith(
        'AddAchievement',
        'FamilyIncome'
      )
    })
  })
})
