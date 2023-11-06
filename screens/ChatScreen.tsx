import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Timestamp,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import { Avatar } from "react-native-elements";
import { auth, db } from "../firebase";
import MessageList from "../components/MessageList";

const ChatScreen = ({ navigation, route }: any) => {
  const { id, chatName } = route.params;
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: chatName,
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 70,
          }}
        >
          <TouchableOpacity>
            <FontAwesome5 name="video" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="phone" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  const sendMessage = async () => {
    Keyboard.dismiss();

    if (input.trim() !== "") {
      const message = {
        message: input.trim(),
        timestamp: Timestamp.now(),
        displayUser: auth.currentUser?.displayName,
        email: auth.currentUser?.email,
        photoUrl: auth.currentUser?.photoURL,
      };
      try {
        await updateDoc(doc(db, "chats", id), {
          messages: arrayUnion(message),
        });
        setInput("");
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    }
  };

  useLayoutEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "chats", id), (doc) => {
      if (doc.exists()) {
        const chatData = doc.data();
        if (chatData && chatData.messages) {
          const messages = chatData.messages.sort(
            (a: any, b: any) => a.timestamp - b.timestamp
          );
          console.log(messages);
          setMessages(messages);
        }
      }
    });
  }, [route]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView>
              <MessageList
                messages={messages}
                authEmail={auth.currentUser?.email}
              />
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                placeholder="Write a message"
                style={styles.textInput}
                value={input}
                onChangeText={(text) => setInput(text)}
              />
              <TouchableOpacity onPress={sendMessage}>
                <MaterialCommunityIcons name="send" size={26} color="green" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 7,
  },

  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "lightgray",
    padding: 10,
    color: "gray",
    borderRadius: 30,
  },
});
