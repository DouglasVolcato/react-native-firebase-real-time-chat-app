import React from "react";
import { ScrollView, View, Text, StyleSheet, Image } from "react-native";

const MessageList = ({ messages, authEmail }: any) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {messages.map(
        (
          { message, displayUser, timestamp, email, photoUrl }: any,
          key: number
        ) => {
          const isCurrentUser = email === authEmail;

          return (
            <View
              key={key}
              style={
                isCurrentUser ? styles.sentMessage : styles.receivedMessage
              }
            >
              {!isCurrentUser && (
                <Image source={{ uri: photoUrl }} style={styles.profileImage} />
              )}
              <View style={styles.messageContainer}>
                <Text style={styles.messageText}>{message}</Text>
                <Text style={styles.timestamp}>
                  {new Date(
                    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
                  ).toLocaleString()}
                </Text>
                {!isCurrentUser && (
                  <Text style={styles.displayUser}>{displayUser}</Text>
                )}
              </View>
            </View>
          );
        }
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sentMessage: {
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  receivedMessage: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 8,
    maxWidth: "70%",
    minWidth: "30%",
    backgroundColor: "#DCF8C6",
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: "grey",
    marginTop: 5,
  },
  displayUser: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default MessageList;
