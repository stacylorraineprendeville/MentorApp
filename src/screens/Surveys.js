import React, { Component } from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'
import { connect } from 'react-redux'

import { loadSurveys } from '../redux/actions'
import { url } from '../config'

class Surveys extends Component {
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
            onPress={e =>
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
