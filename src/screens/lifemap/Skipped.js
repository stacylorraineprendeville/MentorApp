import React, { Component } from 'react'
import { StyleSheet, ScrollView, Image, View } from 'react-native'
import { Divider } from 'react-native-elements'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Checkbox from '../../components/Checkbox'
import Tip from '../../components/Tip'

import globalStyles from '../../globalStyles'

import colors from '../../theme.json'

export class Skipped extends Component {
  render() {
    return (
      <ScrollView style={globalStyles.background}>
        <View style={globalStyles.container}>
          <Image
            style={styles.image}
            source={require('../../../assets/images/skipped.png')}
          />
        </View>
        <Divider style={{ backgroundColor: colors.lightgrey }} />
        <Tip
          title={'You skipped the following questions'}
          description={'Click on the question to answer it now!'}
        />
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  image: { alignSelf: 'center' }
})

Skipped.propTypes = {
  drafts: PropTypes.array,
  navigation: PropTypes.object.isRequired
}

const mapStateToProps = ({ drafts }) => ({
  drafts
})

export default connect(mapStateToProps)(Skipped)
