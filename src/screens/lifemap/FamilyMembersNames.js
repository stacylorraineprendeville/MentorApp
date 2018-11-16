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
  draft_id = this.props.navigation.getParam('draft_id')
  survey = this.props.navigation.getParam('survey')

  state = { errorsDetected: [] }

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
    return draft.family_data[field]
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
    this.props.addSurveyData(this.draft_id, 'family_data', {
      [field]: text
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
          <Select
            required
            onChange={this.addSurveyData}
            label="Number of people living in this household"
            placeholder="Number of people living in this household"
            field="count_family_members"
            value={this.getFieldValue(draft, 'count_family_members') || ''}
            detectError={this.detectError}
            data={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
          />
        </View>
        <View style={{ height: 50 }}>
          <Button
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
  contentContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
})

FamilyMembersNames.propTypes = {
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
)(FamilyMembersNames)
