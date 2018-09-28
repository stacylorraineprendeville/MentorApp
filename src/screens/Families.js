import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'

import { getItem } from '../utils'
import { loadFamilies } from '../redux/reducer'
import { url } from '../config'

class Families extends Component {
  componentDidMount() {
    getItem('token').then(item =>
      this.props.loadFamilies(url[this.props.env], item)
    )
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

const mapStateToProps = ({ env, families }) => ({
  env,
  families
})

const mapDispatchToProps = {
  loadFamilies
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Families)
