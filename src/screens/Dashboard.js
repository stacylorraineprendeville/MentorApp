import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import Button from '../components/Button'
import globalStyles from '../globalStyles'

export class Dashboard extends Component {
  render() {
    return (
      <ScrollView style={globalStyles.container}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={globalStyles.h3}>Welcome!</Text>
        </View>
        <Button text="Create a lifemap" colored handleClick={() => {}} />
        <Button text="Find a family" icon="search" handleClick={() => {}} />
        <Button text="Add a family" icon="add" handleClick={() => {}} />
      </ScrollView>
    )
  }
}

Dashboard.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default Dashboard
