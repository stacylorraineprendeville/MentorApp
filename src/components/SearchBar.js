import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TextInput, StyleSheet, View } from 'react-native'
import colors from '../theme.json'

const SearchBar = ({ style, onChangeText, value }) => (
  <View style={[style, styles.search]}>
    <Icon name="search" size={24} />
    <TextInput
      style={styles.input}
      placeholder="Search by street or postal code"
      onChangeText={text => onChangeText(text)}
      onEndEditing={text => console.log(text)}
      value={value}
    />
  </View>
)

SearchBar.propTypes = {
  style: PropTypes.object,
  onChangeText: PropTypes.func,
  value: PropTypes.string
}

export default SearchBar

const styles = StyleSheet.create({
  search: {
    alignItems: 'center',
    paddingHorizontal: 15.5,
    flexDirection: 'row',
    height: 49,
    backgroundColor: '#fff',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: colors.lightgrey
  },
  input: {
    marginLeft: 18,
    fontFamily: 'Roboto',
    fontSize: 16,
    lineHeight: 21,
    color: colors.lightdark
  }
})
