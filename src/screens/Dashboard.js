import React, { Component } from 'react'
import { ScrollView, Text } from 'react-native'
import PropTypes from 'prop-types'

import globalStyles from '../globalStyles'

export class Dashboard extends Component {
  render() {
    return (
      <ScrollView style={globalStyles.container}>
        <Text> Dashboard</Text>
      </ScrollView>
    )
  }
}

Dashboard.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default Dashboard
