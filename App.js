/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

import MainApp from './src/pages/MainApp'
import Routes from "./src/Routes";

export default class LoginForm extends Component<{}> {
  state = {
    auth_token: ''
  }

  constructor(props) {
    super(props);
    //this.state = { username: "", password: "" };
    this.fetchUserData();
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
    this.setState({ auth_token: info.csrf_token });
  };

  render() {
    if(this.state.auth_token == '') {
      return (

        <View style={styles.container}>
            <StatusBar backgroundColor="blue" barStyle="light-content" />
            <View style={{ flex:1 }}><Routes/></View>
        </View>

      );
    }
    else {
      return (
        <View style={styles.container}>
            <StatusBar backgroundColor="blue" barStyle="light-content" />
            <View style={{ flex:1 }}><MainApp /></View>
        </View>
        /*
        <Fragment>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
              <View style={styles.body}>
                <Screen1 />
              </View>
              </ScrollView>
          </SafeAreaView>
        </Fragment>
        */
      );
    }
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  container: {
    backgroundColor: "#eceff1",
    flex: 1,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
    flex: 1,
    borderColor: "red"
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

//export default App;
