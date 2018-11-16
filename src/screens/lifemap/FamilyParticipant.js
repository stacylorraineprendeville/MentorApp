import React, { Component } from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import uuid from 'uuid/v1'
import { createDraft, addSurveyData } from '../../redux/actions'

import Select from '../../components/Select'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import DateInput from '../../components/DateInput'
import Icon from 'react-native-vector-icons/MaterialIcons'
import globalStyles from '../../globalStyles'
import colors from '../../theme.json'

export class FamilyParticipant extends Component {
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

  //Required fields
  requiredFields = [
    'firstName',
    'lastName',
    'document',
    'documentNumber',
    'gender',
    'countryOfBirth',
    'dateOfBirth'
  ]

  state = { errorsDetected: [] }

  getDraftFromRedux() {
    //Get draft  from Redux store if it exists else create new draft
    if (!this.props.navigation.getParam('draft')) {
      this.props.createDraft({
        survey_id: this.survey.id,
        survey_version_id: this.survey['survey_version_id'],
        created: Date.now(),
        draft_id: this.draft_id,
        personal_survey_data: {},
        economic_survey_data: {},
        indicator_survey_data: {}
      })
    }
  }

  componentDidMount() {
    this.getDraftFromRedux()
  }

  handleClick() {
    this.props.navigation.navigate('Location', {
      draft_id: this.draft_id,
      survey: this.survey
    })
  }

  getFieldValue = (draft, field) => {
    if (!draft) {
      return
    }
    return draft.personal_survey_data[field]
  }

  detectError = (error, field) => {
    if (error && !this.state.errorsDetected.includes(field)) {
      this.setState({ errorsDetected: [...this.state.errorsDetected, field] })
    } else
      this.setState({
        errorsDetected: this.state.errorsDetected.filter(item => item !== field)
      })
  }

  addSurveyData = (text, field) => {
    this.props.addSurveyData(this.draft_id, 'personal_survey_data', {
      [field]: text
    })
  }

  render() {
    const draft = this.props.drafts.filter(
      draft => draft.draft_id === this.draft_id
    )[0]

    const emptyRequiredFields = draft
      ? this.requiredFields.filter(
          item =>
            !draft.personal_survey_data[item] ||
            draft.personal_survey_data[item].length === 0
        )
      : []

    const isButtonEnabled =
      !emptyRequiredFields.length && !this.state.errorsDetected.length
    console.log(this.state.errorsDetected)
    console.log(emptyRequiredFields)
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
          <Icon name="face" color={colors.grey} size={55} style={styles.icon} />
          <TextInput
            validation="string"
            field="firstName"
            onChangeText={this.addSurveyData}
            placeholder="First name"
            value={this.getFieldValue(draft, 'firstName')}
            required
            detectError={this.detectError}
          />
          <TextInput
            field="lastName"
            validation="string"
            onChangeText={this.addSurveyData}
            placeholder="Last name"
            value={this.getFieldValue(draft, 'lastName')}
            required
            detectError={this.detectError}
          />
          <Select
            id="gender"
            required
            onChange={this.addSurveyData}
            label="Gender *"
            placeholder="Select gender"
            field="gender"
            value={this.getFieldValue(draft, 'gender') || ''}
            detectError={this.detectError}
            data={this.survey.survey_schema.properties.gender.enumNames}
          />

          <DateInput
            label="Date of birth*"
            field="dateOfBirth"
            detectError={this.detectError}
            onValidDate={this.addSurveyData}
            value={this.getFieldValue(draft, 'dateOfBirth')}
          />

          <Select
            id="document"
            required
            onChange={this.addSurveyData}
            label="Document type *"
            placeholder="Document type"
            field="document"
            value={this.getFieldValue(draft, 'document') || ''}
            detectError={this.detectError}
            data={[
              'Passport',
              'Driver license',
              'National ID card',
              'State ID card',
              'Permanent resident card number',
              'Organization-assigned number'
            ]}
          />
          <TextInput
            onChangeText={this.addSurveyData}
            field="documentNumber"
            required
            value={this.getFieldValue(draft, 'documentNumber')}
            placeholder="Document number"
            detectError={this.detectError}
          />
          <Select
            required
            onChange={this.addSurveyData}
            label="Country of birth*"
            countrySelect
            placeholder="Select a country"
            field="countryOfBirth"
            value={this.getFieldValue(draft, 'countryOfBirth') || ''}
            detectError={this.detectError}
          />
          <TextInput
            onChangeText={this.addSurveyData}
            field="email"
            value={this.getFieldValue(draft, 'email')}
            placeholder="Email"
            validation="email"
            detectError={this.detectError}
          />
          <TextInput
            onChangeText={this.addSurveyData}
            field="phone"
            value={this.getFieldValue(draft, 'phone')}
            placeholder="Phone"
            validation="phone"
            detectError={this.detectError}
          />
        </View>
        <View style={{ height: 50, marginTop: 50 }}>
          <Button
            disabled={!isButtonEnabled}
            colored
            text="Continue"
            handleClick={() => this.handleClick()}
          />
        </View>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center'
  },
  contentContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
})

FamilyParticipant.propTypes = {
  surveys: PropTypes.array.isRequired,
  drafts: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
  createDraft: PropTypes.func.isRequired,
  addSurveyData: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  createDraft,
  addSurveyData
}

const mapStateToProps = ({ surveys, drafts }) => ({
  surveys,
  drafts
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FamilyParticipant)
