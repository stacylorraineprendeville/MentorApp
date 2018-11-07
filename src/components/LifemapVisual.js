import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image, StyleSheet } from 'react-native'

class LifemapVisual extends Component {
  render() {
    return <Image style={styles.image} source={images[this.props.source]} />
  }
}

LifemapVisual.propTypes = {
  data: PropTypes.array.isRequired
}

const styles = StyleSheet.create({})

export default LifemapVisual
