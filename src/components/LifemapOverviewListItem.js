import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

import colors from '../theme.json'
import globalStyles from '../globalStyles'
import stoplight from '../../assets/images/stoplight.png'

class LifemapOverviewListItem extends Component {
  render() {
    return (
      <TouchableOpacity
        style={[styles.listItem, styles.borderBottom]}
        onPress={this.props.handleClick}
      >
        <Text style={{ ...globalStyles.p, ...styles.p }}>
          {this.props.name}
        </Text>
        <Icon name="navigate-next" size={23} color={colors.lightdark} />
      </TouchableOpacity>
    )
  }
}

LifemapOverviewListItem.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  listItem: {
    height: 95,
    paddingTop: 25,
    paddingBottom: 25,
    paddingRight: 25,
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between'
  },
  borderBottom: {
    borderBottomColor: colors.lightgrey,
    borderBottomWidth: 1
  }
})

export default LifemapOverviewListItem
