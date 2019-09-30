import React, { Component } from "react";
import { Alert, StyleSheet, View, Text, ScrollView } from "react-native";

import CustomHeader from "../components/CustomHeader";
import UserData from "../components/UserData";
import fstyles from "../styles";

export default class Notifications extends Component {

  state = {
    auth_token: '',
    noti_list: '',
    screenHeight: 0,
    encodepass: ""
  }

  fetchUserData = async () => {
    // this.removeItemValue('currentuserinfo');
    try {
      let userinfo = await AsyncStorage.getItem('currentuserinfo');

      if (userinfo === null) {
        this.state.auth_token = '';
      }
      else {
        //userinfo = JSON.parse(userinfo);
        this.parseUserData(userinfo);
      }
    } catch (error) {
      console.log('Error fetching user data', error);
    }
  }

  parseUserData = (userinfo) => {
    let info = JSON.parse(userinfo);
    //console.log(info);
    this.setState({ auth_token: info.csrf_token });
  };
  componentDidMount() {
    this.fetchUserData();
    let list = this.notifications();
    console.log(list);

    // This line of code will be executed after 10+ seconds
    //this.setState({users, questions});
  }

  notifications = async () => {

    fetch('http://appcmszsx4avu87d.devcloud.acquia-sites.com/appcms_api/notifications?_format=json', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': this.state.auth_token,
            'Authorization': 'Basic ' + this.state.encodepass
          }
        }).then((response) => response.json())
          .then((res) => {
            console.log('noti data');
            //console.log(res);
            console.log(res.response.data);

            if(typeof(res.message) != "undefined"){
              Alert.alert("Error", "Error: "+ res.message);
            }
            else {
              this.setState({ noti_list: res.response.data });
            }
          }).catch((error) => {
            console.error(error);
          });
  }

  parse_response_data = () => {
    const noti_list = this.state.noti_list;
    return Object.keys(noti_list).map(key =>
      <View>
        <Text style={fstyles.notetitle}>{noti_list[key].title}</Text>
        <Text style={fstyles.notecontent}>{noti_list[key].body}</Text>
      </View>
    )
  }
  render() {
    //const scrollEnabled = this.state.screenHeight > height;
    return (

      <ScrollView style={styles.MainContainer} showsVerticalScrollIndicator={true}>
        <CustomHeader navigation={this.props.navigation} />
        <Text style={fstyles.pagetitle}>Notifications</Text>
        <UserData/>
        {this.parse_response_data()}
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 10,
    //alignItems: 'center',
    marginTop: 10,
    //justifyContent: 'center',
  },
});