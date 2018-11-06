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
  render() {
    const survey = this.props.navigation.getParam('survey')

    const indicatorsArray = survey['survey_ui_schema']['ui:group:indicators']

    const draft_id = this.props.navigation.getParam('draft_id')

    const indicators = this.props.drafts.filter(
      item => item.draft_id === draft_id
    )[0].indicator_survey_data

    const skippedQuestions = Object.keys(indicators).filter(
      key => indicators[key] === 'NONE'
    )
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
              item={survey.survey_schema.properties[item].title.es}
              onIconPress={() => {}}
              handleClick={() =>
                this.props.navigation.push('Question', {
                  draft_id: draft_id,
                  survey: survey,
                  step: indicatorsArray.indexOf(item),
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
  drafts: PropTypes.array,
  navigation: PropTypes.object.isRequired
}

const mapStateToProps = ({ drafts, surveys }) => ({
  drafts,
  surveys
})

export default connect(mapStateToProps)(Skipped)
