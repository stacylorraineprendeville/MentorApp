import React, { Component } from 'react'
import { StyleSheet, ScrollView, Image, View, FlatList } from 'react-native'
import { Divider } from 'react-native-elements'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Tip from '../../components/Tip'
import SkippedListItem from '../../components/SkippedListItem'

import globalStyles from '../../globalStyles'
import colors from '../../theme.json'

export class Skipped extends Component {
  state = {
    checkedBoxes: []
  }

  componentDidUpdate() {
    const indicators = this.getIndicators()
    const skippedQuestions = this.getSkippedQuestions(indicators)
    if (this.state.checkedBoxes.length === skippedQuestions.length) {
      return this.props.navigation.navigate('Final')
    }
  }

  draft_id = this.props.navigation.getParam('draft_id')
  survey = this.props.navigation.getParam('survey')
  indicatorsArray = this.survey['survey_ui_schema']['ui:group:indicators']

  toggleCheckbox = question => {
    if (this.state.checkedBoxes.includes(question)) {
      this.setState({
        checkedBoxes: this.state.checkedBoxes.filter(item => item === question)
      })
    } else
      this.setState({
        checkedBoxes: [...this.state.checkedBoxes, question]
      })
  }

  getIndicators = () =>
    this.props.drafts.filter(item => item.draft_id === this.draft_id)[0]
      .indicator_survey_data

  getSkippedQuestions = indicators =>
    Object.keys(indicators).filter(key => indicators[key] === 'NONE')

  render() {
    const indicators = this.getIndicators()
    const skippedQuestions = this.getSkippedQuestions(indicators)

    return (
      <ScrollView style={globalStyles.background}>
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
          renderItem={({ item }) => (
            <SkippedListItem
              item={this.survey.survey_schema.properties[item].title.es}
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
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  image: { alignSelf: 'center' }
})

Skipped.propTypes = {
  drafts: PropTypes.array.isRequired,
  surveys: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired
}

const mapStateToProps = ({ drafts, surveys }) => ({
  drafts,
  surveys
})

export default connect(mapStateToProps)(Skipped)
