import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

import colors from '../theme.json'
import globalStyles from '../globalStyles'

class LifemapOverviewListItem extends Component {
  defineColor = value => {
    switch (value) {
      case 1:
        return colors.red
      case 2:
        return colors.gold
      case 3:
        return colors.green
      case 0:
        return colors.palegrey

      default:
        return colors.palegrey
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.handleClick}
        style={styles.container}
      >
        <Icon
          name="brightness-1"
          color={this.defineColor(this.props.color)}
          size={40}
          style={{ marginRight: 10 }}
        />
        <View style={[styles.listItem, styles.borderBottom]}>
          <Text style={{ ...globalStyles.p }}>{this.props.name}</Text>
          <Icon name="navigate-next" size={23} color={colors.lightdark} />
        </View>
      </TouchableOpacity>
    )
  }
}

LifemapOverviewListItem.propTypes = {
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  color: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },
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
