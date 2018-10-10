import React, { Component } from 'react'
import { ScrollView, View, StyleSheet, Button } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteDraft } from '../redux/actions'

export class Drafts extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        {this.props.drafts.map(draft => (
          <View key={draft.draft_id}>
            <Button
              title={draft.draft_id}
              onPress={() =>
                this.props.navigation.navigate('Draft', {
                  draft: draft.draft_id
                })
              }
            />
            <Button
              title="Delete draft"
              onPress={() => this.props.deleteDraft(draft.draft_id)}
            />
          </View>
        ))}
      </ScrollView>
    )
  }
}

Drafts.propTypes = {
  deleteDraft: PropTypes.func.isRequired,
  drafts: PropTypes.array,
  navigation: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

const mapStateToProps = ({ drafts }) => ({
  drafts
})

const mapDispatchToProps = { deleteDraft }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Drafts)
