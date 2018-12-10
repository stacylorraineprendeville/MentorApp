import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { View, StyleSheet, Text } from 'react-native'
import colors from '../theme.json'
import TextInput from './TextInput'
import Select from './Select'

const months = [
  { text: 'January', value: 'January' },
  { text: 'February', value: 'February' },
  { text: 'March', value: 'March' },
  { text: 'April', value: 'April' },
  { text: 'May', value: 'May' },
  { text: 'June', value: 'June' },
  { text: 'July', value: 'July' },
  { text: 'August', value: 'August' },
  { text: 'September', value: 'September' },
  { text: 'October', value: 'October' },
  { text: 'November', value: 'November' },
  { text: 'December', value: 'December' }
]

class DateInput extends React.Component {
  state = {
    day: '',
    month: '',
    year: '',
    error: false
  }

  setDay = day => {
    if (Number(day) < 1 || Number(day) > 31) {
      this.setState({ error: true })
      this.props.detectError(true, this.props.field)
    } else {
      this.setState({ error: false })
      this.props.detectError(false, this.props.field)
    }
    this.setState({ day })
    this.validateDate({ day })
  }

  setMonth = month => {
    this.setState({ month })
    this.validateDate({ month })
  }

  setYear = year => {
    let d = new Date()
    if (Number(year) < 1900 || Number(year) > d.getFullYear()) {
      this.setState({ error: true })
      this.props.detectError(true, this.props.field)
    } else {
      this.setState({ error: false })
      this.props.detectError(false, this.props.field)
    }
    this.setState({ year })
    this.validateDate({ year })
  }

  validateDate({ day, month, year }) {
    const validDate =
      moment.unix(this.props.value).format('YYYY MMMM D') !== 'Invalid date'

    const yearInput =
      typeof year === 'string'
        ? year
        : year ||
          this.state.year ||
          (validDate ? moment.unix(this.props.value).format('YYYY') : '')

    const monthInput =
      month ||
      this.state.month ||
      (validDate ? moment.unix(this.props.value).format('MMMM') : '')

    const dayInput =
      typeof day === 'string'
        ? day
        : day ||
          this.state.day ||
          (validDate ? moment.unix(this.props.value).format('D') : '')

    const error = !moment(
      `${yearInput} ${monthInput} ${dayInput}`,
      'YYYY MMMM D',
      true
    ).isValid(dayInput)
    console.log(`${yearInput} ${monthInput} ${dayInput}`)
    console.log(error)

    if (error) {
      this.props.detectError(true, this.props.field)
    } else {
      const unix = moment(
        `${yearInput} ${monthInput} ${dayInput}`,
        'YYYY MMMM D'
      ).unix()
      this.props.detectError(false, this.props.field)
      this.props.onValidDate(unix, this.props.field)
    }
    this.setState({
      error
    })
  }

  componentDidMount() {
    // on mount validate empty required fields without showing an errors message
    if (this.props.required && !this.props.value) {
      this.props.detectError(true, this.props.field)
    }
  }

  render() {
    const validDate =
      moment.unix(this.props.value).format('YYYY MMMM D') !== 'Invalid date'
    const month =
      this.state.month ||
      (validDate ? moment.unix(this.props.value).format('MMMM') : '')

    const year =
      this.state.year ||
      (validDate ? moment.unix(this.props.value).format('YYYY') : '')
    const day =
      this.state.day ||
      (validDate ? moment.unix(this.props.value).format('D') : '')

    return (
      <View>
        <Text style={styles.text}>{this.props.label}</Text>
        <View style={styles.container}>
          <View style={styles.month}>
            <Select
              onChange={month => this.setMonth(month)}
              label="Month"
              placeholder="Select month"
              field=""
              value={month}
              data={months}
            />
          </View>
          <View style={styles.day}>
            <TextInput
              onChangeText={day => this.setDay(day)}
              value={day}
              placeholder="Day"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.year}>
            <TextInput
              onChangeText={year => this.setYear(year)}
              value={year}
              placeholder="Year"
              keyboardType="numeric"
            />
          </View>
        </View>
        {this.state.error && (
          <Text style={{ ...styles.text, color: colors.red }}>
            Please enter a valid date e.g. May 03 1977
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
  text: { paddingLeft: 25, marginTop: 20 }
})

DateInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number,
  field: PropTypes.string,
  required: PropTypes.bool,
  detectError: PropTypes.func,
  onValidDate: PropTypes.func
}

export default DateInput
