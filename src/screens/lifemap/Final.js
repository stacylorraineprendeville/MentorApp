import React, { Component } from 'react'
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  FlatList,
  Text
} from 'react-native'
import { Divider } from 'react-native-elements'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Tip from '../../components/Tip'
import SkippedListItem from '../../components/SkippedListItem'

import RoundImage from '../../components/RoundImage'
import LifemapVisual from '../../components/LifemapVisual'
import Button from '../../components/Button'

import globalStyles from '../../globalStyles'
import colors from '../../theme.json'

export class Final extends Component {
  state = {
    checkedBoxes: []
  }
  getSkippedQuestions = () => {
    const answers = this.draft.indicator_survey_data
    return Object.keys(answers).filter(key => answers[key] == 0)
  }

  draft_id = this.props.navigation.getParam('draft_id')
  draft = this.props.drafts.filter(item => item.draft_id === this.draft_id)[0]
  survey = this.props.navigation.getParam('survey')
  indicatorsArray = this.survey.surveyStoplightQuestions.map(
    item => item.questionText
  )

  toggleCheckbox = question => {
    if (this.state.checkedBoxes.includes(question)) {
      this.setState({
        checkedBoxes: this.state.checkedBoxes.filter(item => item !== question)
      })
    } else
      this.setState({
        checkedBoxes: [...this.state.checkedBoxes, question]
      })
  }

  render() {
    const skippedQuestions = this.getSkippedQuestions()
    // console.log(skippedQuestions)
    // console.log(this.draft.indicator_survey_data)
    return (
      <ScrollView
        style={globalStyles.background}
        contentContainerStyle={styles.contentContainer}
      >
        {skippedQuestions.length > 0 &&
        skippedQuestions.length !== this.state.checkedBoxes.length ? (
          <View>
            <View style={globalStyles.container}>
              <Image
                style={styles.image}
                source={require('../../../assets/images/skipped.png')}
              />
            </View>
            <Divider style={{ backgroundColor: colors.lightgrey }} />
            <FlatList
              style={{ ...styles.background, paddingLeft: 25 }}
              data={skippedQuestions}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, i }) => (
                <SkippedListItem
                  item={item}
                  onIconPress={() => this.toggleCheckbox(item)}
                  handleClick={() =>
                    this.props.navigation.push('Question', {
                      draft_id: this.draft_id,
                      survey: this.survey,
                      step: this.indicatorsArray.indexOf(item),
                      skipped: true
                    })
                  }
                />
              )}
            />
            <Tip
              title={'You skipped the following questions'}
              description={'Click on the question to answer it now!'}
            />
          </View>
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
              <Text style={{ ...globalStyles.h1, ...styles.text }}>Great!</Text>
              <Text
                style={{
                  ...globalStyles.h3,
                  ...styles.text,
                  paddingBottom: 30
                }}
              >
                You have completed the lifemap
              </Text>
              <RoundImage source="partner" />
              <LifemapVisual data={this.draft.indicator_survey_data} />
            </View>
            <View style={{ height: 50 }}>
              <Button
                colored
                text="Close"
                handleClick={() => this.props.navigation.navigate('Dashboard')}
              />
            </View>
          </ScrollView>
        )}
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  image: { alignSelf: 'center' },
  contentContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  text: {
    textAlign: 'center'
  }
})

Final.propTypes = {
  drafts: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired
}

const mapStateToProps = ({ drafts }) => ({
  drafts
})

export default connect(mapStateToProps)(Final)
