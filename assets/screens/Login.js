import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, TextInput, Image, Text, SafeAreaView } from "react-native";

import { assets, FONTS, COLORS, SIZES } from "../constants";
import { RectButton } from "../components";

const strengthLabels = ["weak", "medium", "strong"];

export const Login = () => {
  const navigation = useNavigation();

  const [strength, setStrength] = useState("");

  const getStrength = (password) => {
    let strengthIndicator = -1;

    let upper = false,
      lower = false,
      numbers = false;

    for (let index = 0; index < password.length; index++) {
      let char = password.charCodeAt(index);
      if (!upper && char >= 65 && char <= 90) {
        upper = true;
        strengthIndicator++;
      }

      if (!numbers && char >= 48 && char <= 57) {
        numbers = true;
        strengthIndicator++;
      }

      if (!lower && char >= 97 && char <= 122) {
        lower = true;
        strengthIndicator++;
      }
    }

    setStrength(strengthLabels[strengthIndicator] || "");
  };

  const handleChange = (text) => {
    getStrength(text);
  };

  return (
    <SafeAreaView style={styles.loginCard}>
      <Image source={assets.signupicon} style={styles.logo} />
      <Text style={styles.h2}>Sign Up</Text>
      <View style={styles.loginForm}>
        <View style={styles.username}>
          <TextInput
            autoCompleteType="email"
            autoCorrect={false}
            style={styles.control}
            placeholder="Email"
          />
          <View id="spinner" style={styles.spinner}></View>
        </View>
        <TextInput
          name="password"
          autoCorrect={false}
          style={styles.control}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={handleChange}
        />

        <View style={[styles.bars, styles[strength]]}>
          <View style={styles.bar}></View>
        </View>
        <View style={styles.strength}>
          {strength && <Text>{strength} password</Text>}
        </View>
        <RectButton
          text={"JOIN NOW"}
          minWidth={250}
          fontSize={SIZES.large}
          handlePress={() => navigation.navigate("Home")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = {
  loginCard: {
    width: 400,
    paddingVertical: 60,
    paddingHorizontal: 30,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    transitionDuration: 0.4,
  },
  logo: {
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
    padding: 5,
    marginBottom: 10,
  },
  h2: {
    fontSize: 36,
    fontWeight: "600",
    marginVertical: 0,
  },
  loginForm: {
    width: "100%",
    marginVertical: 0,
    alignItems: "center",
  },
  username: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  control: {
    borderWidth: 1.5,
    borderColor: "#dfe1f0",
    outlineColor: "transparent",
    width: "100%",
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: "#f6f7ff",
    color: "inherit",
    borderRadius: 6,
    marginVertical: 8,
    fontSize: 18,
    fontFamily: FONTS.regular,
  },
  spinner: {
    // to add spinner styles
  },
  bars: {
    marginVertical: 8,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 6,
    borderRadius: 3,
    backgroundColor: "#dfe1f0",
  },
  bar: {
    height: 6,
    borderRadius: 3,
    transitionDuration: 0.4,
    width: "0%",
  },
  weak: {
    backgroundColor: "#e24c71",
    width: "33.33%",
  },
  medium: {
    backgroundColor: "#f39845",
    width: "66.66%",
  },
  strong: {
    backgroundColor: "#57c558",
    width: "100%",
  },
  strength: {
    textAlign: "left",
    height: 30,
    textTransform: "capitalize",
    color: "#868b94",
  },
  controlButton: {
    cursor: "pointer",
    width: "100%",
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: "#454a8f",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    marginVertical: 8,
  },
  buttonText: {
    color: "#f7f7f7",
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
};

export default Login;
