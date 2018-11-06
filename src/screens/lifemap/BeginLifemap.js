import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import globalStyles from '../../globalStyles'
import RoundImage from '../../components/RoundImage'
import Button from '../../components/Button'

export class BeginLifemap extends Component {
  numberOfQuestions = this.props.navigation.getParam('survey')[
    'survey_ui_schema'
  ]['ui:group:indicators'].length
  survey = this.props.navigation.getParam('survey')
  render() {
    return (
      <ScrollView
        style={globalStyles.background}
        contentContainerStyle={styles.contentContainer}
      >
        <View
          style={{
            ...globalStyles.container,
            padding: 0
          }}
        >
          <Text style={{ ...globalStyles.h3, ...styles.text }}>
            This life map has {this.numberOfQuestions} questions. It will take
            apporximately 35 minutes to complete!
          </Text>
          <RoundImage source="stoplight" />
        </View>
        <View style={{ height: 50 }}>
          <Button
            colored
            text="Continue"
            handleClick={() =>
              this.props.navigation.navigate('Question', {
                draft_id: this.props.navigation.getParam('draft_id'),
                survey: this.props.navigation.getParam('survey'),
                step: 0
              })
            }
          />
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
    paddingBottom: 30
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
