import React, { Component } from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Picker,
  Button
} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import uuid from 'uuid/v1'

import { createDraft, addSurveyData, submitDraft } from '../redux/actions'
import { url } from '../config'

export class Draft extends Component {
  //Get draft id from Redux store if it exists else create new draft id

  draft_id = this.props.navigation.getParam('draft') || uuid()

  //Get survey if from draft if it exists else from navigation route
  survey_id =
    (
      this.props.drafts.filter(draft => draft.draft_id === this.draft_id)[0] ||
      {}
    ).survey_id || this.props.navigation.getParam('survey')

  //Get survey by id
  survey = this.props.surveys.filter(survey => survey.id === this.survey_id)[0]

  //Parse survey schema to different question categories
  orderedQuestions = this.survey['survey_ui_schema']['ui:order']
  questionProperties = this.survey['survey_schema']['properties']
  personalData = this.survey['survey_ui_schema']['ui:group:personal']
  economicsData = this.survey['survey_ui_schema']['ui:group:economics']
  indicatorsData = this.survey['survey_ui_schema']['ui:group:indicators']

  componentDidMount() {
    //Get draft  from Redux store if it exists else create new draft
    if (!this.props.navigation.getParam('draft')) {
      this.props.createDraft({
        survey_id: this.survey.id,
        survey_version_id: this.survey['survey_version_id'],
        draft_id: this.draft_id,
        personal_survey_data: {},
        economic_survey_data: {},
        indicator_survey_data: {}
      })
    }
  }

  getDraftItem = key => {
    const draft = this.props.drafts.filter(
      draft => draft.draft_id === this.draft_id
    )[0]
    if (draft) {
      if (this.personalData.includes(key)) {
        return draft.personal_survey_data[key]
      } else if (this.economicsData.includes(key)) {
        return draft.economic_survey_data[key]
      } else if (this.indicatorsData.includes(key)) {
        return draft.indicator_survey_data[key]
      }
    }
  }

  storeDraftItem = (key, value) => {
    let category
    if (this.personalData.includes(key)) {
      category = 'personal_survey_data'
    } else if (this.economicsData.includes(key)) {
      category = 'economic_survey_data'
    } else if (this.indicatorsData.includes(key)) {
      category = 'indicator_survey_data'
    }

    this.props.addSurveyData(this.draft_id, category, {
      [key]: value
    })
  }

  render() {
    const { orderedQuestions, questionProperties } = this
    const draft = this.props.drafts.filter(
      draft => draft.draft_id === this.draft_id
    )[0]
    return (
      <ScrollView style={styles.container}>
        <Button
          id="submit"
          title="Submit"
          onPress={() =>
            this.props.submitDraft(
              url[this.props.env],
              this.props.token.token,
              this.draft_id,
              draft
            )
          }
        />
        {orderedQuestions.map(question => (
          <View key={question}>
            <Text>{questionProperties[question]['title']['es']}</Text>
            {questionProperties[question]['type'] === 'string' && (
              <TextInput
                placeholder="insert text"
                onChangeText={value => this.storeDraftItem(question, value)}
                value={this.getDraftItem(question)}
              />
            )}
            {questionProperties[question]['type'] === 'number' && (
              <TextInput
                placeholder="insert number"
                keyboardType="numeric"
                onChangeText={value => this.storeDraftItem(question, value)}
                value={this.getDraftItem(question)}
              />
            )}
            {questionProperties[question]['type'] === 'array' && (
              <Picker
                onValueChange={value => this.storeDraftItem(question, value)}
                selectedValue={this.getDraftItem(question)}
              >
                {questionProperties[question]['items']['enum'].map(item => (
                  <Picker.Item
                    key={item.description}
                    label={item.description}
                    value={item.value}
                  />
                ))}
              </Picker>
            )}
          </View>
        ))}
      </ScrollView>
    )
  }
}

Draft.propTypes = {
  createDraft: PropTypes.func.isRequired,
  addSurveyData: PropTypes.func.isRequired,
  submitDraft: PropTypes.func.isRequired,
  drafts: PropTypes.array,
  surveys: PropTypes.array,
  navigation: PropTypes.object.isRequired,
  env: PropTypes.oneOf(['production', 'demo', 'testing', 'development']),
  token: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  }
})

const mapStateToProps = ({ env, surveys, token, drafts, snapshots }) => ({
  env,
  token,
  surveys,
  drafts,
  snapshots
})

const mapDispatchToProps = {
  createDraft,
  addSurveyData,
  submitDraft
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Draft)
