import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  ScrollView,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Picker
} from 'react-native'
import { connect } from 'react-redux'
import { setEnv, login } from '../redux/actions'
import i18n from '../i18n'
import { url } from '../config'
import Icon from 'react-native-vector-icons/MaterialIcons'

export class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  onEnvChange = env => {
    this.props.setEnv(env)
  }

  render() {
    const { navigation, env } = this.props
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>{i18n.t('login.login')}</Text>

        <TextInput
          id="username"
          placeholder="username"
          autoCapitalize="none"
          style={styles.input}
          onChangeText={username => this.setState({ username })}
        />
        <TextInput
          id="password"
          secureTextEntry
          autoCapitalize="none"
          placeholder="password"
          style={styles.input}
          onChangeText={password => this.setState({ password })}
        />
        <Button
          id="login-button"
          onPress={() =>
            this.props.login(this.state.username, this.state.password, url[env])
          }
          title="Login"
        />
        <Button
          title="Surveys"
          onPress={() => navigation.navigate('Surveys')}
        />
        <Button title="Drafts" onPress={() => navigation.navigate('Drafts')} />
        <Button
          title="Families"
          onPress={() => navigation.navigate('Families')}
        />
        <Picker
          id="env-picker"
          selectedValue={env}
          onValueChange={this.onEnvChange}
        >
          <Picker.Item label="Production" value="production" />
          <Picker.Item label="Demo" value="demo" />
          <Picker.Item label="Testing" value="testing" />
          <Picker.Item label="Development" value="development" selectedValue />
        </Picker>
        <Icon name="cached" size={30} color="#900" />
      </ScrollView>
    )
  }
}

Login.propTypes = {
  setEnv: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  env: PropTypes.oneOf(['production', 'demo', 'testing', 'development']),
  navigation: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  text: {
    margin: 30,
    fontSize: 40,
    textAlign: 'center',
    padding: 5,
    fontFamily: 'Poppins',
    fontWeight: '400'
  },
  input: { fontSize: 20, textAlign: 'center' }
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
