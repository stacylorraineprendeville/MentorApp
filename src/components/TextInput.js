import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'
import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from 'react-native-elements'
import colors from '../theme.json'
import globalStyles from '../globalStyles'

class TextInput extends Component {
  state = {
    status: 'blur',
    text: ''
  }

  onChangeText(text) {
    // this.props.onChangeText(text)
    this.setState({ text })
  }

  onFocus() {
    this.setState({
      status: 'active'
    })
  }

  onBlur() {
    this.setState({
      status: 'blur'
    })
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
    const { status } = this.state
    const showPlaceholder = status === 'blur' && this.state.text === ''
    return (
      <View>
        <FormLabel>{this.props.label}</FormLabel>
        {!showPlaceholder && (
          <Text
            style={{
              color: this.defineTextColor(status),
              marginBottom: -30,
              marginLeft: 25,
              zIndex: 100,
              fontSize: 14
            }}
          >
            {this.props.placeholder}
            {'\n'}
          </Text>
        )}
        <FormInput
          onFocus={() => this.onFocus()}
          onBlur={() => this.onBlur()}
          placeholder={showPlaceholder ? this.props.placeholder : ''}
          onChangeText={text => this.onChangeText(text)}
          inputStyle={{
            ...styles.inputStyle,
            ...styles[this.state.status],
            paddingTop: !showPlaceholder ? 30 : 10
          }}
          multiline
        >
          <Text style={{ fontSize: 16, margin: 10 }}>{this.state.text}</Text>
        </FormInput>
        {this.state.status === 'error' && (
          <FormValidationMessage style={{ color: colors.red }}>
            {this.props.errormsg}
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
  }
})

TextInput.propTypes = {
  label: PropTypes.string,
  errormsg: PropTypes.string.isRequired,
  onTextChange: PropTypes.func.isRequired
}

export default TextInput
