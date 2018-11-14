import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Picker, StyleSheet, View, Text } from 'react-native'
import colors from '../theme.json'
import globalStyles from '../globalStyles'
import countries from 'localized-countries'

const countryList = countries(require('localized-countries/data/en'))

class CountrySelect extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={globalStyles.subline}>Country*</Text>
        <Picker
          id="country-select"
          prompt="Select a country"
          style={styles.dropdown}
          onValueChange={value => this.props.onChange(value)}
        >
          {countryList
            .array()
            .map(country => (
              <Picker.Item
                key={country.code}
                label={country.label}
                value={country.code}
              />
            ))}
        </Picker>
      </View>
    )
  }
}

CountrySelect.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default CountrySelect

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
