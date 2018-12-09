import React from 'react'
import { shallow } from 'enzyme'
import { StatusBar } from 'react-native'
import { NavWrapper } from '../NavWrapper'
import { LoginStack, AppStack } from '../navigation'

import colors from '../../theme.json'

const createTestProps = props => ({
  user: { token: '' },
  setSyncedState: jest.fn(),
  sync: {
    fullySynced: false,
    images: {
      total: 0,
      synced: 0
    }
  },
  ...props
})

describe('Navigation Wrapper', () => {
  let wrapper
  let props
  beforeEach(() => {
    props = createTestProps()
    wrapper = shallow(<NavWrapper {...props} />)
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  describe('before rehydration', () => {
    it('display status bar with contrasting colors', () => {
      expect(wrapper.find(StatusBar)).toHaveProp({
        backgroundColor: colors.palebeige,
        barStyle: 'dark-content'
      })
    })
  })
})
