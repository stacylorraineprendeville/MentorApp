import React, { Component } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Picker
} from "react-native";

import { connect } from "react-redux";
import { getSession, setEnv } from "../redux/reducer";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  onEnvChange = env => {
    this.props.setEnv(env);
  };

  render() {
    console.log(this.props);
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>Login</Text>
        <TextInput
          placeholder="username"
          autoCapitalize="none"
          style={styles.input}
          onChangeText={username => this.setState({ username })}
        />
        <TextInput
          secureTextEntry
          autoCapitalize="none"
          placeholder="password"
          style={styles.input}
          onChangeText={password => this.setState({ password })}
        />
        <Button
          onPress={() =>
            this.props.getSession(
              this.state.username,
              this.state.password,
              this.props.env
            )
          }
          title="Submit"
        />
        <Picker
          selectedValue={this.props.env}
          onValueChange={itemValue => this.onEnvChange(itemValue)}
        >
          <Picker.Item label="Production" value="production" />
          <Picker.Item label="Demo" value="demo" />
          <Picker.Item label="Testing" value="testing" />
          <Picker.Item label="Development" value="development" selectedValue />
        </Picker>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  text: {
    margin: 30,
    fontSize: 30,
    textAlign: "center",
    padding: 5
  },
  input: { fontSize: 20, textAlign: "center" }
});

const mapStateToProps = ({ env, login }) => ({
  env,
  login
});

const mapDispatchToProps = {
  getSession,
  setEnv
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
