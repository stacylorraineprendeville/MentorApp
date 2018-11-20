import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import colors from '../theme.json'

class Button extends Component {
  defineButtonStyle() {
    if (this.props.disabled) {
      return styles.disabled
    }
    if (this.props.colored) {
      return styles.colored
    }
    return styles.transparent
  }

  render() {
    return (
      <TouchableOpacity
        style={{ ...styles.buttonStyle, ...this.defineButtonStyle() }}
        onPress={this.props.handleClick}
        disabled={this.props.disabled}
      >
        {this.props.icon && (
          <Icon
            name={this.props.icon}
            size={21}
            color={colors.palegreen}
            style={styles.icon}
          />
        )}
        <Text
          style={{
            ...styles.buttonText,
            ...(this.props.colored ? styles.whiteText : styles.greenText),
            ...(this.props.underlined ? styles.underlined : {})
          }}
        >
          {this.props.text}
        </Text>
      </TouchableOpacity>
    )
  }
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  colored: PropTypes.bool,
  underlined: PropTypes.bool,
  icon: PropTypes.string,
  disabled: PropTypes.bool
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
    })
  },
  buttonStyle: {
    borderRadius: 2,
    height: 48,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  underlined: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: colors.palegreen
  },
  colored: {
    backgroundColor: colors.palegreen
  },
  transparent: {
    backgroundColor: colors.palebeige
  },
  disabled: {
    backgroundColor: colors.palegrey
  },
  greenText: {
    color: colors.palegreen,
    fontSize: 14
  },
  whiteText: {
    color: colors.white,
    fontSize: 18
  },
  icon: {
    marginBottom: 4
  }
})

export default Button
