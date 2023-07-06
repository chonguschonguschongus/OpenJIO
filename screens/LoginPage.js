import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, TextInput, Image, Text, SafeAreaView } from "react-native";

import { assets, FONTS, COLORS, SIZES } from "../constants";
import { RectButton } from "../components";
import { db, auth } from "../firebase";
import { TransButton } from "../components/Button";

const LoginPage = () => {

  const navigation = useNavigation();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:user.email');
      })
      .then(() => navigation.replace("MainTabs"))
      .catch(error => alert(error.message))
  }

  return (
    <SafeAreaView
      style={styles.loginCard}
      behaviour = "padding">

      <Image source={assets.newlogo} style={styles.logo} />

      <Text style={styles.h2}>Sign in</Text>
    
      <View style={styles.loginForm}>
        <View style={styles.username}>
          <TextInput
            placeholder="Email"
            autoCorrect={false}
            value = {email}
            onChangeText = {text => setEmail(text)}
            style={styles.control}
          />
          <View id="spinner" style={styles.spinner}></View>
        </View>
        <TextInput
          placeholder="Password"
          autoCorrect={false}
          style={styles.control}
          secureTextEntry={true}
          value = {password}
          onChangeText = {text => setPassword(text)}
        />

        <View style={[styles.bars]}>
          <View style={styles.bar}></View>
        </View>
        <RectButton
          text={"Let's Jio"}
          minWidth={150}
          fontSize={SIZES.large}
          handlePress={handleLogin}
        />
      </View>
      <TransButton
          text={"Sign Up Now!"}
          minWidth={0}
          fontSize={SIZES.large}
          handlePress={() => navigation.navigate("SignUp")}
        />
    </SafeAreaView>
  );
};

const styles = {
  loginCard: {
    width: 400,
    paddingVertical: 70,
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
    borderColor: "rgba(255, 255, 255, 255)",
    padding: 5,
    marginBottom: 10,
  },
  h2: {
    fontSize: 36,
    fontWeight: "600",
    marginVertical: 0,
  },
  h3: {
    fontSize: 17,
    fontFamily: FONTS.medium,
    fontWeight: "600",
    marginVertical: 0,
  },
  loginForm: {
    width: "100%",
    marginVertical: 10,
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
    width: "100%",
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: "#f6f7ff",
    color: "#000000",
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

export default LoginPage;