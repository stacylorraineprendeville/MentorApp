import React from 'react'
import { shallow } from 'enzyme'
import { ScrollView } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import Location from '../lifemap/Location'

// navigator mock
/* eslint-disable no-undef */
global.navigator = {
  geolocation: {
    getCurrentPosition: callback =>
      callback({
        coords: {
          latitude: 44,
          longitude: 45,
          accuracy: 15
        }
      }),
    watchPosition: jest.fn()
  }
}
/* eslint-enable no-undef */

describe('Family Location component', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Location />)
  })
  it('renders base ScrollView', () => {
    expect(wrapper.find(ScrollView)).toHaveLength(1)
  })
  it('has proper initial state', () => {
    wrapper = shallow(<Location />, { disableLifecycleMethods: true })
    expect(wrapper).toHaveState({
      latitude: null,
      longitude: null,
      accuracy: null,
      postcode: '',
      houseDescription: ''
    })
  })
  it('renders MapView', () => {
    expect(wrapper.find(MapView)).toHaveLength(1)
  })
  it('gets device location', () => {
    expect(wrapper).toHaveState({
      latitude: 44,
      longitude: 45
    })
  })
  it('shows a Marker at the user location', () => {
    expect(wrapper.find(Marker)).toHaveLength(1)
    expect(wrapper.find(Marker)).toHaveProp('coordinate', {
      latitude: 44,
      longitude: 45
    })
  })
  it('allows dragging of the Marker', () => {
    expect(wrapper.find(Marker)).toHaveProp('draggable')
    expect(wrapper.find(Marker)).toHaveProp('onDragEnd')
  })
  it('updates Marker state after draging has finished', () => {
    wrapper
      .find(Marker)
      .first()
      .props()
      .onDragEnd({
        nativeEvent: {
          coordinate: {
            latitude: 50,
            longitude: 50
          }
        }
      })

    expect(wrapper).toHaveState({
      latitude: 50,
      longitude: 50
    })
  })
  it('shows GPS accuracy range', () => {
    expect(wrapper.find('#accuracy')).toHaveHTML(
      '<react-native-mock>GPS: Accurate to 15m</react-native-mock>'
    )
    expect(wrapper).toHaveState({
      accuracy: 15
    })
  })
  it('edits family locaiton', () => {
    wrapper
      .find('#postcode')
      .props()
      .onChangeText('123')

    wrapper
      .find('#houseDescription')
      .props()
      .onChangeText('Foo')

    expect(wrapper).toHaveState({
      postcode: '123',
      houseDescription: 'Foo'
    })
  })
})
