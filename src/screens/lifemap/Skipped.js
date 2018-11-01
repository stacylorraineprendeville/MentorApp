import React, { Component } from 'react'
import { StyleSheet, ScrollView, Image } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import globalStyles from '../../globalStyles'

import Button from '../../components/Button'
import colors from '../../theme.json'

export class Skipped extends Component {
  render() {
    return (
      <ScrollView style={globalStyles.container}>
        <Image source={require('../../../assets/images/skipped.png')} />
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({})

Skipped.propTypes = {
  drafts: PropTypes.array,
  navigation: PropTypes.object.isRequired
}

const mapStateToProps = ({ drafts }) => ({
  drafts
})

export default connect(mapStateToProps)(Skipped)
