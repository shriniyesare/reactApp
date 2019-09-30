import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import CustomHeader from "../components/CustomHeader";

export default class Dashboard extends Component {

  render() {
    return (
      <View style={styles.MainContainer}>
        <CustomHeader navigation={this.props.navigation} />
        <Text> Dashboard Screen </Text>
      </View>
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