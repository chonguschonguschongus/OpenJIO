import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { BarButton } from "./Button";
import { COLORS, SIZES, SHADOWS, assets } from "../constants";
import { useNavigation } from "@react-navigation/native";

const NavigationBar = () => {

  const navigation = useNavigation();

  const handleHomePress = () => {
    navigation.navigate("Create");
  };

  const handleCreatePress = () => {
    navigation.navigate("Username");
  };

  return (
    <View style={styles.NavBar}>
      <View>
        <BarButton
          imgUrl={assets.home}
          handlePress={handleHomePress}
          style={styles.IconBehaviour}
        />
        <BarButton
          imgUrl={assets.liked}
          handlePress={handleCreatePress}
          style={styles.IconBehaviour}
        />
        <BarButton 
          imgUrl={assets.newactivity}
          style={styles.IconBehaviour} 
          handlePress={handleCreatePress}
          />
        <BarButton imgUrl={assets.profile} style={styles.IconBehaviour} />
        <BarButton imgUrl={assets.settings} style={styles.IconBehaviour} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  NavBar: {
    flexDirection: "row",
    backgroundColor: "#eee",
    width: "90%",
    justifyContent: "space-evenly",
    borderRadius: 40,
  },

  IconBehaviour: {
    padding: 14,
  },
});

export default NavigationBar;
