import React, { Component } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { addSurveyData } from '../../redux/actions'

import globalStyles from '../../globalStyles'
import Button from '../../components/Button'
import Select from '../../components/Select'
import TextInput from '../../components/TextInput'

export class FamilyMembersNames extends Component {
  draftId = this.props.navigation.getParam('draftId')
  survey = this.props.navigation.getParam('survey')

  state = { errorsDetected: [] }

  handleClick(draft) {
    this.getFieldValue(draft, 'count_family_members') > 1
      ? this.props.navigation.navigate('FamilyMembersGender', {
          draftId: this.draftId,
          survey: this.survey
        })
      : this.props.navigation.navigate('Location', {
          draftId: this.draftId,
          survey: this.survey
        })
  }
  getFieldValue = (draft, field) => {
    if (!draft) {
      return
    }
    return draft.family_data[field]
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

  addFamilyCount = (text, field) => {
    this.props.addSurveyData(this.draftId, 'family_data', {
      [field]: text
    })

    this.addFamilyMemberArray(text)
  }

  addFamilyMemberArray = count => {
    let familyMembersList = []

    for (let i = 0; i < Number(count) - 1; i++) {
      familyMembersList.push({ firstName: '' })
    }

    this.props.addSurveyData(this.draftId, 'family_data', {
      familyMembersList: familyMembersList
    })
  }

  addFamilyMemberName(name, list, i) {
    list[i].firstName = name
    this.props.addSurveyData(this.draftId, 'family_data', {
      familyMembersList: list
    })
  }

  render() {
    const draft = this.props.drafts.filter(
      draft => draft.draftId === this.draftId
    )[0]

    const emptyRequiredFields =
      draft.family_data.familyMembersList.filter(item => item.firstName === '')
        .length !== 0 || !draft.family_data.count_family_members

    const isButtonEnabled =
      !emptyRequiredFields && !this.state.errorsDetected.length

    return (
      <ScrollView
        style={globalStyles.background}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={{ ...globalStyles.container, padding: 0 }}>
          <Select
            required
            onChange={this.addFamilyCount}
            label="Number of people living in this household"
            placeholder="Number of people living in this household"
            field="count_family_members"
            value={(
              this.getFieldValue(draft, 'count_family_members') || ''
            ).toString()}
            detectError={this.detectError}
            data={[
              { text: '1', value: '1' },
              { text: '2', value: '2' },
              { text: '3', value: '3' },
              { text: '4', value: '4' },
              { text: '5', value: '5' },
              { text: '6', value: '6' },
              { text: '7', value: '7' },
              { text: '8', value: '8' },
              { text: '9', value: '9' },
              { text: '10', value: '10' }
            ]}
          />
          <TextInput
            validation="string"
            field=""
            onChangeText={() => {}}
            placeholder="Primary participant"
            value={draft.personal_survey_data.firstName}
            required
            readonly
            detectError={this.detectError}
          />
          {draft.family_data.familyMembersList.map((item, i) => (
            <TextInput
              key={i}
              validation="string"
              field={i.toString()}
              onChangeText={text =>
                this.addFamilyMemberName(
                  text,
                  draft.family_data.familyMembersList,
                  i
                )
              }
              placeholder="Name"
              value={
                (this.getFieldValue(draft, 'familyMembersList')[i] || {})
                  .firstName || ''
              }
              required
              detectError={this.detectError}
            />
          ))}
        </View>

        <View style={{ height: 50, marginTop: 30 }}>
          <Button
            colored
            text="Continue"
            disabled={!isButtonEnabled}
            handleClick={() => this.handleClick(draft)}
          />
        </View>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
})

FamilyMembersNames.propTypes = {
  drafts: PropTypes.array,
  navigation: PropTypes.object.isRequired,
  addSurveyData: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  addSurveyData
}

const mapStateToProps = ({ drafts }) => ({
  drafts
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FamilyMembersNames)
