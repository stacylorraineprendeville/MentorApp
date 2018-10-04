import React, { Component } from 'react'
import { ScrollView, View, StyleSheet, Text, Button } from 'react-native'
import { connect } from 'react-redux'

import { deleteDraft } from '../redux/actions'
import { url } from '../config'

class Drafts extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        {this.props.drafts.map(draft => (
          <View key={draft.draft_id}>
            <Button
              title={draft.draft_id}
              onPress={e =>
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
