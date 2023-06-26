import React, { useEffect, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {  View, TextInput, Image, Text, SafeAreaView} from "react-native";

import { assets, FONTS, COLORS, SIZES } from "../constants";
import { RectButton } from "../components";
import { db, auth } from "../firebase";
import { TransButton } from "../components/Button";
import { collection, doc, getDoc, updateDoc, addDoc} from "firebase/firestore"

const UserProfile = () => {

  const navigation = useNavigation();
  const [username, setUsername] = useState('')
  const currentUser = auth.currentUser;

  const updateUser = async () => {
    try {
      if (!currentUser) {
        console.log("No user logged in.");
        return;
      }

      const userDocRef = doc(db, "Users", currentUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        await updateDoc(userDocRef, {
          username: username,
        });
        console.log("Document updated successfully");
      } else {
        console.log("User document does not exist");
      }
    } catch (error) {
      console.log("Error updating document:", error);
    } finally {
      navigation.navigate("UserProfile");
    }
  };

  return (
    <SafeAreaView
      style={styles.loginCard}
      behaviour = "padding">

      <Image source={assets.newlogo} style={styles.logo} />

      <Text style={styles.h2}>User Name</Text>
        
      <View style={styles.loginForm}>
        <View style={styles.username}>
          <TextInput
            placeholder="New Username"
            autoCorrect={false}
            value = {username}
            onChangeText = {text => setUsername(text)}
            style={styles.control}
          />
          <View id="spinner" style={styles.spinner}></View>
        </View>

        <View style={[styles.bars]}>
          <View style={styles.bar}></View>
        </View>
      </View>

      <RectButton
        text={"Confirm"}
        minWidth={0}
        fontSize={SIZES.large}
        handlePress={() => updateUser(username)}
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
    width: 100,
    height: 100,
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
  text: {
    color: "black",
    fontSize: 40,
    fontWeight: "600",
    letterSpacing: 2,
  },
};

export default UserProfile;