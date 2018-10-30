import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import globalStyles from '../../globalStyles'
import RoundImage from '../../components/RoundImage'
import Button from '../../components/Button'
import colors from '../../theme.json'

export class BeginLifemap extends Component {
  numberOfQuestions = this.props.surveys.filter(
    survey => survey.id === this.props.navigation.getParam('survey')
  )[0]['survey_ui_schema']['ui:group:indicators'].length

  render() {
    return (
      <ScrollView
        style={{
          ...globalStyles.container,
          padding: 0
        }}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={{ ...globalStyles.h3, ...styles.text }}>
          This life map has {this.numberOfQuestions} questions. It will take
          apporximately 35 minutes to complete!
        </Text>
        <RoundImage source="stoplight" style={{ marginTop: -100 }} />
        <View style={{ height: 50 }}>
          <Button colored text="Continue" handleClick={() => {}} />
        </View>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 80,
    marginBottom: -110
  },
  contentContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
})

BeginLifemap.propTypes = {
  surveys: PropTypes.array,
  navigation: PropTypes.object.isRequired
}

const mapStateToProps = ({ surveys }) => ({
  surveys
})

export default connect(mapStateToProps)(BeginLifemap)
