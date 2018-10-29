import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Platform
} from 'react-native'

import colors from '../theme.json'
import globalStyles from '../globalStyles'

class Loading extends Component {
  render() {
    return (
      <View style={styles.view}>
        <Text style={globalStyles.h3}>We are preparing the app …</Text>
        <ActivityIndicator
          size={Platform.OS === 'android' ? 60 : 'large'}
          color={colors.palered}
          style={styles.indicator}
        />

        <Text style={globalStyles.h3}>
          {this.props.time === 'ok' ? 'Yes!' : 'Oops!'}
        </Text>
        <Text style={globalStyles.subline}>
          {this.props.time === 'ok'
            ? 'We will be ready soon.'
            : 'This might take a while...'}
        </Text>
      </View>
    )
  }
}

Loading.propTypes = {
  time: PropTypes.string
}

Loading.defaultProps = {
  time: 'ok'
}

const styles = StyleSheet.create({
  view: {
    marginTop: 120,
    justifyContent: 'center',
    alignItems: 'center'
  },
  indicator: {
    backgroundColor: colors.white,
    borderRadius: 85,
    padding: 55,
    marginTop: 22,
    marginBottom: 45
  }
})

export default Loading
