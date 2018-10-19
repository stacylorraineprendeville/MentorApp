import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import moment from 'moment'

import colors from '../theme.json'
import globalStyles from '../globalStyles'

class DraftListItem extends Component {
  render() {
    return (
      <TouchableOpacity
        style={{ ...styles.listItem, ...styles.borderBottom }}
        onPress={this.props.handleClick}
      >
        <View>
          <Text style={globalStyles.tag}>
            {moment(this.props.item.created).format('MMM, DD YYYY')}
          </Text>
          <Text style={globalStyles.p}>
            {this.props.item.personal_survey_data.firstName}{' '}
            {this.props.item.personal_survey_data.lastName}
          </Text>
        </View>
        <Icon name="navigate-next" size={23} color={colors.lightdark} />
      </TouchableOpacity>
    )
  }
}

DraftListItem.propTypes = {}

const styles = StyleSheet.create({
  listItem: {
    height: 95,
    padding: 25,
    justifyContent: 'center',
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

export default DraftListItem
