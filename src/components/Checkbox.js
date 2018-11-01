import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CheckBox } from 'react-native-elements'
import colors from '../theme.json'
import globalStyles from '../globalStyles'

class Checkbox extends Component {
  state = { checked: false }

  onIconPress() {
    this.props.onIconPress()
    this.setState({ checked: !this.state.checked })
  }

  render() {
    return (
      <CheckBox
        onIconPress={() => this.onIconPress()}
        disabled
        title={this.props.title}
        iconType="material"
        checkedColor={colors.green}
        checkedIcon="check-box"
        uncheckedIcon="check-box-outline-blank"
        checked={this.state.checked}
        textStyle={globalStyles.subline}
        containerStyle={{
          backgroundColor: colors.palebeige,
          borderColor: colors.palebeige
        }}
      />
    )
  }
}

Checkbox.propTypes = {
  title: PropTypes.string.isRequired,
  onIconPress: PropTypes.func.isRequired
}

export default Checkbox
