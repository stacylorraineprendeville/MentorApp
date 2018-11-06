import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import moment from 'moment'

import colors from '../theme.json'
import globalStyles from '../globalStyles'
import Checkbox from './Checkbox.js'

class SkippedListItem extends Component {
  render() {
    return (
      <TouchableOpacity
        style={{ ...styles.listItem, ...styles.borderBottom }}
        onPress={this.props.handleClick}
      >
        <View>
          <Text style={{ ...globalStyles.p, ...styles.text }}>
            {this.props.item}
          </Text>
          <Checkbox
            onIconPress={() => this.props.onIconPress()}
            title="Skip this question"
          />
        </View>
        <Icon name="navigate-next" size={23} color={colors.lightdark} />
      </TouchableOpacity>
    )
  }
}

SkippedListItem.propTypes = {
  item: PropTypes.string.isRequired,
  onIconPress: PropTypes.func.isRequired,
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
  text: {
    marginBottom: 20,
    width: '80%'
  }
})

export default SkippedListItem
