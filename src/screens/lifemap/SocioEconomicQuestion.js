import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, View, StyleSheet } from 'react-native'
import TextInput from '../../components/TextInput'
import Select from '../../components/Select'
import Button from '../../components/Button'
import globalStyles from '../../globalStyles'
import data from '../../fake-socio-economic-data.json'

export class SocioEconomicQuestion extends Component {
  data = data
  state = {
    errorsDetected: []
  }
  constructor(props) {
    super(props)

    // If this is the first socio economics screen set the whole process
    // in the navigation. On every next screen it will know which questions
    // to ask and if it is done.
    if (!props.navigation.getParam('socioEconomics')) {
      let currentDimension = ''
      let questionsPerScreen = []
      let totalScreens = 0
      data.surveyEconomicQuestions.forEach(question => {
        if (question.dimension !== currentDimension) {
          currentDimension = question.dimension
          totalScreens += 1
        }

        if (!questionsPerScreen[totalScreens - 1]) {
          questionsPerScreen[totalScreens - 1] = []
        }

        questionsPerScreen[totalScreens - 1].push(question)
      })

      props.navigation.setParams({
        socioEconomics: {
          currentScreen: 1,
          questionsPerScreen,
          totalScreens
        }
      })
    }
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

  render() {
    const socioEconomics = this.props.navigation.getParam('socioEconomics')
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
          {!!socioEconomics &&
            socioEconomics.questionsPerScreen[
              socioEconomics.currentScreen - 1
            ].map(question =>
              question.answerType === 'select' ? (
                <Select
                  key={question.questionText}
                  required={question.required}
                  onChange={() => {}}
                  placeholder={question.questionText}
                  label={question.questionText}
                  field={question.questionText}
                  value={''}
                  detectError={this.detectError}
                  data={question.options}
                />
              ) : (
                <TextInput
                  key={question.questionText}
                  field={question.questionText}
                  onChangeText={() => {}}
                  placeholder={question.questionText}
                  value={''}
                  required={question.required}
                  detectError={this.detectError}
                />
              )
            )}
        </View>
        <View style={{ marginTop: 15 }}>
          <Button
            id="continue"
            disabled={!!this.state.errorsDetected.length}
            colored
            text="Continue"
            handleClick={() =>
              socioEconomics.currentScreen === socioEconomics.totalScreens
                ? this.props.navigation.navigate('BeginLifemap', {
                    draft_id: this.props.navigation.getParam('draft_id'),
                    survey: this.props.navigation.getParam('survey')
                  })
                : this.props.navigation.navigate('SocioEconomicQuestion', {
                    draft_id: this.props.navigation.getParam('draft_id'),
                    survey: this.props.navigation.getParam('survey'),
                    currentScreen: socioEconomics.currentScreen++,
                    questionsPerScreen: socioEconomics.questionsPerScreen,
                    totalScreens: socioEconomics.totalScreens
                  })
            }
          />
        </View>
      </ScrollView>
    )
  }
}

SocioEconomicQuestion.propTypes = {
  navigation: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
})

export default SocioEconomicQuestion
