import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Picker, StyleSheet, View, Text } from 'react-native'
import { FormValidationMessage } from 'react-native-elements'
import colors from '../theme.json'
import globalStyles from '../globalStyles'
import countries from 'localized-countries'

const countryList = countries(require('localized-countries/data/en'))

class Select extends Component {
  state = {
    status: 'edited',
    errorMsg: null
  }
  handleError(errorMsg) {
    this.props.detectError(true, this.props.field)
    this.setState({
      errorMsg
    })
  }

  validateInput = value => {
    this.props.onChange(value)

    if (this.props.required && !value) {
      this.handleError('This field is required')
    } else {
      this.setState({
        status: 'edited',
        errorMsg: null
      })
      this.props.detectError(false, this.props.field)
    }
  }

  render() {
    const { errorMsg } = this.state
    return (
      <View>
        <View style={styles.container}>
          <Text style={globalStyles.subline}>{this.props.label}</Text>
          <Picker
            id="country-select"
            prompt="Select a country"
            style={styles.dropdown}
            onValueChange={value => this.validateInput(value)}
            selectedValue={this.props.value}
          >
            <Picker.Item label={this.props.placeholder} value={''} />
            {this.props.countrySelect
              ? countryList
                  .array()
                  .map(country => (
                    <Picker.Item
                      key={country.code}
                      label={country.label}
                      value={country.code}
                    />
                  ))
              : this.props.data.map(item => (
                  <Picker.Item
                    key={item.value}
                    label={item.label}
                    value={item.value}
                  />
                ))}
          </Picker>
        </View>
        {!!errorMsg && (
          <FormValidationMessage style={{ color: colors.red }}>
            {errorMsg}
          </FormValidationMessage>
        )}
      </View>
    )
  }
}

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  data: PropTypes.array,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  field: PropTypes.string,
  countrySelect: PropTypes.bool,
  required: PropTypes.bool,
  detectError: PropTypes.func
}

export default Select

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.palegrey
  },
  dropdown: {
    height: 60,
    marginBottom: -20
  }
})
