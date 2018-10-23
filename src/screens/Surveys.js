import React, { Component } from 'react'
import { View, StyleSheet, Button } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

export class Surveys extends Component {
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
  surveys: PropTypes.array,
  navigation: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const mapStateToProps = ({ surveys }) => ({
  surveys
})

export default connect(mapStateToProps)(Surveys)
