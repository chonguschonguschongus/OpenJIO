import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {  View, TextInput, Image, Text, SafeAreaView} from "react-native";

import { assets, FONTS, COLORS, SIZES } from "../constants";
import { RectButton } from "../components";
import { db, auth } from "../firebase";
import { TransButton } from "../components/Button";
import { collection, getDocs} from "firebase/firestore"

const UserProfile = () => {

  const navigation = useNavigation();
  const [Users, setUsers] = useState( [] )
  const usersCollectionRef = collection(db, "Users");
  
  useEffect(() => {
    const getUsers = async () => {
      try {
        const querySnapshot = await getDocs(usersCollectionRef);
        const fetchedUsers = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(fetchedUsers);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => navigation.replace("AuthStack"))
      .catch(error => alert(error.message))
  }

  return (
    <SafeAreaView
      style={styles.loginCard}
      behaviour = "padding">

      <Image source={assets.newlogo} style={styles.logo} />

      <View>
      {Users.map((item) => {
      // Check if the item's ID matches the ID of the current user
      if (item.id === auth.currentUser.uid) {
        return (
          <View key={item.id}>
            <Text style={styles.text}>{item.username}</Text>
          </View>
        );
      } else {
        return null;
      }
     })}
      </View>
        
      <View style={styles.loginForm}>
        <View style={[styles.bars]}>
          <View style={styles.bar}></View>
        </View>
        <RectButton
          text={"Username"}
          minWidth={150}
          fontSize={SIZES.large}
          handlePress={() => navigation.navigate("Username")}
        />

      </View>
  
      <TransButton
       text={"Sign Out"}
       minWidth={0}
      fontSize={SIZES.large}
       handlePress={handleSignOut} // Pass the item.id and username variables
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
    width: 150,
    height: 150,
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
  text: {
    color: "black",
    fontSize: 40,
    fontWeight: "600",
    letterSpacing: 2,
  },
};

export default UserProfile;