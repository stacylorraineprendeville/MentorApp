import React, { Component } from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'
import globalStyles from '../../globalStyles'
import colors from '../../theme.json'
import RoundImage from '../../components/RoundImage'

class Terms extends Component {
  render() {
    const { t, navigation } = this.props
    return (
      <ScrollView
        style={globalStyles.background}
        contentContainerStyle={styles.contentContainer}
      >
        <RoundImage source="check" />
        <Text style={[globalStyles.h2Bold, styles.heading]}>
          Please read carefully before creating the Life Map
        </Text>
        <Text style={[globalStyles.subline, styles.content]}>
          {t(`views.${navigation.getParam('page')}`)}
        </Text>
      </ScrollView>
    )
  }
}

Terms.propTypes = {
  t: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
}

export default withNamespaces()(Terms)

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    paddingTop: 33
  },
  heading: {
    color: colors.dark,
    textAlign: 'center'
  },
  content: {
    marginTop: 25,
    paddingHorizontal: 20
  }
})
