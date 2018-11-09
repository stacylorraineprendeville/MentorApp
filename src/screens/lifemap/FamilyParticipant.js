import React, { Component } from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import uuid from 'uuid/v1'
import { createDraft, addSurveyData } from '../../redux/actions'

import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
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
          <Icon name="face" color={colors.grey} size={55} style={styles.icon} />
          <TextInput
            status="active"
            errormsg="Error"
            onTextChange={() => {}}
            placeholder="First name"
          />
          <TextInput
            errormsg="Error"
            onTextChange={() => {}}
            placeholder="Last name"
          />
          <TextInput
            errormsg="Error"
            onTextChange={() => {}}
            placeholder="Email"
          />
          <TextInput
            errormsg="Error"
            onTextChange={() => {}}
            placeholder="Phone"
          />
        </View>
        <View style={{ height: 50 }}>
          <Button
            colored
            text="Continue"
            handleClick={() =>
              this.props.navigation.navigate('BeginLifemap', {
                draft_id: this.draft_id,
                survey: this.survey
              })
            }
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
  navigation: PropTypes.object.isRequired
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
