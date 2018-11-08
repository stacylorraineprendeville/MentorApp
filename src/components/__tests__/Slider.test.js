import React from 'react'

import { shallow } from 'enzyme'
import { ScrollView, Text, TouchableOpacity } from 'react-native'
import Image from '../CachedImage'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Slider from '../Slider'
import colors from '../../theme.json'

const createTestProps = props => ({
  ...props,
  slides: [
    {
      description:
        'Our household income is always above 60% of the UK average.',
      url: 'https://some-url-1.jpg',
      value: 'GREEN'
    },
    {
      description:
        'Our household income, this year, is above 60% of the UK average.',
      url: 'https://some-url-2.jpg',
      value: 'YELLOW'
    },
    {
      description:
        'Our household income is always below 60% of the UK average.',
      url: 'https://some-url-3.jpg',
      value: 'RED'
    }
  ],
  selectAnswer: jest.fn(),
  text: 'Some button text'
})

describe('Slider Component', () => {
  let wrapper
  let props
  beforeEach(() => {
    props = createTestProps()
    wrapper = shallow(<Slider {...props} />)
  })
  describe('rendering', () => {
    it('renders ScrollView', () => {
      expect(wrapper.find(ScrollView)).toHaveLength(1)
    })
    it('renders TouchableOpacity', () => {
      expect(wrapper.find(TouchableOpacity)).toHaveLength(3)
    })
    it('renders Image', () => {
      expect(wrapper.find(Image)).toHaveLength(3)
    })
    it('renders Text', () => {
      expect(wrapper.find(Text)).toHaveLength(3)
    })
    it('renders Icon', () => {
      expect(wrapper.find(Icon)).toHaveLength(1)
    })
  })

  describe('functionality', () => {
    it('has correct initial state', () => {
      expect(wrapper.instance().state).toEqual({ selectedColor: colors.green })
    })
    it('does not change state when user clicks on green slide', () => {
      wrapper
        .find(TouchableOpacity)
        .at(0)
        .props()
        .onPress()
      expect(wrapper.instance().state).toEqual({ selectedColor: colors.green })
    })
    it('does changes state to yellow when user clicks on yellow slide', () => {
      wrapper
        .find(TouchableOpacity)
        .at(1)
        .props()
        .onPress()
      expect(wrapper.instance().state).toEqual({ selectedColor: colors.gold })
    })
  })
  it('does changes state to red when user clicks on red slide', () => {
    wrapper
      .find(TouchableOpacity)
      .at(2)
      .props()
      .onPress()
    expect(wrapper.instance().state).toEqual({ selectedColor: colors.red })
  })
  it('calls selectAnswer function with the correct argument for green', () => {
    wrapper
      .find(TouchableOpacity)
      .at(0)
      .props()
      .onPress()
    expect(wrapper.instance().props.selectAnswer).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().props.selectAnswer).toHaveBeenCalledWith('GREEN')
  })
  it('calls selectAnswer function with the correct argument for yellow', () => {
    wrapper
      .find(TouchableOpacity)
      .at(1)
      .props()
      .onPress()
    expect(wrapper.instance().props.selectAnswer).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().props.selectAnswer).toHaveBeenCalledWith('YELLOW')
  })
  it('calls selectAnswer function with the correct argument for red', () => {
    wrapper
      .find(TouchableOpacity)
      .at(2)
      .props()
      .onPress()
    expect(wrapper.instance().props.selectAnswer).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().props.selectAnswer).toHaveBeenCalledWith('RED')
  })
})
