import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image, StyleSheet, View } from 'react-native'
const family = require('../../assets/images/family.png')
const surveys = require('../../assets/images/surveys.png')

class RoundImage extends Component {
  getSource = () => {
    switch (this.props.source) {
      case 'family':
        return family
        break
      case 'surveys':
        return surveys
        break
      default:
        return ''
    }
  }
  render() {
    const source = this.getSource()
    return (
      <View>
        <Image style={styles.image} source={source} />
      </View>
    )
  }
}

RoundImage.propTypes = {
  source: PropTypes.oneOf(['family', 'surveys'])
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
