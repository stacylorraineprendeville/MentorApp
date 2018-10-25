import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getHydrationState } from '../redux/store'
import { LoggedinNavigator, LoggedOutNavigator } from './Navigation'

export class NavWrapper extends Component {
  constructor(props) {
    super(props)
    this.mounted = false
    this.state = {
      rehydrated: false
    }
  }
  checkHydration() {
    if (getHydrationState() === false) {
      setTimeout(() => {
        this.checkHydration()
      }, 1000)
    } else {
      this.setState({
        rehydrated: true
      })
    }
  }
  componentDidMount() {
    this.checkHydration()
  }
  render() {
    return (
      this.state.rehydrated && (
        <View style={styles.container}>
          {this.props.token.token ? (
            <LoggedinNavigator />
          ) : (
            <LoggedOutNavigator />
          )}
        </View>
      )
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

NavWrapper.propTypes = {
  token: PropTypes.object
}

const mapStateToProps = ({ token }) => ({
  token
})

export default connect(mapStateToProps)(NavWrapper)
