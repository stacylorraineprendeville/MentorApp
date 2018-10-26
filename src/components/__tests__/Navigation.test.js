import React from 'react'
import { shallow } from 'enzyme'
import { Image } from 'react-native'
import { AppStack, DrawerContent, generateNavOptions } from '../Navigation'

describe('Navigation', () => {
  describe('Drawer', () => {
    const wrapper = shallow(<AppStack />)
    it('contains all links', () => {
      expect(wrapper.instance().state.nav.routes[0].routes).toHaveLength(4)
    })
    it('renders burger menu icon', () => {
      expect(
        generateNavOptions({
          navigation: {
            toggleDrawer: jest.fn()
          }
        })
      ).toEqual(
        expect.objectContaining({
          headerLeft: expect.any(Object)
        })
      )
    })
    it('navigates to proper views', () => {})
  })
  describe('DrawerContent', () => {
    const wrapper = shallow(
      <DrawerContent
        navigation={{ toggleDrawer: jest.fn() }}
        switchLanguage={jest.fn()}
      />
    )
    it('renders nav image', () => {
      expect(wrapper.find(Image)).toHaveLength(1)
    })
    it('allows user to change language', () => {
      const spy = jest.spyOn(wrapper.instance(), 'changeLanguage')
      wrapper
        .find('#en')
        .props()
        .onPress()
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith('en')
    })
  })
})
