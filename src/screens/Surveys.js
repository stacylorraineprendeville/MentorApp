import React, { Component } from 'react'
import { View, StyleSheet, Button } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { loadSurveys } from '../redux/actions'
import { url } from '../config'

export class Surveys extends Component {
  componentDidMount() {
    this.props.loadSurveys(url[this.props.env], this.props.token.token)
  }
  render() {
    return (
      <View style={styles.container}>
        {this.props.surveys.map(survey => (
          <Button
            key={survey.id}
            title={survey.title}
            onPress={() =>
              this.props.navigation.navigate('Draft', {
                survey: this.props.surveys.filter(
                  item => survey.title === item.title
                )[0].id
              })
            }
          />
        ))}
      </View>
    )
  }
}

Surveys.propTypes = {
  loadSurveys: PropTypes.func.isRequired,
  surveys: PropTypes.array,
  env: PropTypes.oneOf(['production', 'demo', 'testing', 'development']),
  navigation: PropTypes.object.isRequired,
  token: PropTypes.object.isRequired
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
