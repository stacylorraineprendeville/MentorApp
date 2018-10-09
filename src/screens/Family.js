import React, { Component } from 'react'
import { View, StyleSheet, Text, Button, ScrollView } from 'react-native'
import { connect } from 'react-redux'

import { loadSnapshots } from '../redux/actions'
import { url } from '../config'

class Family extends Component {
  componentDidMount() {
    this.props.loadSnapshots(url[this.props.env], this.props.token.token)
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        {this.props.snapshots
          .filter(
            snapshot =>
              snapshot.family.familyId ===
              this.props.navigation.getParam('family')
          )
          .map(item => (
            <View key={item.created_at}>
              <Text>{item.created_at}</Text>
            </View>
          ))}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

const mapStateToProps = ({ env, snapshots, token }) => ({
  env,
  snapshots,
  token
})

const mapDispatchToProps = {
  loadSnapshots
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Family)
