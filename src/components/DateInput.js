import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Picker,
  StyleSheet,
  Text,
  TouchableWithoutFeedback
} from 'react-native'
import TextInput from './TextInput'

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

class DateInput extends React.Component {
  state = {
    active: false
  }
  render() {
    return (
      <View>
        <Text style={styles.text}>{this.props.label}</Text>
        <View style={styles.container}>
          <Picker
            onValueChange={(itemValue, itemIndex) => {}}
            style={styles.month}
          >
            {months.map(item => (
              <Picker.Item label={item} value={item} key={item} />
            ))}
          </Picker>

          <View style={styles.day}>
            <TextInput
              onChangeText={() => {}}
              field=""
              value=""
              validation="day"
              placeholder="Day"
              detectError={() => {}}
            />
          </View>
          <View style={styles.year}>
            <TextInput
              onChangeText={() => {}}
              field=""
              value=""
              placeholder="Year"
              validation="year"
              detectError={() => {}}
            />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  day: {
    width: '25%',
    marginLeft: '-3%'
  },
  year: { width: '36%', marginLeft: '-3%' },
  month: { width: '45%' },
  text: { paddingLeft: 15, paddingRight: 15 }
})

DateInput.propTypes = {}

export default DateInput
