import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Tip from '../../components/Tip'
import LifemapVisual from '../../components/LifemapVisual'
import Button from '../../components/Button'
import LifemapOverview from '../../components/LifemapOverview'

import globalStyles from '../../globalStyles'
import colors from '../../theme.json'

export class Overview extends Component {
  draftId = this.props.navigation.getParam('draftId')
  survey = this.props.navigation.getParam('survey')
  indicatorsArray = this.survey.surveyStoplightQuestions.map(
    item => item.codeName
  )

  navigateToScreen = (screen, indicator, indicatorText) =>
    this.props.navigation.navigate(screen, {
      draftId: this.draftId,
      survey: this.survey,
      indicator,
      indicatorText
    })

  getMandatoryPrioritiesCount(draft) {
    const potentialPrioritiesCount = draft.indicatorSurveyDataList.filter(
      question => question.value === 1 || question.value === 2
    ).length
    return potentialPrioritiesCount > this.survey.minimumPriorities
      ? this.survey.minimumPriorities
      : potentialPrioritiesCount
  }

  render() {
    const draft = this.props.drafts.filter(
      item => item.draftId === this.draftId
    )[0]
    const mandatoryPrioritiesCount = this.getMandatoryPrioritiesCount(draft)
    return (
      <ScrollView
        style={globalStyles.background}
        contentContainerStyle={styles.contentContainer}
      >
        <View>
          <View
            style={{
              ...globalStyles.container,
              paddingTop: 20
            }}
          >
            <LifemapVisual
              questions={draft.indicatorSurveyDataList}
              priorities={draft.priorities}
              achievements={draft.achievements}
            />
          </View>
          <View>
            <Text style={{ ...globalStyles.subline, ...styles.listTitle }}>
              All indicators
            </Text>
            <LifemapOverview
              surveyData={this.survey.surveyStoplightQuestions}
              draftData={draft}
              navigateToScreen={this.navigateToScreen}
            />
          </View>
        </View>
        <View style={{ height: 50 }}>
          <Button
            colored
            text="Continue"
            handleClick={() => this.navigateToScreen('Final')}
            disabled={mandatoryPrioritiesCount > draft.priorities.length}
          />
        </View>
        {mandatoryPrioritiesCount ? (
          <Tip
            title={'Before the Life Map is completed...'}
            description={`You need to add ${mandatoryPrioritiesCount} ${
              mandatoryPrioritiesCount === 1 ? 'priotity' : 'priorities'
            }`}
          />
        ) : (
          <View />
        )}
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  text: {
    textAlign: 'center'
  },
  listTitle: {
    backgroundColor: colors.beige,
    height: 45,
    lineHeight: 45,
    flex: 1,
    textAlign: 'center'
  }
})

Overview.propTypes = {
  drafts: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired
}

const mapStateToProps = ({ drafts }) => ({
  drafts
})

export default connect(mapStateToProps)(Overview)
