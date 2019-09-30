import React, { Component } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";

import AsyncStorage from '@react-native-community/async-storage';
import CustomHeader from "../components/CustomHeader";
import UserData from "../components/UserData";
import fstyles from "../styles";

export default class Home extends Component {

  state = {
    auth_token: '',
    trans_data: '',
    userid: 0,
    encodepass: ""
  }

  fetchUserData = async () => {
    try {
      let userinfo = await AsyncStorage.getItem('currentuserinfo');

      if (userinfo === null) {
        this.state.auth_token = '';
      }
      else {
        this.parseUserData(userinfo);
      }
    } catch (error) {
      console.log('Error fetching user data', error);
    }
  }

  parseUserData = (userinfo) => {
    let info = JSON.parse(userinfo);
    console.log(info);
    this.setState({ auth_token: info.csrf_token });
    this.setState({ userid: info.current_user.uid });
    this.setState({ encodepass: info.encodepass });

  };
  componentDidMount() {
    this.fetchUserData();
    let list = this.transactions_data();
  }

  transactions_data = async () => {

    fetch('http://appcmszsx4avu87d.devcloud.acquia-sites.com/appcms_api/user_dash/2?_format=json', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': this.state.auth_token,
            'Authorization': 'Basic ' + this.state.encodepass
          }
        }).then((response) => response.json())
          .then((res) => {
            console.log(res.data);

            if(typeof(res.message) != "undefined"){
              Alert.alert("Error", "Error: "+ res.message);
            }
            else {
              this.setState({ trans_data: res.data });
            }
          }).catch((error) => {
            console.error(error);
          });
  }

  render() {

    return (
      <View style={styles.MainContainer}>
        <CustomHeader navigation={this.props.navigation} />
        <Text style={fstyles.pagetitle}>Home</Text>
        <UserData/>

        <Text style={fstyles.transdata}>Current month: {this.state.trans_data.current_month}</Text>
        <Text style={fstyles.transdataovd}>Due amount: {this.state.trans_data.outstanding}</Text>
        <Text style={fstyles.transdata}>Last updated: {this.state.trans_data.paid_till}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 10,
    marginTop: 10
  },
});