import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import validator from 'validator'
import {
  View,
  Picker,
  StyleSheet,
  Text,
  TouchableWithoutFeedback
} from 'react-native'
import colors from '../theme.json'
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
    day: '',
    month: '',
    year: '',
    error: false
  }
  setDay = day => {
    this.setState({ day })
    this.validateDate({ day })
  }
  setMonth = month => {
    this.setState({ month })
    this.validateDate({ month })
  }
  setYear = year => {
    this.setState({ year })
    this.validateDate({ year })
  }

  validateDate({ day, month, year }) {
    const yearInput = year || this.state.year
    const monthInput = month || this.state.month
    const dayInput = day || this.state.day

    const error = !moment(
      `${yearInput} ${monthInput} ${dayInput}`,
      'YYYY MMMM D',
      true
    ).isValid(dayInput)

    if (yearInput && monthInput && dayInput) {
      this.setState({
        error
      })
    }
  }

  render() {
    console.log(this.state)
    return (
      <View>
        <Text style={styles.text}>{this.props.label}</Text>
        <View style={styles.container}>
          <Picker
            onValueChange={month => this.setMonth(month)}
            style={styles.month}
            selectedValue={this.state.month}
          >
            {months.map(item => (
              <Picker.Item label={item} value={item} key={item} />
            ))}
          </Picker>

          <View style={styles.day}>
            <TextInput
              onChangeText={day => this.setDay(day)}
              value=""
              placeholder="Day"
              status={this.state.error ? 'error' : ''}
            />
          </View>
          <View style={styles.year}>
            <TextInput
              onChangeText={year => this.setYear(year)}
              value=""
              placeholder="Year"
              status={this.state.error ? 'error' : ''}
            />
          </View>
        </View>
        {this.state.error && (
          <Text style={{ ...styles.text, color: colors.red }}>
            Please enter a valid date
          </Text>
        )}
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
