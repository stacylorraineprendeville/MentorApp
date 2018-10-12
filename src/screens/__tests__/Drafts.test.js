import React from 'react'
import { shallow } from 'enzyme'
import { ScrollView, View, Button } from 'react-native'
import { Drafts } from '../Drafts'

const createTestProps = props => ({
  deleteDraft: jest.fn(),
  navigation: {
    navigate: jest.fn()
  },
  drafts: [],
  ...props
})

describe('Draft View', () => {
  let wrapper
  beforeEach(() => {
    const props = createTestProps({
      drafts: [
        {
          draft_id: 1
        },
        {
          draft_id: 2
        }
      ]
    })
    wrapper = shallow(<Drafts {...props} />)
  })
  describe('rendering', () => {
    it('renders base ScrollView', () => {
      expect(wrapper.find(ScrollView)).toHaveLength(1)
    })

    it('renders a View for each draft', () => {
      expect(wrapper.find(View)).toHaveLength(2)
    })

    it('renders a navigate and a delete button for each draft', () => {
      expect(wrapper.find(Button)).toHaveLength(4)
    })

    it('draft navigate buttons have proper titles', () => {
      expect(
        wrapper
          .find(View)
          .first()
          .find(Button)
          .first()
      ).toHaveProp('title', 1)
      expect(
        wrapper
          .find(View)
          .last()
          .find(Button)
          .first()
      ).toHaveProp('title', 2)
    })
  })
  describe('functionality', () => {
    it('can navigate to given draft', () => {
      wrapper
        .find(View)
        .first()
        .find(Button)
        .first()
        .props()
        .onPress()

      expect(
        wrapper.instance().props.navigation.navigate
      ).toHaveBeenCalledTimes(1)
      expect(wrapper.instance().props.navigation.navigate).toHaveBeenCalledWith(
        'Draft',
        { draft: 1 }
      )
    })

    it('can delete given draft', () => {
      wrapper
        .find(View)
        .first()
        .find(Button)
        .last()
        .props()
        .onPress()

      expect(wrapper.instance().props.deleteDraft).toHaveBeenCalledTimes(1)
      expect(wrapper.instance().props.deleteDraft).toHaveBeenCalledWith(1)
    })
  })
})
