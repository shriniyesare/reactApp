import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default class SignUp extends Component<{}> {
  render () {
    return (
      <View style={styles.container}>
        <Image style={{width:70, height: 70}} source={require("../images/logo.png")}></Image>
        <Text style={styles.logoText}>Sign Up</Text>
        <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Username"></TextInput>
        <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)'
        placeholder="Password" secureTextEntry={true}
        ></TextInput>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>SignUp</Text>
        </TouchableOpacity>
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
  inputBox: {
    width: 300,
    fontSize: 18,
    color: "#4e342e",
    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 13,
    marginBottom: 20,
  },
  button : {
    backgroundColor: "#0288d1",
    borderRadius: 25,
    marginVertical: 20,
    paddingHorizontal: 16,
    paddingVertical: 13,
    width: 300,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '500',
    color: "#efebe9",
    textAlign: "center",
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