import React from 'react'
import { shallow } from 'enzyme'
import { ScrollView, View } from 'react-native'
import { Family } from '../Family'

const createTestProps = props => ({
  loadSnapshots: jest.fn(),
  env: 'development',
  navigation: {
    getParam: () => 12
  },
  snapshots: [],
  token: {
    token: ''
  },
  ...props
})

describe('Single Family View', () => {
  let wrapper
  const props = createTestProps({
    snapshots: [
      {
        family: { familyId: 12 },
        created_at: 3495923469234
      },
      {
        family: { familyId: 14 },
        created_at: 3495923469234
      }
    ]
  })
  wrapper = shallow(<Family {...props} />)
  describe('rendering', () => {
    it('renders base ScrollView element', () => {
      expect(wrapper.find(ScrollView)).toHaveLength(1)
    })
    it('renders a list of snapshots', () => {
      expect(wrapper.find(View)).toHaveLength(1)
    })
  })
})
