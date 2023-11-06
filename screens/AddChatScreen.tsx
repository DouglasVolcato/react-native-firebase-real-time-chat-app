import { StyleSheet, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import React, { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const AddChatScreen = ({ navigation }: any) => {
  const [chatName, setChatName] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new chat",
      headerBackTitle: "Chats",
    });
  });

  const createChat = async () => {
    await addDoc(collection(db, "chats"), {
      chatName: chatName,
    })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter the chat name"
        value={chatName}
        onChangeText={(text) => setChatName(text)}
        leftIcon={
          <Ionicons name="ios-chatbubbles-sharp" size={24} color="black" />
        }
      />
      <Button
        buttonStyle={styles.button}
        onPress={createChat}
        title="Create new Chat"
      />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },

  button: {
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    height: 50,
    width: 150,
  },
});
