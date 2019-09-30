
import React, { Component } from "react";
import { View } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

import styles from "../styles";
import Logout from "./Logout";

Icon.loadFont();

const CustomHeader = ({ navigation }) => (
  <View style={styles.container}>
    <Icon
      name="md-menu"
      size={32}
      color="black"
      onPress={() => navigation.openDrawer()}
    />
    <Logout  />
  </View>
);

export default CustomHeader;