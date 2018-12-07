import React, { Component } from 'react'
import { StyleSheet, ScrollView, Image, View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Tip from '../../components/Tip'
import SkippedListItem from '../../components/SkippedListItem'
import Button from '../../components/Button'

import globalStyles from '../../globalStyles'

export class Skipped extends Component {
  draftId = this.props.navigation.getParam('draftId')
  survey = this.props.navigation.getParam('survey')
  indicatorsArray = this.survey.surveyStoplightQuestions.map(
    item => item.codeName
  )

  handleClick = () =>
    this.props.navigation.navigate('Overview', {
      draftId: this.draftId,
      survey: this.survey
    })

  render() {
    const draft = this.props.drafts.filter(
      item => item.draftId === this.draftId
    )[0]

    const skippedQuestions = draft.indicatorSurveyDataList.filter(
      question => question.value === 0
    )
    return (
      <ScrollView
        style={globalStyles.background}
        contentContainerStyle={styles.contentContainer}
      >
        <Image
          style={styles.image}
          source={require('../../../assets/images/skipped.png')}
        />

        <FlatList
          style={{ ...styles.background, paddingLeft: 25 }}
          data={skippedQuestions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <SkippedListItem
              item={
                this.survey.surveyStoplightQuestions.filter(
                  question => question.codeName === item.key
                )[0].questionText
              }
              handleClick={() =>
                this.props.navigation.push('Question', {
                  draftId: this.draftId,
                  survey: this.survey,
                  step: this.indicatorsArray.indexOf(item.key),
                  skipped: true
                })
              }
            />
          )}
        />
        <View style={{ height: 50, marginTop: 20 }}>
          <Button
            colored
            text="Continue"
            handleClick={() => this.handleClick()}
          />
        </View>
        <Tip
          title={'You skipped these indicators'}
          description={'Why not try again to answer these now!'}
        />
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  image: { alignSelf: 'center', marginVertical: 50 },
  contentContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
})

Skipped.propTypes = {
  drafts: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired
}

const mapStateToProps = ({ drafts }) => ({
  drafts
})

export default connect(mapStateToProps)(Skipped)
