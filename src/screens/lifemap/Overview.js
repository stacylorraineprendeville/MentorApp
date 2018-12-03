import React, { Component } from 'react'
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  FlatList,
  Text
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Tip from '../../components/Tip'
import SkippedListItem from '../../components/SkippedListItem'

import RoundImage from '../../components/RoundImage'
import LifemapVisual from '../../components/LifemapVisual'
import Button from '../../components/Button'

import globalStyles from '../../globalStyles'
import colors from '../../theme.json'

export class Overview extends Component {
  state = {
    continueIsClicked: false
  }

  draftId = this.props.navigation.getParam('draftId')

  survey = this.props.navigation.getParam('survey')
  indicatorsArray = this.survey.surveyStoplightQuestions.map(
    item => item.questionText
  )

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
        {skippedQuestions.length > 0 && !this.state.continueIsClicked ? (
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
                  item={item.key}
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
                handleClick={() => this.setState({ continueIsClicked: true })}
              />
            </View>
            <Tip
              title={'You skipped these indicators'}
              description={'Why not try again to answer these now!'}
            />
          </ScrollView>
        ) : (
          <ScrollView
            style={globalStyles.background}
            contentContainerStyle={styles.contentContainer}
          >
            <View
              style={{
                ...globalStyles.container
              }}
            >
              <LifemapVisual data={draft.indicatorSurveyDataList} />
            </View>
            <View style={{ height: 50 }}>
              <Button
                colored
                text="Continue"
                handleClick={() =>
                  this.props.navigation.navigate('Final', {
                    draftId: this.draftId,
                    survey: this.survey
                  })
                }
              />
            </View>
          </ScrollView>
        )}
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
  },
  text: {
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
