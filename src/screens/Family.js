import React, { Component } from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

export class Family extends Component {
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

Family.propTypes = {
  navigation: PropTypes.object.isRequired,
  snapshots: PropTypes.array
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

const mapStateToProps = ({ snapshots }) => ({
  snapshots
})

export default connect(mapStateToProps)(Family)
