import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'
import LifemapOverviewListItem from './LifemapOverviewListItem'

import globalStyles from '../globalStyles'

class LifemapOverview extends Component {
  dimensions = this.props.surveyData.map(item => item.dimension)
  render() {
    return (
      <View style={styles.container}>
        {[...new Set(this.dimensions)].map(item => (
          <View key={item}>
            <Text style={styles.dimension}>{item.toUpperCase()}</Text>
            {this.props.surveyData
              .filter(indicator => indicator.dimension === item)
              .map(indicator => (
                <LifemapOverviewListItem
                  key={indicator.questionText}
                  name={indicator.questionText}
                  code={indicator.codeName}
                  color={
                    this.props.draftData.filter(
                      item => item.key === indicator.codeName
                    )[0].value
                  }
                  handleClick={() => {}}
                />
              ))}
          </View>
        ))}
      </View>
    )
  }
}

LifemapOverview.propTypes = {
  surveyData: PropTypes.array.isRequired,
  draftData: PropTypes.array.isRequired
}

const styles = StyleSheet.create({
  container: { ...globalStyles.container, paddingTop: 0, paddingLeft: 25 },
  dimension: { ...globalStyles.h4, marginVertical: 12 }
})

export default LifemapOverview
