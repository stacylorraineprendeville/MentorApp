import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { addSurveyData } from '../../redux/actions'

import globalStyles from '../../globalStyles'
import Button from '../../components/Button'
import Select from '../../components/Select'

export class FamilyMembersGender extends Component {
  draft_id = this.props.navigation.getParam('draft_id')
  survey = this.props.navigation.getParam('survey')

  state = { errorsDetected: [] }

  handleClick() {
    this.props.navigation.navigate('FamilyMembersBirthdates', {
      draft_id: this.draft_id,
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

  addFamilyMemberGender(gender, list, i) {
    list[i].gender = gender
    this.props.addSurveyData(this.draft_id, 'family_data', {
      familyMembersList: list
    })
  }

  render() {
    const draft = this.props.drafts.filter(
      draft => draft.draft_id === this.draft_id
    )[0]

    return (
      <ScrollView
        style={globalStyles.background}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={{ ...globalStyles.container, padding: 0 }}>
          {draft.family_data.familyMembersList.map((item, i) => (
            <View key={i}>
              <Text
                style={{
                  ...globalStyles.h3,
                  paddingHorizontal: 20,
                  marginTop: 15,
                  marginBottom: -10
                }}
              >
                {item.firstName}
              </Text>
              <Select
                field={i.toString()}
                onChange={text =>
                  this.addFamilyMemberGender(
                    text,
                    draft.family_data.familyMembersList,
                    i
                  )
                }
                label="Gender"
                placeholder="Select gender"
                value={
                  (this.getFieldValue(draft, 'familyMembersList')[i] || {})
                    .gender || ''
                }
                detectError={this.detectError}
                data={this.survey.survey_schema.properties.gender.enumNames}
              />
            </View>
          ))}
        </View>

        <View style={{ height: 50, marginTop: 30 }}>
          <Button
            colored
            text="Continue"
            disabled={!!this.state.errorsDetected.length}
            handleClick={() => this.handleClick()}
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

FamilyMembersGender.propTypes = {
  drafts: PropTypes.array,
  navigation: PropTypes.object.isRequired
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
)(FamilyMembersGender)
