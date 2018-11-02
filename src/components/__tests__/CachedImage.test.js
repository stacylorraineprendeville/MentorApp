import React from 'react'
import { shallow } from 'enzyme'
import { Image, Platform } from 'react-native'
import { CachedImage } from '../CachedImage'

const createTestProps = props => ({
  ...props,
  source: 'some.url.png'
})

describe('CachedImage', () => {
  let wrapper
  let props
  beforeEach(() => {
    props = createTestProps()
    wrapper = shallow(<CachedImage {...props} />)
  })
  it('renders <Image />', () => {
    expect(wrapper.find(Image)).toHaveLength(1)
  })
  it('sets proper source', () => {
    expect(wrapper.find(Image)).toHaveProp('source', { uri: 'some.url.png' })
  })
  it('has proper initial state', () => {
    expect(wrapper).toHaveState({
      cachedSource: false
    })
  })
  it('sets proper source based on OS', () => {
    expect(wrapper.instance().setSource('some.url.png')).toEqual(
      Platform.OS === 'android' ? 'file://some.url.png' : 'some.url.png'
    )
  })
  it('runs checkIfCached on mount', () => {
    const spy = jest.spyOn(wrapper.instance(), 'checkIfCached')
    wrapper.instance().componentDidMount()
    expect(spy).toHaveBeenCalledTimes(1)
  })
  it('applies cached url of image is in cache', done => {
    setTimeout(() => {
      expect(wrapper).toHaveState({
        cachedSource: 'foo/some.url.png'
      })
      done()
    }, 100)
  })
})
