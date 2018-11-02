import React, { Component } from 'react'
import { Image, StyleSheet, Platform } from 'react-native'
import PropTypes from 'prop-types'
import RNFetchBlob from 'rn-fetch-blob'

let dirs = RNFetchBlob.fs.dirs

export class CachedImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cachedSource: false
    }
  }
  setSource(source) {
    return Platform.OS === 'android' ? 'file://' + source : '' + source
  }
  checkIfCached() {
    const { source } = this.props

    RNFetchBlob.fs
      .exists(`${dirs.DocumentDir}/${source.replace(/https?:\/\//, '')}`)
      .then(exist => {
        if (exist) {
          this.setState({
            cachedSource: this.setSource(
              `${dirs.DocumentDir}/${source.replace(/https?:\/\//, '')}`
            )
          })
        }
      })
  }
  componentDidMount() {
    this.checkIfCached()
  }
  render() {
    const { cachedSource } = this.state
    const { source } = this.props

    return (
      <Image
        style={styles.container}
        source={{ uri: cachedSource || source }}
      />
    )
  }
}

CachedImage.propTypes = {
  source: PropTypes.string
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100
  }
})

export default CachedImage
