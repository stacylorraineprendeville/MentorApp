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
import validator from 'validator'

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
    date: null,
    month: null,
    year: null
  }

  render() {
    return (
      <View>
        <Text style={styles.text}>{this.props.label}</Text>
        <View style={styles.container}>
          <Picker
            onValueChange={itemValue => this.setState({ month: itemValue })}
            style={styles.month}
          >
            {months.map(item => (
              <Picker.Item label={item} value={item} key={item} />
            ))}
          </Picker>

          <View style={styles.day}>
            <TextInput
              onChangeText={() => {}}
              status="error"
              value=""
              placeholder="Day"
            />
          </View>
          <View style={styles.year}>
            <TextInput
              onChangeText={() => {}}
              value=""
              placeholder="Year"
              status={false}
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
