import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  NativeModules
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Icon from "react-native-vector-icons/Ionicons";

export default class Logout extends Component<{}> {
  constructor(props) {
    super(props);
  }

  removeItemValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      let userinfo = await AsyncStorage.getItem('currentuserinfo');
      return true;
    }
    catch(exception) {
      return false;
    }
  }

  Logout = async () => {
    this.removeItemValue('currentuserinfo');
    NativeModules.DevMenu.reload();
  }

  render () {
    return (
      <View>
        <TouchableOpacity style={styles.logout} onPress={this.Logout.bind(this)}>
        <Icon
          name="ios-log-out"
          size={32}
          color="black"
        />
        <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button : {
    backgroundColor: "#0288d1",
    borderRadius: 25,
    marginVertical: 20,
    paddingHorizontal: 16,
    paddingVertical: 13,
    width: 300,
    marginTop: 30,
  },
  logout: {
    alignSelf: 'flex-end',
    marginLeft: 300,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '500',
    color: "#efebe9",
    textAlign: "center",
  }
});