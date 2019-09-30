import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import LoginForm from '../components/LoginForm';
//import { Actions } from 'react-native-router-flux';

export default class Login extends Component<{}> {
  signup() {
    //Actions.signup()
  }
  render () {
    return (
      <View style={styles.container}>
        <Image style={{width:70, height: 70}} source={require("../images/logo.png")}></Image>
        <Text style={styles.logoText}>Sign In</Text>
        <LoginForm />
        <View style={styles.signUpTextCont}>
          <Text style={styles.signUpText}>Don't have an account yet? </Text>
          <TouchableOpacity onPress={this.signup}>
            <Text style={styles.signUpButton}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eceff1",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    marginVertical: 15,
    fontSize: 24,
    color: "#4e342e",
    marginBottom: 80,
  },
  signUpTextCont: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  signUpButton: {
    fontWeight: '500',
  }
});