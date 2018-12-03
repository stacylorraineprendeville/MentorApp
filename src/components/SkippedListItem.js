import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

import colors from '../theme.json'
import globalStyles from '../globalStyles'

class SkippedListItem extends Component {
  render() {
    return (
      <TouchableOpacity
        style={{ ...styles.listItem, ...styles.borderBottom }}
        onPress={this.props.handleClick}
      >
        <Text style={{ ...globalStyles.p, ...styles.text }}>
          {this.props.item}
        </Text>
        <Icon name="navigate-next" size={23} color={colors.lightdark} />
      </TouchableOpacity>
    )
  }
}

SkippedListItem.propTypes = {
  item: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  listItem: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 25,
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between'
  },
  borderBottom: {
    borderBottomColor: colors.lightgrey,
    borderBottomWidth: 1
  },
  text: { width: '80%' }
})

export default SkippedListItem
