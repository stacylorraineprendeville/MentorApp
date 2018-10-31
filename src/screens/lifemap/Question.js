import React, { Component } from 'react'
import {
  StyleSheet,
  ScrollView,
  Text,
  ProgressBarAndroid,
  View,
  CheckBox
} from 'react-native'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addSurveyData } from '../../redux/actions'
import globalStyles from '../../globalStyles'
import colors from '../../theme.json'
import Slider from '../../components/Slider'

export class Question extends Component {
  step = this.props.navigation.getParam('step')
  survey = this.props.navigation.getParam('survey')
  draft_id = this.props.navigation.getParam('draft_id')

  indicators = this.survey['survey_ui_schema']['ui:group:indicators']

  indicator = this.survey['survey_schema'].properties[
    this.indicators[this.step]
  ]

  indicatorIsRequired = this.survey['survey_schema'].required.includes(
    this.indicators[this.step]
  )

  slides = this.indicator.items.enum.filter(item => item.url !== 'NONE')

  selectAnswer(answer) {
    this.props.addSurveyData(this.draft_id, 'indicator_survey_data', {
      [this.indicators[this.step]]: answer
    })
    if (this.step + 1 < this.indicators.length) {
      this.props.navigation.push('Question', {
        draft_id: this.draft_id,
        survey: this.survey,
        step: this.step + 1
      })
    }
  }

  render() {
    return (
      <ScrollView style={globalStyles.background}>
        <View style={{ ...globalStyles.container, paddingTop: 20 }}>
          <Text style={{ ...globalStyles.h5, textAlign: 'right' }}>{`${this
            .step + 1} / ${this.indicators.length}`}</Text>
          <Text style={{ ...globalStyles.h3 }}>{`${this.step + 1}. ${
            this.indicator.title.es
          }`}</Text>
          <ProgressBarAndroid
            styleAttr="Horizontal"
            color={colors.green}
            indeterminate={false}
            progress={(this.step + 1) / this.indicators.length}
            style={{ marginTop: 35 }}
          />
        </View>
        <Slider
          slides={this.slides}
          selectAnswer={answer => this.selectAnswer(answer)}
        />
        <View style={styles.skip}>
          {this.indicatorIsRequired ? (
            <Text style={globalStyles.tag}> *Response required </Text>
          ) : (
            <View style={{ flexDirection: 'row' }}>
              <CheckBox
                id="skip-question-checkbox"
                onChange={() => this.selectAnswer('NONE')}
              />
              <Text style={{ ...globalStyles.tag, marginTop: 8 }}>
                Skip this question
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  padding: {
    paddingLeft: 25,
    paddingRight: 25
  },
  skip: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30
  }
})

Question.propTypes = {
  addSurveyData: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
}

const mapDispatchToProps = {
  addSurveyData
}

export default connect(
  null,
  mapDispatchToProps
)(Question)
