import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import globalStyles from '../../globalStyles'
import RoundImage from '../../components/RoundImage'
import Button from '../../components/Button'

export class Final extends Component {
  componentDidMount() {
    //The submit draft action will occur here
  }
  render() {
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
const styles = StyleSheet.create({
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
  surveys: PropTypes.array,
  navigation: PropTypes.object.isRequired
}

const mapStateToProps = ({ drafts }) => ({
  drafts
})

export default connect(mapStateToProps)(Final)
