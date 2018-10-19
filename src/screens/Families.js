import React, { Component } from 'react'
import { View, StyleSheet, Button, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

export class Families extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        {this.props.families.map(family => (
          <View key={family.familyId}>
            <Button
              title={family.name}
              onPress={() =>
                this.props.navigation.navigate('Family', {
                  family: family.familyId
                })
              }
            />
          </View>
        ))}
      </ScrollView>
    )
  }
}

Families.propTypes = {
  loadFamilies: PropTypes.func.isRequired,
  env: PropTypes.oneOf(['production', 'demo', 'testing', 'development']),
  navigation: PropTypes.object.isRequired,
  token: PropTypes.object.isRequired,
  families: PropTypes.array
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

const mapStateToProps = ({ families }) => ({
  families
})

export default connect(mapStateToProps)(Families)
