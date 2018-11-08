import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from 'react-native-elements'
import colors from '../theme.json'
import globalStyles from '../globalStyles'

class TextInput extends Component {
  render() {
    return (
      <View>
        <FormLabel>{this.props.label}</FormLabel>
        <FormInput onChangeText={() => this.props.onChangeText()} />
        <FormValidationMessage>{this.props.errormsg}</FormValidationMessage>
      </View>
    )
  }
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  errormsg: PropTypes.string.isRequired,
  onTextChange: PropTypes.func.isRequired
}

export default TextInput
