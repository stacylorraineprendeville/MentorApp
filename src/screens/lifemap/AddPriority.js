import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { addSurveyData } from '../../redux/actions'

import globalStyles from '../../globalStyles'
import colors from '../../theme.json'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import Counter from '../../components/Counter'

export class AddPriority extends Component {
  state = {
    reason: '',
    action: '',
    estimatedDate: 0
  }

  editCounter = action => {
    if (action === 'minus' && this.state.estimatedDate > 0) {
      return this.setState({ estimatedDate: this.state.estimatedDate - 1 })
    } else if (action === 'plus') {
      return this.setState({ estimatedDate: this.state.estimatedDate + 1 })
    }
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
              name="pin"
              color={colors.blue}
              size={17}
              style={{ marginRight: 10, marginLeft: -10 }}
            />
            <Text style={globalStyles.h3}>Priority</Text>
          </View>
          <TextInput
            field=""
            onChangeText={text => this.setState({ reason: text })}
            placeholder="Write your answer here..."
            label="Why don't you have it?"
            value={''}
            multiline
          />
          <TextInput
            label="What will you do to get it?"
            onChangeText={text => this.setState({ action: text })}
            placeholder="Write your answer here..."
            value={''}
            multiline
          />
          <View style={{ padding: 15 }}>
            <Counter
              editCounter={this.editCounter}
              count={this.state.estimatedDate}
              text={'How many months will it take?'}
            />
          </View>
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

AddPriority.propTypes = {
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
)(AddPriority)
