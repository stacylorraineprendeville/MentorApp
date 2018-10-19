import React from 'react'
import { shallow } from 'enzyme'
import { ScrollView, Text, FlatList, TouchableOpacity } from 'react-native'
import { Dashboard } from '../Dashboard'
import Button from '../../components/Button'

const createTestProps = props => ({
  navigation: {
    navigate: arg => arg
  },
  env: 'production',
  token: { status: '' },
  loadSurveys: jest.fn(),
  loadFamilies: jest.fn(),
  loadSnapshots: jest.fn(),
  drafts: [
    {
      draft_id: 1
    },
    {
      draft_id: 2
    }
  ],
  ...props
})

describe('Dashboard View', () => {
  let wrapper
  let props
  beforeEach(() => {
    props = createTestProps()
    wrapper = shallow(<Dashboard {...props} />)
  })
  describe('rendering', () => {
    it('renders <ScrollView />', () => {
      expect(wrapper.find(ScrollView)).toHaveLength(1)
    })

    it('renders <Button />', () => {
      expect(wrapper.find(Button)).toHaveLength(3)
    })
    it('renders <FlatList />', () => {
      expect(wrapper.find(FlatList)).toHaveLength(1)
    })
    it('renders no drafts message if there are no drafts', () => {
      props = createTestProps({ drafts: [] })
      wrapper = shallow(<Dashboard {...props} />)
      expect(wrapper.find('#no-drafts-message')).toHaveLength(1)
    })
  })
  describe('component functionality', () => {
    it('calls action loadFamilies on componentDidMount', () => {
      expect(wrapper.instance().props.loadFamilies).toHaveBeenCalledTimes(1)
    })
    it('calls action loadSnapshots on componentDidMount', () => {
      expect(wrapper.instance().props.loadSnapshots).toHaveBeenCalledTimes(1)
    })
    it('calls action loadSurveys on componentDidMount', () => {
      expect(wrapper.instance().props.loadSurveys).toHaveBeenCalledTimes(1)
    })
    it('passes the correct data to <FlatList />', () => {
      expect(wrapper.find(FlatList).props().data).toEqual(
        wrapper.instance().props.drafts
      )
    })
  })
})
