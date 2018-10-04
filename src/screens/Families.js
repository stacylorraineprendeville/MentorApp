import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'

import { loadFamilies } from '../redux/actions'
import { url } from '../config'

class Families extends Component {
  componentDidMount() {
    this.props.loadFamilies(url[this.props.env], this.props.token.token)
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Families go here!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const mapStateToProps = ({ env, families, token, drafts }) => ({
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
