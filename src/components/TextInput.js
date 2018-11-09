import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'
import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from 'react-native-elements'
import colors from '../theme.json'
import validator from 'validator'
import globalStyles from '../globalStyles'

class TextInput extends Component {
  state = {
    status: 'blur',
    text: '',
    errorMsg: null
  }

  onChangeText(text) {
    this.setState({ text })
    this.props.onChangeText(text)
  }

  onFocus() {
    this.setState({
      status: 'active'
    })
  }

  onBlur() {
    this.validateInput()
  }

  validateInput() {
    this.setState({
      status: 'blur'
    })
    if (this.props.required && validator.isEmpty(this.state.text)) {
      return this.setState({
        status: 'error',
        errorMsg: 'Field is required'
      })
    }

    if (
      this.props.validation === 'email' &&
      !validator.isEmail(this.state.text) &&
      !validator.isEmpty(this.state.text)
    ) {
      return this.setState({
        status: 'error',
        errorMsg: 'Invalid email'
      })
    }

    if (
      this.props.validation === 'string' &&
      !validator.isAlpha(this.state.text) &&
      !validator.isEmpty(this.state.text)
    ) {
      return this.setState({
        status: 'error',
        errorMsg: 'Invalid value'
      })
    }
    if (
      this.props.validation === 'phone' &&
      !validator.isMobilePhone(this.state.text) &&
      !validator.isEmpty(this.state.text)
    ) {
      return this.setState({
        status: 'error',
        errorMsg: 'Invalid phone number'
      })
    }
    if (
      this.props.validation === 'number' &&
      !validator.isNumeric(this.state.text) &&
      !validator.isEmpty(this.state.text)
    ) {
      return this.setState({
        status: 'error',
        errorMsg: 'Invalid number'
      })
    }
  }

  defineTextColor = status => {
    switch (status) {
      case 'active':
        return colors.green
      case 'blur':
        return colors.palegrey
      case 'error':
        return colors.red
      default:
        return colors.palegrey
    }
  }

  render() {
    const { status, text, errorMsg } = this.state
    let showPlaceholder = status === 'blur' && text === ''
    return (
      <View>
        <FormLabel>{this.props.label}</FormLabel>
        {!showPlaceholder && (
          <Text
            style={{
              ...styles.text,
              color: this.defineTextColor(status)
            }}
          >
            {this.props.placeholder}
            {'\n'}
          </Text>
        )}
        <FormInput
          autoCapitalize="none"
          onFocus={() => this.onFocus()}
          onBlur={() => this.onBlur(text)}
          placeholder={
            showPlaceholder
              ? `${this.props.placeholder} ${
                  !this.props.required ? ' - Optional' : ''
                }`
              : ''
          }
          onChangeText={text => this.onChangeText(text)}
          inputStyle={{
            ...styles.inputStyle,
            ...styles[status],
            paddingTop: !showPlaceholder ? 30 : 10
          }}
          multiline
        >
          <Text style={{ fontSize: 16, margin: 10 }}>{text}</Text>
        </FormInput>
        {status === 'error' && (
          <FormValidationMessage style={{ color: colors.red }}>
            {errorMsg}
          </FormValidationMessage>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    color: colors.grey,
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    height: 60,
    width: '100%'
  },
  blur: {
    backgroundColor: colors.beige,
    borderBottomColor: colors.grey
  },
  active: {
    backgroundColor: colors.white,
    borderBottomColor: colors.green
  },
  error: {
    backgroundColor: colors.white,
    borderBottomColor: colors.red
  },
  text: {
    marginBottom: -30,
    marginLeft: 25,
    zIndex: 100,
    fontSize: 14
  }
})

TextInput.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  onChangeText: PropTypes.func.isRequired,
  validation: PropTypes.oneOf(['email', 'string', 'phone', 'number'])
}

export default TextInput
