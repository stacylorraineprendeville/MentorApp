import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, StyleSheet } from 'react-native'

class Loading extends Component {
  render() {
    return <Text>Loading</Text>
  }
}

// Loading.propTypes = {
//   source: PropTypes.oneOf(['family', 'surveys'])
// }

const styles = StyleSheet.create({
  image: {
    width: 166,
    height: 166,
    alignSelf: 'center',
    marginBottom: 43
  }
})

export default Loading
