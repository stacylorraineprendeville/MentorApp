import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image, StyleSheet } from 'react-native'

const images = {
  family: require('../../assets/images/family.png'),
  surveys: require('../../assets/images/surveys.png'),
  stoplight: require('../../assets/images/stoplight.png'),
  partner: require('../../assets/images/partner.png')
}

class RoundImage extends Component {
  render() {
    return <Image style={styles.image} source={images[this.props.source]} />
  }
}

RoundImage.propTypes = {
  source: PropTypes.oneOf(['family', 'surveys', 'stoplight', 'partner'])
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
