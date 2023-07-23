import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAvoidingView, View, TextInput, Image, Text, SafeAreaView } from "react-native";

import { assets, FONTS, COLORS, SIZES } from "../constants";
import { RectButton } from "../components";
import { db, auth } from "../firebase";
import { TransButton } from "../components/Button";
import { collection, doc, setDoc, addDoc} from "firebase/firestore"
import { getStorage,ref,uploadBytes,getDownloadURL } from "firebase/storage";
import * as DocumentPicker from "expo-document-picker";
import { UploadButton } from "../components/Button";

const strengthLabels = ["weak", "medium", "strong"];

const SignUp= () => {
  const navigation = useNavigation();
  const [downloadURL, setDownloadURL] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);
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
        const storageRef = ref(storage, "dp/" + selectedAsset.name);
  
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

  const handleChange = (text) => {
    getStrength(text);
  };
  
  function create() {
    const userDocRef = doc(db, "Users", auth.currentUser.uid);
  
    setDoc(userDocRef, {
      username: username,
      email: auth.currentUser.email,
      dp: downloadURL,
    })
      .then(() => {
        console.log('Data submitted');
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log(user.email);
      })
      .then(() => navigation.navigate("LoginPage"))
      .then(create)
      .catch(error => alert(error.message))
  }

  return (
    <SafeAreaView
      style={styles.loginCard}
      behaviour = "padding">

      <UploadButton
        imgUrl={fileUploaded ? {uri:downloadURL} : assets.upload} // Pass the image source for your logo here
        handlePress={handleUpload} // Handle the image upload logic here
      />

      <Text style={styles.h2}>Sign Up</Text>
      <Text style={styles.h3}>Already a member?
      <View style = {styles.login}>
      <TransButton 
            text={"Log In"}
            minWidth={0}
            handlePress={() => navigation.navigate("LoginPage")}
          /></View>
          </Text>
    
      <View style={styles.loginForm}>
        <View style={styles.username}>
          <TextInput
            placeholder="Username"
            autoCorrect={false}
            value = {username}
            onChangeText = {text => setUsername(text)}
            style={styles.control}
          />
          <View id="spinner" style={styles.spinner}></View>
        </View>
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

        <View style={[styles.bars, styles[strength]]}>
          <View style={styles.bar}></View>
        </View>
        <View style={styles.strength}>
          {strength && <Text>{strength} password</Text>}
        </View>
        <RectButton
          text={"JOIN NOW"}
          minWidth={150}
          fontSize={SIZES.large}
          handlePress={handleSignUp}
        />
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
  login: {
    top: 0,
    bottom: 0,
    left: 0 ,
    right: 0,
  }
};

export default SignUp;
