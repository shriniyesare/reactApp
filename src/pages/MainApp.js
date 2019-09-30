import React, { Component } from "react";
import { createAppContainer, createDrawerNavigator, createStackNavigator, createNavigator } from "react-navigation";
import CustomDrawerNavigator from "./CustomDrawerNavigator";
import Icon from "react-native-vector-icons/Ionicons";

import Home from "./Home";
import Notifications from "./Notifications";
import Maintenance from "./Maintenance";
import AutocompleteExample from "./AutocompleteExample";

Icon.loadFont()

const MainNavigator = createDrawerNavigator(
  {
    // AutocompleteExample: {
    //   navigationOptions: {
    //     drawerIcon: ({ tintColor }) => (
    //       <Icon name="md-business" style={{ color: tintColor }} />
    //     ),
    //     drawerLabel: "Autocomplete Example"
    //   },
    //   screen: AutocompleteExample
    // },
    Home: {
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="md-home" style={{ color: tintColor }} />
        ),
        drawerLabel: "Home"
      },
      screen: Home
    },
    Notifications: {
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="md-settings" style={{ color: tintColor }} />
        ),
        drawerLabel: "Notifications"
      },
      screen: Notifications
    },
    Maintenance: {
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="md-business" style={{ color: tintColor }} />
        ),
        drawerLabel: "Maintenance"
      },
      screen: Maintenance
    }
  },
  {
    contentComponent: CustomDrawerNavigator
  }
);

const MainApp = createAppContainer(MainNavigator);
export default MainApp;