import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, Input } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  function handleLogin() {
    signInWithEmailAndPassword(auth, email, password).catch((error) =>
      alert(error.message)
    );
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
      </View>

      <Button title="Login" buttonStyle={styles.button} onPress={handleLogin} />
      <Button
        title="Register"
        type="outline"
        buttonStyle={styles.button}
        onPress={() => navigation.navigate("Register")}
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

export default LoginScreen;
