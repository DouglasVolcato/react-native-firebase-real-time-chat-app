import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, Input } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { auth } from "../firebase";

const RegisterScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [imageUrl, setimageUrl] = useState("");

  function handleRegister() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        updateProfile(authUser.user, {
          displayName: name,
          photoURL:
            imageUrl ||
            "https://images.pexels.com/photos/171945/pexels-photo-171945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        });
      })
      .catch((error) => alert(error.message));
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />

      <MaterialCommunityIcons
        name="message-text"
        size={100}
        color="green"
        style={styles.messageIcon}
      />

      <View style={styles.inputContainer}>
        <Input
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Image"
          value={imageUrl}
          onChangeText={(text) => setimageUrl(text)}
        />
      </View>

      <Button
        title="Register"
        buttonStyle={styles.button}
        onPress={handleRegister}
      />
      <Button
        title="Login"
        type="outline"
        buttonStyle={styles.button}
        onPress={() => navigation.navigate("Login")}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },

  messageIcon: {
    margin: 20,
  },

  inputContainer: {
    width: 300,
  },

  button: {
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    height: 60,
    width: 150,
  },
});

export default RegisterScreen;
