import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { addSurveyData } from '../../redux/actions'

import globalStyles from '../../globalStyles'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'

export class AddPriority extends Component {
  render() {
    return (
      <ScrollView
        style={globalStyles.background}
        contentContainerStyle={styles.contentContainer}
      >
        <View>
          <View
            style={{
              ...globalStyles.container,
              flexDirection: 'row'
            }}
          >
            <Icon
              name="stars"
              color={colors.blue}
              size={17}
              style={{ marginRight: 10 }}
            />
            <Text style={globalStyles.h3}>Achievement</Text>
          </View>
          <TextInput
            field=""
            onChangeText={() => {}}
            placeholder="Write your answer here..."
            label="How did you get it?"
            value={''}
            detectError={() => {}}
          />
          <TextInput
            label="What did it take to achieve this?"
            onChangeText={() => {}}
            placeholder="Write your answer here..."
            value={''}
            detectError={() => {}}
          />
        </View>
        <View style={{ height: 50 }}>
          <Button colored text="Save" handleClick={() => {}} />
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

AddPriority.propTypes = {}

const mapDispatchToProps = {
  addSurveyData
}

const mapStateToProps = ({ drafts }) => ({
  drafts
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPriority)
