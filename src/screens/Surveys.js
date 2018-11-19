import React, { Component } from 'react'
import { StyleSheet, ScrollView, FlatList } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import globalStyles from '../globalStyles'
import RoundImage from '../components/RoundImage'
import LifemapListItem from '../components/LifemapListItem'
import colors from '../theme.json'

export class Surveys extends Component {
  render() {
    return (
      <ScrollView style={{ ...globalStyles.container, padding: 0 }}>
        <RoundImage source="surveys" />
        <FlatList
          style={styles.list}
          data={this.props.surveys}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <LifemapListItem
              name={item.title}
              handleClick={() =>
                this.props.navigation.navigate('Terms', {
                  draft: item.draft_id,
                  page: 'terms'
                })
              }
            />
          )}
        />
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  list: {
    borderTopColor: colors.lightgrey,
    borderTopWidth: 1,
    paddingBottom: 60
  }
})

Surveys.propTypes = {
  surveys: PropTypes.array,
  navigation: PropTypes.object.isRequired
}

const mapStateToProps = ({ surveys }) => ({
  surveys
})

export default connect(mapStateToProps)(Surveys)
