import { StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import React from "react";

const CustomListItem = ({ id, chatName, enterChat }: any) => {
  return (
    <ListItem key={id} onPress={() => enterChat(id, chatName)}>
      <Avatar
        rounded
        source={{
          uri: "https://images.pexels.com/photos/171945/pexels-photo-171945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        }}
      />

      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>

        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          Subtitle example
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
