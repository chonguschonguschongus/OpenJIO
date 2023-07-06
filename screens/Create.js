import React, { useEffect, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { View, TextInput, Image, Text, SafeAreaView, StyleSheet} from "react-native";

import { assets, FONTS, COLORS, SIZES } from "../constants";
import { RectButton } from "../components";
import { db, auth } from "../firebase";
import { TransButton } from "../components/Button";
import { collection, doc, getDoc, getDocs, addDoc} from "firebase/firestore"
import { getStorage,ref,uploadBytes,getDownloadURL } from "firebase/storage";
import * as DocumentPicker from "expo-document-picker";

const Create = () => {

  const navigation = useNavigation();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('')
  const [description, setDesc] = useState('')
  const [no, setNo] = useState('')
  const [Users, setUsers] = useState( [] )
  const usersCollectionRef = collection(db, "Users");
  const [downloadURL, setDownloadURL] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);
  
  const resetForm = () => {
    setTitle("");
    setDesc("");
    setNo("");
    setFileUploaded(false);
    setDownloadURL("");
  };

  function create() {
    if (!fileUploaded) {
      console.log("Please upload a file before creating.");
      return;
    }
  
    const eventCollectionRef = collection(db, "Event");
    const currentUser = auth.currentUser;
  
    // Get the username of the current user from the Users collection
    const currentUserDocRef = doc(db, "Users", auth.currentUser.uid);
    const getUsername = async () => {
      try {
        const userDocSnapshot = await getDoc(currentUserDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          const username = userData.username;
  
          // Create the event document with the creator's username
          addDoc(eventCollectionRef, {
            userID: currentUser.uid,
            name: title,
            description: description,
            persons: no,
            image: downloadURL,
            creator: username, // Add the creator's username field
            createdAt: new Date(),
          })
            .then(() => {
              console.log("Data submitted");
              resetForm();
              navigation.navigate("Home");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    getUsername();
  }
  
  const handleUpload = async () => {
    try {
      const { canceled, assets } = await DocumentPicker.getDocumentAsync({
        type: "image/*",
        copyToCacheDirectory: false,
      });
  
      if (canceled) {
        console.log("Document picker canceled.");
        return;
      }
  
      if (assets.length > 0) {
        const selectedAsset = assets[0];
        const storage = getStorage();
        const storageRef = ref(storage, "images/" + selectedAsset.name);
  
        // Read the file content using fetch
        const response = await fetch(selectedAsset.uri);
        const blob = await response.blob();
  
        // Upload the blob with the Content-Type explicitly set to "image/jpeg"
        await uploadBytes(storageRef, blob, { contentType: "image/jpeg" });
  
        console.log("Image uploaded to Firebase Storage successfully!");
  
        const downloadURL = await getDownloadURL(storageRef);
        setDownloadURL(downloadURL);
        setFileUploaded(true);
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
        text={"Upload image"}
        minWidth={0}
        fontSize={SIZES.large}
        handlePress={handleUpload} 
     />
      {fileUploaded && (
        <Text style={styles.fileUploadedText}>Image uploaded!</Text>
      )}
      {!fileUploaded && (
        <Text style={styles.fileNotUploadedText}>Upload an image!</Text>
      )}
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
  fileUploadedText: {
    marginTop: 10,
    fontSize: 13,
    color: COLORS.green,
    fontFamily: FONTS.regular,
  },
  fileNotUploadedText: {
    marginTop: 10,
    fontSize: 13,
    color: COLORS.red,
    fontFamily: FONTS.regular,
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
  text: {
    color: "black",
    fontSize: 40,
    fontWeight: "600",
    letterSpacing: 2,
  },
  textInput1: {
    borderWidth: 1.5,
    borderColor: "#dfe1f0",
    width: "100%",
    height: 120,
    paddingHorizontal: 16,
    backgroundColor: "#f6f7ff",
    paddingBottom: 75, 
    color: "#000000",
    borderRadius: 6,
    marginVertical: 8,
    fontSize: 18,
    fontFamily: FONTS.regular,
    // Add any additional styles you want
  },
};

export default Create;