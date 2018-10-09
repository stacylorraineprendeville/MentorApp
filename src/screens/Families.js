import React, { Component } from 'react'
import { View, StyleSheet, Text, Button, ScrollView } from 'react-native'
import { connect } from 'react-redux'

import { loadFamilies } from '../redux/actions'
import { url } from '../config'

class Families extends Component {
  componentDidMount() {
    this.props.loadFamilies(url[this.props.env], this.props.token.token)
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        {this.props.families.map(family => (
          <View key={family.familyId}>
            <Button
              title={family.name}
              onPress={e =>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

const mapStateToProps = ({ env, families, token }) => ({
  env,
  families,
  token
})

const mapDispatchToProps = {
  loadFamilies
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Families)
