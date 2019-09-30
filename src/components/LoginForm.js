import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
  NativeModules
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import base64 from 'react-native-base64';
export default class LoginForm extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", encodepass: "" };
    this.Logout()
  }

  currentUserData = (data) => {
    data.encodepass = this.state.encodepass;
    AsyncStorage.setItem('currentuserinfo', JSON.stringify(data));
  }

  Login = async () => {
    fetch('http://appcmszsx4avu87d.devcloud.acquia-sites.com/user/login?_format=json', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "name": this.state.username,
            "pass": this.state.password
          })
        }).then((response) => response.json())
          .then((res) => {
            if(typeof(res.message) != "undefined"){
              Alert.alert("Error", "Error: "+ res.message);
            }
            else {
              var encodepass = base64.encode(this.state.username+':'+this.state.password);
              this.setState({ encodepass: encodepass });
              this.currentUserData(res);
              this.setState({ auth_token: res.csrf_token });
              this.setState({ current_user: res.current_user });
              this.setState({ logout_token: res.logout_token });

              console.log(this.state)
              NativeModules.DevMenu.reload();
            }
          }).catch((error) => {
            console.error(error);
          });
  }

  Logout = async () => {
    fetch('http://appcmszsx4avu87d.devcloud.acquia-sites.com/user/logout?_format=json&csrf_token=aFiLgrHxL4O1fdPND4HfAps_8drxwq0X1LTe4p7x1lQ', {
            method: 'get',
            headers: {
              'Content-Type': 'application/json'
          },
          }).then((response))
          .then((res) => {
          }).catch((error) => {
            console.error(error);
          });
  }

  saveData = async() => {
    const {username, password} = this.state;

    let loginDetails = {
      username: username,
      password: password
    }

    if(this.props.type !== 'Login') {
        AsyncStorage.setItem('loginDetails', JSON.stringify(loginDetails));

        Keyboard.dismiss();
        alert("You successfully registered. Email: " + email + ' password: ' + password);
        this.login();
    }
    else if(this.props.type == 'Login') {
      try {
            let loginDetails = await AsyncStorage.getItem('loginDetails');
            let ld = JSON.parse(loginDetails);

            if (ld.email != null && ld.password != null) {
              if (ld.email == email && ld.password == password)
              {
                  alert('Go in!');
              }
              else
              {
                  alert('Email and Password does not exist!');
              }
            }

        } catch(error)
        {
          alert(error);
        }
      }

  }

  render () {
    return (
      <View style={styles.container}>

        {!!this.state.nameError && (
          <Text style={{ color: "red" }}>{this.state.nameError}</Text>
        )}

        <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Username"
        onChangeText={username => this.setState({ username })} value={this.state.username}>
        </TextInput>

        <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)'
        placeholder="Password" secureTextEntry={true}
        onChangeText={password => this.setState({ password })} value={this.state.password}>
        </TextInput>
        <TouchableOpacity style={styles.button} onPress={this.Login.bind(this)}>

          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={this.Logout.bind(this)}>
            <Text style={styles.signUpButton}>Logout</Text>
          </TouchableOpacity> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "#eceff1",
    //flexGrow: 1,
    //alignItems: "center",
    // justifyContent: "center",
    // alignItems: "flex-end",
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
  }
});