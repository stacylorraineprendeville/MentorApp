import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { getItem } from '../utils'
import { connect } from 'react-redux'
import { loadSurveys } from '../redux/reducer'

import { url } from '../config'

class Surveys extends Component {
  componentDidMount() {
    getItem('token').then(item =>
      this.props.loadSurveys(url[this.props.env], item)
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Surveys go here!</Text>
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

const mapStateToProps = ({ env, surveys }) => ({
  env,
  surveys
})

const mapDispatchToProps = {
  loadSurveys
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Surveys)
