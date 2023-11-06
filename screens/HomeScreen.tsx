import { collection, onSnapshot, query } from "firebase/firestore";
import CustomListItem from "../components/CustomListItem";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";

const HomeScreen = ({ navigation }: any) => {
  const [chats, setChats] = useState<any[]>([]);

  const signOutUser = () => {
    signOut(auth)
      .then(navigation.replace("Login"))
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "chats")),
      (snapchot) => {
        setChats(
          snapchot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      }
    );
    console.log(chats);
    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerLeft: () => (
        <View>
          <TouchableOpacity onPress={signOutUser}>
            <Avatar
              rounded
              source={{ uri: auth?.currentUser?.photoURL || "" }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 70,
          }}
        >
          <TouchableOpacity onPress={() => {}}>
            <Feather name="camera" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("AddChat")}>
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const enterChat = (id: string, chatName: string) => {
    navigation.navigate("Chat", { id, chatName });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem
            id={id}
            key={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
