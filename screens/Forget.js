import React, { useState } from "react";
import { View, TextInput, Text, SafeAreaView, StyleSheet } from "react-native";
import { RectButton } from "../components";
import { auth } from "../firebase"; // Import Firebase Auth
import { assets, FONTS, COLORS, SIZES } from "../constants";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resetStatus, setResetStatus] = useState(null);

  const handleResetPassword = async () => {
    try {
      await auth.sendPasswordResetEmail(email);
      setResetStatus("success");
    } catch (error) {
      console.error("Error sending password reset email:", error);
      setResetStatus("error");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.h2}>Reset Password</Text>
      <View style={styles.innerContainer}>
        <TextInput
          autoCompleteType="email"
          autoCorrect={false}
          style={styles.input}
          placeholder="Enter your email address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <RectButton
          text={"Reset Password"}
          minWidth={250}
          fontSize={16}
          handlePress={handleResetPassword}
        />
        {resetStatus === "success" && (
          <Text style={styles.successMessage}>
            Password reset email sent successfully!
          </Text>
        )}
        {resetStatus === "error" && (
          <Text style={styles.errorMessage}>
            Error sending password reset email. Please try again later.
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
  },
  h2: {
    fontSize: 36,
    fontWeight: "600",
    marginVertical: 0,
    top : -10
  },
  innerContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    fontFamily: "Arial",
    backgroundColor: "#fff",
  },
  successMessage: {
    color: "green",
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
  },
  errorMessage: {
    color: "red",
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
  },
});

export default ForgotPassword;
