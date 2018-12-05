import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { addSurveyData } from '../../redux/actions'

import globalStyles from '../../globalStyles'
import colors from '../../theme.json'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'

export class AddAchievement extends Component {
  state = {
    reason: '',
    roadmap: ''
  }
  indicator = this.props.navigation.getParam('indicator')

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
              style={{ marginRight: 10, marginLeft: -10 }}
            />
            <Text style={globalStyles.h3}>Achievement</Text>
          </View>
          <TextInput
            field=""
            onChangeText={text => this.setState({ reason: text })}
            placeholder="Write your answer here..."
            label="How did you get it?"
            value={''}
            multiline
          />
          <TextInput
            label="What did it take to achieve this?"
            onChangeText={text => this.setState({ roadmap: text })}
            placeholder="Write your answer here..."
            value={''}
            multiline
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

AddAchievement.propTypes = {
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
)(AddAchievement)
