import React, { useEffect, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {  View, TextInput, Image, Text, SafeAreaView} from "react-native";

import { assets, FONTS, COLORS, SIZES } from "../constants";
import { RectButton } from "../components";
import { db, auth } from "../firebase";
import { TransButton } from "../components/Button";
import { collection, doc, getDocs, setDoc, addDoc} from "firebase/firestore"
import { getStorage,ref,uploadBytes,getDownloadURL } from "firebase/storage";
import * as DocumentPicker from "expo-document-picker";

const UserProfile = () => {

  const navigation = useNavigation();
  
  const [username, setUsername] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDesc] = useState('')
  const [no, setNo] = useState('')
  const [Users, setUsers] = useState( [] )
  const usersCollectionRef = collection(db, "Users");
  const [downloadURL, setDownloadURL] = useState('');

  function create() {
    const userDocRef = doc(db, "Event", auth.currentUser.uid);
  
    setDoc(userDocRef, {
      name: title,
      description: description,
      persons: no,
      image: downloadURL,
    })
      .then(() => {
        console.log('Data submitted');
      })
      .then (navigation.navigate("Home"))
      .catch((error) => {
        console.log(error);
      });
  }

  const handleUpload = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: "image/*",
        copyToCacheDirectory: false,
      });
  
      if (file.type === "success") {
        const storage = getStorage();
        const storageRef = ref(storage, "images/" + file.name);
  
        // Read the file content using fetch
        const response = await fetch(file.uri);
        const blob = await response.blob();
  
        // Upload the blob with the Content-Type explicitly set to "image/jpeg"
        await uploadBytes(storageRef, blob, { contentType: "image/jpeg" });
  
        console.log("Image uploaded to Firebase Storage successfully!");
  
        const downloadURL = await getDownloadURL(storageRef);
        setDownloadURL(downloadURL);
        console.log("File available at:", downloadURL);
  
        // TODO: Handle the file upload separately, e.g., save the downloadURL to Firestore or perform any other desired operation
      } else {
        console.log("No file selected.");
      }
    } catch (error) {
      console.error("Error uploading image to Firebase Storage:", error);
    }
  };

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
    <SafeAreaView
      style={styles.loginCard}
      behaviour = "padding">

      <Image source={assets.newlogo} style={styles.logo}/>

      <Text style={styles.h2}>Create</Text>
        
      <View style={styles.loginForm}>
        <View style={styles.username}>
          <TextInput
            placeholder="Event Title"
            autoCorrect={false}
            value = {title}
            onChangeText = {text => setTitle(text)}
            style={styles.control}
          />
        </View>
        <TextInput
            placeholder="Description"
            autoCorrect={false}
            value = {description}
            onChangeText = {text => setDesc(text)}
            style={styles.textInput1}
          />

        <TextInput
            placeholder="No. of pax"
            autoCorrect={false}
            value = {no}
            onChangeText = {text => setNo(text)}
            style={styles.control}
        />

        <TextInput
            placeholder="No. of pax"
            autoCorrect={false}
            value = {no}
            onChangeText = {text => setNo(text)}
            style={styles.control}
        />

        <View style={[styles.bars]}>
          <View style={styles.bar}></View>
        </View>
      </View>
        
      <RectButton
       text={"Create"}
       minWidth={200}
        fontSize={SIZES.large}
       handlePress={create} 
      />
      <View style={styles.bar}></View>
      <TransButton
        text={"Upload file"}
        minWidth={0}
        fontSize={SIZES.large}
        handlePress={handleUpload} 
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
  textInput1: {
    borderWidth: 1.5,
    borderColor: "#dfe1f0",
    outlineColor: "transparent",
    width: "100%",
    height: 120,
    paddingHorizontal: 16,
    backgroundColor: "#f6f7ff",
    paddingBottom: 75, 
    color: "inherit",
    borderRadius: 6,
    marginVertical: 8,
    fontSize: 18,
    fontFamily: FONTS.regular,
    // Add any additional styles you want
  },
};

export default UserProfile;