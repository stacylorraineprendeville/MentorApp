import React from 'react'
import { shallow } from 'enzyme'
import { ScrollView, Text, FlatList, TouchableOpacity } from 'react-native'
import MockAsyncStorage from 'mock-async-storage'
import { Dashboard } from '../Dashboard'
import Button from '../../components/Button'
import RoundImage from '../../components/RoundImage'

const createTestProps = props => ({
  navigation: {
    navigate: arg => arg
  },
  env: 'production',
  user: { status: '' },

  loadSurveys: jest.fn(),
  loadSnapshots: jest.fn(),
  loadFamilies: jest.fn(),
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
    it('renders <RoundImage />', () => {
      expect(wrapper.find(RoundImage)).toHaveLength(1)
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
  describe('functionality', () => {
    it('passes the correct data to <FlatList />', () => {
      expect(wrapper.find(FlatList).props().data).toEqual(
        wrapper.instance().props.drafts
      )
    })
  })
})

//Mock Async Storage
const mock = () => {
  const mockImpl = new MockAsyncStorage()
  jest.mock('AsyncStorage', () => mockImpl)
}
mock()
import { AsyncStorage as storage } from 'react-native'

describe('Dashboard not yet visited by user', () => {
  let wrapper
  beforeEach(async () => {
    const props = createTestProps()
    await storage.setItem('userVisitedDashboard', 'false')
    wrapper = shallow(<Dashboard {...props} />)
  })
  it('calls action loadSnapshots when user first visits dashboard', () => {
    expect(wrapper.instance().props.loadSnapshots).toHaveBeenCalledTimes(1)
  })
  it('calls action loadSurveys when user first visits dashboard', () => {
    expect(wrapper.instance().props.loadSurveys).toHaveBeenCalledTimes(1)
  })
  it('calls action loadFamilies when user first visits dashboard', () => {
    expect(wrapper.instance().props.loadFamilies).toHaveBeenCalledTimes(1)
  })
})

describe('Dashboard alreadt visited by user', () => {
  let wrapper
  beforeEach(async () => {
    const props = createTestProps()
    await storage.setItem('userVisitedDashboard', 'true')
    wrapper = shallow(<Dashboard {...props} />)
  })
  it('does not action loadSnapshots when user already has visited dashboard', () => {
    expect(wrapper.instance().props.loadSnapshots).toHaveBeenCalledTimes(0)
  })
  it('does not action loadSurveys when user already has visited dashboard', () => {
    expect(wrapper.instance().props.loadSurveys).toHaveBeenCalledTimes(0)
  })
  it('does not action loadFamilies when user already has visited dashboard', () => {
    expect(wrapper.instance().props.loadFamilies).toHaveBeenCalledTimes(0)
  })
})
