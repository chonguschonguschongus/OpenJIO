import { View, Text, Image, TextInput } from "react-native";
import { COLORS, FONTS, SIZES, assets, SHADOWS} from "../constants";

import { db, auth } from "../firebase";
import React, { useEffect, useState } from "react";
import { collection, getDocs} from "firebase/firestore"

const HomeHeader = ({ onSearch }) => {

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

  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
        padding: SIZES.font,
        width: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Image
          source={assets.newlogo}
          resizeMode="contain"
          style={{ width: 60, height: 60 }}
        />

      </View>
      
      <View style={{ marginVertical: SIZES.font }}>{Users.map((item) => {
      // Check if the item's ID matches the ID of the current user
      if (item.id === auth.currentUser.uid) {
        return (
          <View key={item.id}>
            <Text
             style={{
             fontFamily: FONTS.regular,
             fontSize: 25,
             color: COLORS.white,
             marginLeft : -5,
             }}
            > Hey {item.username},</Text>
          </View>
        );
      } else {
        return null;
      }
     })}

      </View>
      
      <View style={{ marginTop: SIZES.font }}>
        <View
          style={{
            width: "100%",
            borderRadius: SIZES.font,
            backgroundColor: COLORS.gray,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: SIZES.font,
            paddingVertical: SIZES.small - 2,
          }}
        >
          <Image
            source={assets.search}
            resizeMode="contain"
            style={{ width: 20, height: 20, marginRight: SIZES.base }}
          />
          <TextInput 
            placeholder="Find something to do!"
            style={{ flex: 1 }}
            onChangeText={onSearch}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;
