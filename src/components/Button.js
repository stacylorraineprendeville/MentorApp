import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import colors from '../theme.json'

class Button extends Component {
  render() {
    return (
      <TouchableOpacity
        style={
          this.props.colored
            ? { ...styles.buttonStyle, ...styles.colored }
            : styles.buttonStyle
        }
        onPress={this.props.handleClick}
      >
        {this.props.icon && (
          <Icon
            name={this.props.icon}
            size={21}
            color={colors.green}
            style={styles.icon}
          />
        )}
        <Text
          style={
            this.props.colored
              ? { ...styles.buttonText, ...styles.whiteText }
              : { ...styles.buttonText, ...styles.greenText }
          }
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
  icon: PropTypes.string
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
  colored: {
    backgroundColor: colors.palegreen
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
