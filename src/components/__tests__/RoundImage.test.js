import React from 'react'

import { shallow } from 'enzyme'
import { Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import RoundImage from '../RoundImage'

const createTestProps = props => ({
  ...props,
  source: 'source.jpeg'
})

describe('RoundImage Component', () => {
  let wrapper
  let props
  beforeEach(() => {
    props = createTestProps()
    wrapper = shallow(<RoundImage {...props} />)
  })
  describe('rendering', () => {
    it('renders <Image />', () => {
      expect(wrapper.find(Image)).toHaveLength(1)
    })
    it('renders with the correct source', () => {
      expect(wrapper.find(Image).props().source).toEqual(wrapper.props().source)
    })
  })
})
