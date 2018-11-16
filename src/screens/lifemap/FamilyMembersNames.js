import React, { Component } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import globalStyles from '../../globalStyles'
import Button from '../../components/Button'

export class FamilyMembersNames extends Component {
  draft_id = this.props.navigation.getParam('draft')
  survey = this.props.navigation.getParam('survey')

  handleClick() {
    this.props.navigation.navigate('Location', {
      draft_id: this.draft_id,
      survey: this.survey
    })
  }

  render() {
    return (
      <ScrollView
        style={globalStyles.background}
        contentContainerStyle={styles.contentContainer}
      >
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

const mapStateToProps = ({ drafts }) => ({
  drafts
})

export default connect(mapStateToProps)(FamilyMembersNames)
