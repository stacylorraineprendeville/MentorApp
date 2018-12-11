import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Picker, StyleSheet, View, Text } from 'react-native'
import { FormValidationMessage } from 'react-native-elements'
import countries from 'localized-countries'

import colors from '../theme.json'
import globalStyles from '../globalStyles'
import i18n from '../i18n'

const countryList = countries(require('localized-countries/data/en'))

class Select extends Component {
  state = {
    status: 'edited',
    errorMsg: null
  }
  handleError(errorMsg) {
    this.props.detectError(true, this.props.field)
    this.props.onChange('', this.props.field)
    this.setState({
      errorMsg
    })
  }

  validateInput = value => {
    if (this.props.required && !value) {
      this.handleError(i18n.t('validation.fieldIsRequired'))
    } else {
      this.props.onChange(value, this.props.field)
      this.setState({
        status: 'edited',
        errorMsg: null
      })
      this.props.field ? this.props.detectError(false, this.props.field) : ''
    }
  }

  componentDidMount() {
    // on mount validate empty required fields without showing an errors message
    if (this.props.required && !this.props.value) {
      this.props.detectError(true, this.props.field)
    }
  }

  render() {
    const { errorMsg } = this.state
    const { value, placeholder, required } = this.props
    return (
      <View style={[styles.container, !value && styles.withValue]}>
        <Text style={styles.placeholder}>
          {value || `${placeholder} ${required ? '*' : ''}`}
        </Text>
      </View>
    )
  }
}

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  placeholder: PropTypes.string.isRequired,
  field: PropTypes.string,
  countrySelect: PropTypes.bool,
  required: PropTypes.bool,
  detectError: PropTypes.func
}

export default Select

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    marginHorizontal: 15,
    marginBottom: 15,
    justifyContent: 'center',
    minHeight: 60
  },
  placeholder: {
    paddingHorizontal: 15,
    ...globalStyles.subline
  },
  withValue: {
    backgroundColor: colors.beige,
    borderBottomColor: colors.grey
  }
})
