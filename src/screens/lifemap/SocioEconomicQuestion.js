import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, View, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import TextInput from '../../components/TextInput'
import Select from '../../components/Select'
import Button from '../../components/Button'
import globalStyles from '../../globalStyles'

export class SocioEconomicQuestion extends Component {
  state = {
    errorsDetected: []
  }
  constructor(props) {
    super(props)

    this.draft = props.drafts.filter(
      draft => draft.draftId === this.props.navigation.getParam('draftId')
    )[0]

    // If this is the first socio economics screen set the whole process
    // in the navigation. On every next screen it will know which questions
    // to ask and if it is done.
    if (!props.navigation.getParam('socioEconomics')) {
      let currentDimension = ''
      let questionsPerScreen = []
      let totalScreens = 0

      props.navigation
        .getParam('survey')
        .surveyEconomicQuestions.forEach(question => {
          if (question.dimension !== currentDimension) {
            currentDimension = question.dimension
            totalScreens += 1
          }

          if (!questionsPerScreen[totalScreens - 1]) {
            questionsPerScreen[totalScreens - 1] = []
          }

          questionsPerScreen[totalScreens - 1].push(question)
        })

      props.navigation.setParams({
        socioEconomics: {
          currentScreen: 1,
          questionsPerScreen,
          totalScreens
        }
      })
    }
  }

  detectError = (error, field) => {
    if (error && !this.state.errorsDetected.includes(field)) {
      this.setState({ errorsDetected: [...this.state.errorsDetected, field] })
    } else if (!error) {
      this.setState({
        errorsDetected: this.state.errorsDetected.filter(item => item !== field)
      })
    }
  }

  render() {
    const socioEconomics = this.props.navigation.getParam('socioEconomics')
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
          {!!socioEconomics &&
            socioEconomics.questionsPerScreen[
              socioEconomics.currentScreen - 1
            ].map(question =>
              question.answerType === 'select' ? (
                <View key={question.questionText}>
                  {question.forFamilyMember &&
                    parseInt(this.draft.family_data.count_family_members) >
                      1 && (
                      <Text style={styles.memberName}>
                        {this.draft.personal_survey_data.firstName}
                      </Text>
                    )}
                  <Select
                    required={question.required}
                    onChange={() => {}}
                    placeholder={question.questionText}
                    label={question.questionText}
                    field={question.questionText}
                    value={''}
                    detectError={this.detectError}
                    data={question.options}
                  />
                  {question.forFamilyMember &&
                    parseInt(this.draft.family_data.count_family_members) > 1 &&
                    this.draft.family_data.familyMembersList.map(member => (
                      <View key={member.firstName}>
                        <Text style={styles.memberName}>
                          {member.firstName}
                        </Text>
                        <Select
                          required={question.required}
                          onChange={() => {}}
                          placeholder={question.questionText}
                          label={question.questionText}
                          field={question.questionText}
                          value={''}
                          detectError={this.detectError}
                          data={question.options}
                        />
                      </View>
                    ))}
                </View>
              ) : (
                <View key={question.questionText}>
                  {question.forFamilyMember &&
                    parseInt(this.draft.family_data.count_family_members) >
                      1 && (
                      <Text style={styles.memberName}>
                        {this.draft.personal_survey_data.firstName}
                      </Text>
                    )}
                  <TextInput
                    field={question.questionText}
                    onChangeText={() => {}}
                    placeholder={question.questionText}
                    value={''}
                    required={question.required}
                    detectError={this.detectError}
                  />
                  {question.forFamilyMember &&
                    parseInt(this.draft.family_data.count_family_members) > 1 &&
                    this.draft.family_data.familyMembersList.map(member => (
                      <View key={member.firstName}>
                        <Text style={styles.memberName}>
                          {member.firstName}
                        </Text>
                        <TextInput
                          key={question.questionText}
                          field={question.questionText}
                          onChangeText={() => {}}
                          placeholder={question.questionText}
                          value={''}
                          required={question.required}
                          detectError={this.detectError}
                        />
                      </View>
                    ))}
                </View>
              )
            )}
        </View>
        <View style={{ marginTop: 15 }}>
          <Button
            id="continue"
            disabled={!!this.state.errorsDetected.length}
            colored
            text="Continue"
            handleClick={() =>
              socioEconomics.currentScreen === socioEconomics.totalScreens
                ? this.props.navigation.navigate('BeginLifemap', {
                    draftId: this.props.navigation.getParam('draftId'),
                    survey: this.props.navigation.getParam('survey')
                  })
                : this.props.navigation.push('SocioEconomicQuestion', {
                    draftId: this.props.navigation.getParam('draftId'),
                    survey: this.props.navigation.getParam('survey'),
                    socioEconomics: {
                      currentScreen: socioEconomics.currentScreen + 1,
                      questionsPerScreen: socioEconomics.questionsPerScreen,
                      totalScreens: socioEconomics.totalScreens
                    }
                  })
            }
          />
        </View>
      </ScrollView>
    )
  }
}

SocioEconomicQuestion.propTypes = {
  navigation: PropTypes.object.isRequired,
  drafts: PropTypes.array.isRequired
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  memberName: {
    marginHorizontal: 20,
    fontWeight: 'normal',
    marginTop: 23,
    marginBottom: -20,
    fontSize: 16,
    lineHeight: 20
  }
})

const mapDispatchToProps = {}

const mapStateToProps = ({ drafts }) => ({
  drafts
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocioEconomicQuestion)
