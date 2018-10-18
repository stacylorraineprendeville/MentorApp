import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  ScrollView,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import { connect } from 'react-redux'
import { setEnv, login } from '../redux/actions'
import logo from '../../assets/images/logo.png'
import { url } from '../config'
import globalStyles from '../globalStyles'
import colors from '../theme.json'

export class Login extends Component {
  state = {
    username: '',
    password: '',
    error: null
  }

  componentDidUpdate() {
    if (this.state.username === 'demo') {
      this.props.setEnv('demo')
    } else this.props.setEnv('production')
  }

  onLogin = () =>
    this.props
      .login(this.state.username, this.state.password, url[this.props.env])
      .then(() => {
        if (this.props.token.status === 'success') {
          this.setState({ error: false })
          this.props.navigation.navigate('Dashboard')
        } else this.setState({ error: true })
      })

  render() {
    return (
      <View style={globalStyles.container}>
        <ScrollView style={globalStyles.content}>
          <Image style={styles.logo} source={logo} />
          <Text style={globalStyles.heading1}>Welcome back!</Text>
          <Text
            style={{
              ...globalStyles.heading4,
              marginBottom: 64,
              color: colors.lightdark
            }}
          >
            {"Let's get started..."}
          </Text>
          <Text style={globalStyles.heading5}>USERNAME</Text>
          <TextInput
            id="username"
            autoCapitalize="none"
            style={styles.input}
            onChangeText={username => this.setState({ username })}
          />
          <Text style={globalStyles.heading5}>PASSWORD</Text>
          <TextInput
            id="password"
            secureTextEntry
            autoCapitalize="none"
            style={styles.input}
            onChangeText={password => this.setState({ password })}
          />
          <TouchableOpacity
            id="login-button"
            onPress={() => this.onLogin()}
            style={globalStyles.buttonGreen}
          >
            <Text style={globalStyles.buttonText}>Login</Text>
          </TouchableOpacity>
          {this.state.error && (
            <Text
              id="error-message"
              style={{ ...globalStyles.heading4, color: colors.red }}
            >
              Login error
            </Text>
          )}
        </ScrollView>
      </View>
    )
  }
}

Login.propTypes = {
  setEnv: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  env: PropTypes.oneOf(['production', 'demo', 'testing', 'development']),
  navigation: PropTypes.object.isRequired,
  token: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    fontFamily: 'Roboto',
    borderColor: colors.green,
    borderWidth: 1,
    borderRadius: 2,
    height: 48,
    marginBottom: 18,
    padding: 15,
    color: colors.lightdark,
    backgroundColor: colors.white
  },
  logo: { width: 42, height: 42, marginBottom: 8 }
})

const mapStateToProps = ({ env, token }) => ({
  env,
  token
})

const mapDispatchToProps = {
  setEnv,
  login
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
