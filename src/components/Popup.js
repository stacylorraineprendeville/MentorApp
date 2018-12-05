import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import colors from '../theme.json'

export default class Popup extends Component {
  render() {
    const { isOpen, children, onClose } = this.props
    return (
      <Modal
        visible={!!isOpen}
        transparent
        onRequestClose={onClose}
        animationType="fade"
        presentationStyle="overFullScreen"
      >
        <TouchableOpacity
          style={styles.container}
          onPress={onClose}
          id="overlay"
        >
          <View id="modal" style={styles.modal}>
            {children}
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }
}

Popup.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onClose: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: -200,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(47,38,28, 0.2)'
  },
  modal: {
    width: 300,
    backgroundColor: colors.white,
    paddingVertical: 23,
    padding: 28,
    marginBottom: 200
  }
})
