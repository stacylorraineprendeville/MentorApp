import React, { Component } from 'react'

import { Image, StyleSheet } from 'react-native'

class RoundImage extends Component {
  render() {
    return <Image style={styles.image} source={this.props.source} />
  }
}

const styles = StyleSheet.create({
  image: {
    width: 166,
    height: 166,
    alignSelf: 'center',
    marginBottom: 43
  }
})

export default RoundImage
