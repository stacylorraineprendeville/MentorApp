import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Modal,
  Image
} from 'react-native'
import { FormValidationMessage } from 'react-native-elements'
import countries from 'localized-countries'
import arrow from '../../assets/images/selectArrow.png'
import colors from '../theme.json'
import globalStyles from '../globalStyles'
import i18n from '../i18n'

const countryList = countries(require('localized-countries/data/en')).array()

class Select extends Component {
  state = {
    isOpen: false,
    errorMsg: ''
  }

  toggleDropdown = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  handleError(errorMsg) {
    this.props.detectError(true, this.props.field)
    this.props.onChange('', this.props.field)
    this.setState({
      errorMsg
    })
  }

  validateInput = value => {
    this.setState({
      isOpen: false
    })
    if (this.props.required && !value) {
      this.handleError(i18n.t('validation.fieldIsRequired'))
    } else {
      this.props.onChange(value, this.props.field)
      this.setState({
        errorMsg: null
      })
      this.props.field ? this.props.detectError(false, this.props.field) : ''
    }
  }

  componentDidMount() {
    // on mount validate empty required fields without showing an errors message
    if (this.props.required && !this.props.value) {
      this.props.detectError(true, this.props.field)
    }
  }

  render() {
    const { errorMsg, isOpen } = this.state
    const { value, placeholder, required, options, countrySelect } = this.props

    return (
      <TouchableOpacity onPress={this.toggleDropdown}>
        <View style={[styles.container, !value && styles.withValue]}>
          <Text style={styles.placeholder}>
            {value || `${placeholder} ${required ? '*' : ''}`}
          </Text>
          <Image source={arrow} style={styles.arrow} />
          {/* Error message */}
          {!!errorMsg && <Text style={{ color: colors.red }}>{errorMsg}</Text>}

          <Modal
            transparent={true}
            visible={isOpen}
            onRequestClose={this.toggleDropdown}
          >
            <TouchableOpacity
              style={[
                styles.overlay,
                {
                  backgroundColor: 'rgba(47,38,28, 0.2)'
                }
              ]}
              onPress={this.toggleDropdown}
            />
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={isOpen}
            onRequestClose={this.toggleDropdown}
          >
            <TouchableOpacity
              style={styles.overlay}
              onPress={this.toggleDropdown}
            />
            <View style={styles.dropdown}>
              {countrySelect ? (
                <View>
                  {countryList.map(item => (
                    <TouchableOpacity
                      key={item.code}
                      onPress={() => this.validateInput(item.label)}
                    >
                      <Text style={[styles.option]}>{item.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <View>
                  {options.map(item => (
                    <TouchableOpacity
                      key={item.value}
                      onPress={() => this.validateInput(item.text)}
                    >
                      <Text style={[styles.option]}>{item.text}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </Modal>
        </View>
      </TouchableOpacity>
    )
  }
}

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  placeholder: PropTypes.string.isRequired,
  field: PropTypes.string,
  countrySelect: PropTypes.bool,
  required: PropTypes.bool,
  detectError: PropTypes.func
}

export default Select

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    marginHorizontal: 15,
    marginBottom: 15,
    justifyContent: 'center',
    minHeight: 60
  },
  placeholder: {
    paddingHorizontal: 15,
    ...globalStyles.subline
  },
  withValue: {
    backgroundColor: colors.beige,
    borderBottomColor: colors.grey
  },
  dropdown: {
    padding: 25,
    maxHeight: 360,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.palebeige
  },
  option: {
    fontFamily: 'Roboto',
    fontSize: 16,
    lineHeight: 50,
    color: '#4a4a4a'
  },
  arrow: {
    width: 10,
    height: 5,
    position: 'absolute',
    right: 13,
    top: '50%'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: -200,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  selected: {
    color: colors.lightgrey
  }
})
