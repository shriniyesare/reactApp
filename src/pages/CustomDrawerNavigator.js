
import React from "react";
import { View } from "react-native";
import { DrawerItems } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";

Icon.loadFont()
import styles from "../styles";

const CustomDrawerNavigator = props => (
  <View style={[styles.cdncontainer]}>
    <DrawerItems
      activeBackgroundColor={"black"}
      activeTintColor={"red"}
      iconContainerStyle={styles.icons}
      {...props}
    />
  </View>
);

export default CustomDrawerNavigator;