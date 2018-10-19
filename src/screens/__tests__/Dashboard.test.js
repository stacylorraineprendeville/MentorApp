import React from 'react'
import { shallow } from 'enzyme'
import { ScrollView, Text } from 'react-native'
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
  drafts: [],
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

    it('renders <Text />', () => {
      expect(wrapper.find(Text)).toHaveLength(1)
    })

    it('renders <Button />', () => {
      expect(wrapper.find(Button)).toHaveLength(3)
    })
  })
  describe('functionality', () => {
    it('calls action loadFamilies on componentDidMount', () => {
      expect(wrapper.instance().props.loadFamilies).toHaveBeenCalledTimes(1)
    })
    it('calls action loadSnapshots on componentDidMount', () => {
      expect(wrapper.instance().props.loadSnapshots).toHaveBeenCalledTimes(1)
    })
    it('calls action loadSurveys on componentDidMount', () => {
      expect(wrapper.instance().props.loadSurveys).toHaveBeenCalledTimes(1)
    })
  })
})
