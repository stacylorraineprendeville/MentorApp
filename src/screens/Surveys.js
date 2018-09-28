import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'

import { loadSurveys } from '../redux/reducer'
import { url } from '../config'

class Surveys extends Component {
  componentDidMount() {
    this.props.loadSurveys(url[this.props.env], this.props.token.token)
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

const mapStateToProps = ({ env, surveys, token }) => ({
  env,
  token,
  surveys
})

const mapDispatchToProps = {
  loadSurveys
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Surveys)
