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

class TextInput extends Component {
  state = {
    status: 'blur',
    text: this.props.value,
    errorMsg: null
  }

  onChangeText(text) {
    this.setState({ text })
    this.props.onChangeText(text, this.props.field)
  }

  onFocus() {
    this.setState({
      status: 'active'
    })
  }

  onBlur() {
    this.validateInput()
  }

  handleError(errorMsg) {
    this.props.detectError(true, this.props.field)
    this.setState({
      status: 'error',
      errorMsg
    })
  }

  validateInput() {
    const year = new Date().getFullYear()
    this.setState({
      status: this.state.text ? 'filled' : 'blur'
    })
    this.props.detectError(false, this.props.field)
    if (this.props.required && !this.state.text) {
      return this.handleError('This field is required')
    }
    if (this.state.text.length > 50) {
      return this.handleError('Please enter a valid value')
    }
    if (
      this.props.validation === 'email' &&
      !validator.isEmail(this.state.text) &&
      !validator.isEmpty(this.state.text)
    ) {
      return this.handleError('Please enter a valid email address')
    }

    if (
      this.props.validation === 'string' &&
      !validator.isAlpha(this.state.text) &&
      !validator.isEmpty(this.state.text)
    ) {
      return this.handleError('Please enter alphabetic characters')
    }
    if (
      this.props.validation === 'phone' &&
      !validator.isMobilePhone(this.state.text) &&
      !validator.isEmpty(this.state.text)
    ) {
      return this.handleError('Please enter a valid phone number')
    }
    if (
      this.props.validation === 'number' &&
      !validator.isNumeric(this.state.text) &&
      !validator.isEmpty(this.state.text)
    ) {
      return this.handleError('Please enter a valid number')
    }
    if (
      this.props.validation === 'day' &&
      !validator.isInt(this.state.text, { min: 1, max: 31 }) &&
      !validator.isEmpty(this.state.text)
    ) {
      return this.handleError('Please enter a valid day')
    }
    if (
      this.props.validation === 'year' &&
      !validator.isInt(this.state.text, {
        min: 1900,
        max: year
      }) &&
      !validator.isEmpty(this.state.text)
    ) {
      return this.handleError('Please enter a valid year')
    }
  }

  defineTextColor = status => {
    switch (status) {
      case 'active':
        return colors.green
      case 'blur':
        return colors.palegrey
      case 'filled':
        return colors.palegrey
      case 'error':
        return colors.red
      default:
        return colors.palegrey
    }
  }

  render() {
    console.log(new Date().getFullYear())
    const { status, text, errorMsg } = this.state
    let showPlaceholder = status === 'blur' && !text
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
              ? `${this.props.placeholder} ${this.props.required ? '*' : ''}`
              : ''
          }
          onChangeText={text => this.onChangeText(text)}
          inputStyle={{
            ...styles.inputStyle,
            ...styles[status],
            paddingTop: !showPlaceholder ? 30 : 10,
            backgroundColor:
              status === 'blur' && text ? colors.palebeige : colors.beige
          }}
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
  filled: {
    backgroundColor: colors.palebeige,
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
  value: PropTypes.string,
  placeholder: PropTypes.string,
  field: PropTypes.string.isRequired,
  required: PropTypes.bool,
  onChangeText: PropTypes.func.isRequired,
  validation: PropTypes.oneOf([
    'email',
    'string',
    'phone',
    'number',
    'day',
    'year'
  ]),
  detectError: PropTypes.func,
  active: PropTypes.bool
}

export default TextInput
