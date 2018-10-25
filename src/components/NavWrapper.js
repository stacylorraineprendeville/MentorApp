import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getHydrationState } from '../redux/store'
import { LoginStack, AppStack } from './Navigation'

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
    return this.state.rehydrated ? (
      <View style={styles.container}>
        {this.props.token.token ? <AppStack /> : <LoginStack />}
      </View>
    ) : (
      <ActivityIndicator size="large" style={styles.activityIndicator} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  }
})

NavWrapper.propTypes = {
  token: PropTypes.object
}

const mapStateToProps = ({ token }) => ({
  token
})

export default connect(mapStateToProps)(NavWrapper)
