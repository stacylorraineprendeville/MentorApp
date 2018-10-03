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
import { connect } from 'react-redux'
import uuid from 'uuid/v1'

import {
  createDraft,
  addPersonalSurveyData,
  addEconomicSurveyData,
  addIndicatorSurveyData
} from '../redux/reducer'

class Survey extends Component {
  draft_id = uuid()
  survey = this.props.surveys.filter(
    survey => survey.id === this.props.navigation.getParam('survey')
  )[0]
  orderedQuestions = this.survey['survey_ui_schema']['ui:order']
  questionProperties = this.survey['survey_schema']['properties']
  personalData = this.survey['survey_ui_schema']['ui:group:personal']
  economicsData = this.survey['survey_ui_schema']['ui:group:economics']
  indicatorsData = this.survey['survey_ui_schema']['ui:group:indicators']

  componentDidMount() {
    this.props.createDraft({
      survey_id: this.survey.id,
      survey_version_id: this.survey['survey_version_id'],
      draft_id: this.draft_id,
      personal_survey_data: {},
      economic_survey_data: {},
      indicator_survey_data: {}
    })
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
    if (this.personalData.includes(key)) {
      this.props.addPersonalSurveyData(this.draft_id, {
        [key]: value
      })
    } else if (this.economicsData.includes(key)) {
      this.props.addEconomicSurveyData(this.draft_id, {
        [key]: value
      })
    } else if (this.indicatorsData.includes(key)) {
      this.props.addIndicatorSurveyData(this.draft_id, {
        [key]: value
      })
    }
  }

  render() {
    const { orderedQuestions, questionProperties, survey } = this
    return (
      <ScrollView style={styles.container}>
        {orderedQuestions.map((question, i) => (
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
        <Button title="Submit" onPress={() => {}} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  }
})

const mapStateToProps = ({ env, surveys, token, drafts }) => ({
  env,
  token,
  surveys,
  drafts
})

const mapDispatchToProps = {
  createDraft,
  addPersonalSurveyData,
  addEconomicSurveyData,
  addIndicatorSurveyData
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Survey)
