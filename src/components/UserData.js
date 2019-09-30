import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

import AsyncStorage from '@react-native-community/async-storage';

export default class UserData extends Component {

  constructor(props) {
    super(props);
    this.state = { auth_token: "", email: "", name: ""};
  }

  componentDidMount() {
    let user_data = this.UserData();
  }

  UserData = async () => {

    let userdata = await AsyncStorage.getItem('currentuserdata');

    if (userdata != '' && userdata !== null) {
      let user_parse = JSON.parse(userdata);
      this.setState({ name: user_parse.name[0].value });
      return name;
    }

    fetch('http://local.appcms.com/user/2?_format=json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
      .then((res) => {
        if(typeof(res.message) != "undefined"){
          console.log("Error", "Error: "+ res.message);
        }
        else {
          AsyncStorage.setItem('currentuserdata', JSON.stringify(res));
          return JSON.stringify(res);
        }
      }).catch((error) => {
        console.error(error);
      });

  }

  render() {
    return (
      <View style={{margin: 10}}>
        <Text style={{textAlign: "right", fontWeight: '500'}}> Hello, {this.state.name} </Text>
      </View>
    );
  }
}
