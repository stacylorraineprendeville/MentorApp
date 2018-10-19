import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import colors from '../theme.json'

class Button extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.buttonGreen}
        onPress={this.props.handleClick}
      >
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableOpacity>
    )
  }
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  buttonText: {
    ...Platform.select({
      ios: {
        fontFamily: 'Poppins',
        fontWeight: '600'
      },
      android: {
        fontFamily: 'Poppins SemiBold'
      }
    }),
    fontSize: 18,
    color: colors.white
  },
  buttonGreen: {
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    height: 48
  }
})
export default Button
