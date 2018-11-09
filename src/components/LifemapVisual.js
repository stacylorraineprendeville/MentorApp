import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import colors from '../theme.json'
class LifemapVisual extends Component {
  getColors = () =>
    Object.values(this.props.data).map(color => {
      switch (color) {
        case 'GREEN':
          return colors.green

        case 'YELLOW':
          return colors.gold

        case 'RED':
          return colors.red

        case 'NONE':
          return colors.palegrey

        default:
          return colors.palegrey
      }
    })

  render() {
    return (
      <View style={styles.container}>
        {this.getColors().map((item, i) => (
          <Icon
            name="brightness-1"
            color={item}
            key={i}
            size={17}
            style={styles.icon}
          />
        ))}
      </View>
    )
  }
}

LifemapVisual.propTypes = {
  data: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', flexWrap: 'wrap' },
  icon: { margin: 7 }
})

export default LifemapVisual
