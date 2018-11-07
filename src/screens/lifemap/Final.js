import React, { Component } from 'react'
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  FlatList,
  Text
} from 'react-native'
import { Divider } from 'react-native-elements'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Tip from '../../components/Tip'
import SkippedListItem from '../../components/SkippedListItem'

import RoundImage from '../../components/RoundImage'
import Button from '../../components/Button'

import globalStyles from '../../globalStyles'
import colors from '../../theme.json'

export class Final extends Component {
  state = {
    checkedBoxes: []
  }
  getSkippedQuestions = () => {
    const answers = this.props.drafts.filter(
      item => item.draft_id === this.draft_id
    )[0].indicator_survey_data
    return Object.keys(answers).filter(key => answers[key] === 'NONE')
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

  render() {
    const skippedQuestions = this.getSkippedQuestions()
    if (
      skippedQuestions.length > 0 &&
      skippedQuestions.length !== this.state.checkedBoxes
    ) {
      return (
        <ScrollView
          style={globalStyles.background}
          contentContainerStyle={styles.contentContainer}
        >
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
    } else {
      return (
        <ScrollView
          style={globalStyles.background}
          contentContainerStyle={styles.contentContainer}
        >
          <View
            style={{
              ...globalStyles.container
            }}
          >
            <Text style={{ ...globalStyles.h1, ...styles.text }}>Great!</Text>
            <Text
              style={{ ...globalStyles.h3, ...styles.text, paddingBottom: 30 }}
            >
              You have completed the lifemap
            </Text>
            <RoundImage source="partner" />
          </View>
          <View style={{ height: 50 }}>
            <Button
              colored
              text="Close"
              handleClick={() => this.props.navigation.navigate('Dashboard')}
            />
          </View>
        </ScrollView>
      )
    }
  }
}
const styles = StyleSheet.create({
  image: { alignSelf: 'center' },
  contentContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  text: {
    textAlign: 'center'
  }
})

Final.propTypes = {
  drafts: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired
}

const mapStateToProps = ({ drafts }) => ({
  drafts
})

export default connect(mapStateToProps)(Final)
