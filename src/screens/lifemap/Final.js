import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import RoundImage from '../../components/RoundImage'
import LifemapVisual from '../../components/LifemapVisual'
import Button from '../../components/Button'

import globalStyles from '../../globalStyles'
import colors from '../../theme.json'

export class Final extends Component {
  draftId = this.props.navigation.getParam('draftId')

  render() {
    const draft = this.props.drafts.filter(
      item => item.draftId === this.draftId
    )[0]

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
            style={{
              ...globalStyles.h3,
              ...styles.text,
              paddingBottom: 30
            }}
          >
            You have completed the lifemap
          </Text>
          <RoundImage source="partner" />
          <LifemapVisual bigMargin data={draft.indicatorSurveyDataList} />
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
const styles = StyleSheet.create({
  image: { alignSelf: 'center', marginVertical: 50 },
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
