import React, { Component } from 'react'
import {
  Image,
  Platform,
  NetInfo,
  View,
  ActivityIndicator,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'
import RNFetchBlob from 'rn-fetch-blob'

let dirs = RNFetchBlob.fs.dirs

export class CachedImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      source: false
    }
  }
  getProperSourceForOS(source) {
    return Platform.OS === 'android' ? 'file://' + source : '' + source
  }
  checkIfCached() {
    const { source } = this.props

    RNFetchBlob.fs
      .exists(`${dirs.DocumentDir}/${source.replace(/https?:\/\//, '')}`)
      .then(exist => {
        if (exist) {
          this.setState({
            source: this.getProperSourceForOS(
              `${dirs.DocumentDir}/${source.replace(/https?:\/\//, '')}`
            )
          })
        }
      })
  }
  updateSource(online) {
    if (online) {
      this.setState({
        source: this.props.source
      })
    } else {
      this.checkIfCached()
    }
  }
  componentDidMount() {
    // check if connected on mount
    NetInfo.isConnected.fetch().then(async online => {
      this.updateSource(online)
    })

    // add event on net change
    NetInfo.addEventListener('connectionChange', online => {
      this.updateSource(online)
    })
  }
  render() {
    const { source } = this.state
    const { style } = this.props

    return source ? (
      <Image style={style} source={{ uri: source }} resizeMode="cover" />
    ) : (
      <View style={[styles.placeholder, style]}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

CachedImage.propTypes = {
  source: PropTypes.string,
  style: PropTypes.object
}

const styles = StyleSheet.create({
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default CachedImage
