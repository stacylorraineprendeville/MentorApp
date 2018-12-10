import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'

import globalStyles from '../../globalStyles'
import colors from '../../theme.json'
import RoundImage from '../../components/RoundImage'
import Button from '../../components/Button'

const navigationRules = {
  terms: {
    nextPage: 'Privacy',
    param: 'privacy'
  },
  privacy: {
    nextPage: 'FamilyParticipant'
  }
}

export class Terms extends Component {
  render() {
    const { t, navigation } = this.props
    return (
      <ScrollView
        style={globalStyles.background}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={globalStyles.container}>
          <RoundImage source="check" />
          <Text style={[globalStyles.h2Bold, styles.heading]}>
            {t('views.readCarefully')}
          </Text>
          <Text id="content" style={[globalStyles.subline, styles.content]}>
            {t(`views.${navigation.getParam('page')}`)}
          </Text>
        </View>
        <View style={styles.buttonsBar}>
          <Button
            id="dissagree"
            text={t('general.disagree')}
            underlined
            handleClick={() => navigation.setParams({ modalOpen: true })}
          />
          <Button
            id="agree"
            colored
            text={t('general.agree')}
            handleClick={() =>
              navigation.navigate(
                navigationRules[navigation.getParam('page')].nextPage,
                {
                  survey: this.props.navigation.getParam('survey'),
                  page: navigationRules[navigation.getParam('page')].param
                }
              )
            }
          />
        </View>
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
    justifyContent: 'space-between'
  },
  heading: {
    color: colors.dark,
    textAlign: 'center'
  },
  content: {
    marginTop: 25
  },
  buttonsBar: {
    height: 50,
    marginTop: 50,
    marginBottom: -2,
    flexDirection: 'row'
  }
})
