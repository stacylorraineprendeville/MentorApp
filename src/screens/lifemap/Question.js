import React, { Component } from 'react'
import {
  StyleSheet,
  ScrollView,
  Text,
  ProgressBarAndroid,
  View,
  Image
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addSurveyData } from '../../redux/actions'
import globalStyles from '../../globalStyles'
import colors from '../../theme.json'
import Slider from '../../components/Slider'

export class Question extends Component {
  indicators = this.props.navigation.getParam('survey')['survey_ui_schema'][
    'ui:group:indicators'
  ]

  step = this.props.navigation.getParam('step')

  indicator = this.props.navigation.getParam('survey')['survey_schema']
    .properties[this.indicators[this.step]]

  indicatorIsRequired = this.props.navigation
    .getParam('survey')
    ['survey_schema'].required.includes(this.indicators[this.step])
  slides = this.indicator.items.enum.filter(item => item.url !== 'NONE')

  render() {
    console.log(this.slides)
    return (
      <ScrollView style={{ ...globalStyles.container, padding: 0 }}>
        <View style={{ paddingLeft: 25, paddingRight: 25 }}>
          <Text style={{ ...globalStyles.h5, textAlign: 'right' }}>{`${this
            .step + 1} / ${this.indicators.length + 1}`}</Text>
          <Text style={{ ...globalStyles.h3 }}>{`${this.step + 1}. ${
            this.indicator.title.es
          }`}</Text>
          <ProgressBarAndroid
            styleAttr="Horizontal"
            color={colors.green}
            indeterminate={false}
            progress={(this.step + 1) / (this.indicators.length + 1)}
            style={{ marginTop: 35 }}
          />
        </View>
        <Slider slides={this.slides} giveAnswer={() => {}} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({})

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
