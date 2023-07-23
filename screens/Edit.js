import React, { useState, useEffect } from "react";
import { View, TextInput, Image, Text, SafeAreaView, StyleSheet } from "react-native";
import { RectButton } from "../components";
import { UploadButton } from "../components/Button";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as DocumentPicker from "expo-document-picker";
import { assets, COLORS, SIZES, FONTS } from "../constants";

const Edit =  ({ route, navigation }) => {
  const { event } = route.params;
  const [title, setTitle] = useState(event.name);
  const [description, setDesc] = useState(event.description);
  const [no, setNo] = useState(event.persons);
  const [downloadURL, setDownloadURL] = useState(event.image);
  const [fileUploaded, setFileUploaded] = useState(false);

  const resetForm = () => {
    setTitle("");
    setDesc("");
    setNo("");
    setFileUploaded(false);
    setDownloadURL("");
  };

  const handleUpdateEvent = async () => {
    // Update the event data in Firestore
    const eventDocRef = doc(db, "Event", event.id);
  
    await updateDoc(eventDocRef, {
      name: title,
      description: description,
      persons: no,
      image: downloadURL,
    });
  
    console.log("Event updated successfully");
    navigation.goBack(); // Navigate back to the previous screen after updating
  };

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
        const storageRef = ref(storage, "event/" + selectedAsset.name);
  
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
  <SafeAreaView style={styles.editCard} behavior="padding">
     <View style={styles.loginCard}>
     <UploadButton
        imgUrl={fileUploaded ? {uri:downloadURL} : {uri: event.image}} // Pass the image source for your logo here
        handlePress={handleUpload} // Handle the image upload logic here
      />

    <View style={styles.loginForm}>
      <View style={styles.username}>
        <TextInput
          placeholder="Event Title"
          autoCorrect={false}
          value={title}
          onChangeText={(text) => setTitle(text)}
          style={styles.control}
        />
      </View>
      <TextInput
        placeholder="Description"
        autoCorrect={false}
        value={description}
        onChangeText={(text) => setDesc(text)}
        style={styles.textInput1}
      />

      <TextInput
        placeholder="No. of pax"
        autoCorrect={false}
        value={no}
        onChangeText={(text) => setNo(text)}
        style={styles.control}
      />

      <View style={[styles.bars]}>
        <View style={styles.bar}></View>
      </View>
    </View>

    <RectButton text={"Update"} minWidth={200} fontSize={SIZES.large} handlePress={handleUpdateEvent} />
    </View>
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
    width: 200,
    height: 200,
    borderRadius: 50,
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

export default Edit;