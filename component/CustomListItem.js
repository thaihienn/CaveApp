import React, { Component, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const CustomListItem = ({ id, chatName, enterChat }) => {
    const [chatMessages, setChatMessages] = useState([]);


    useEffect(() => {
        const unsubscribe = firestore()
            .collection("chats")
            .doc(id)
            .collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) =>
                setChatMessages(snapshot.docs.map((doc) => doc.data()))
            );
        return unsubscribe;
    });



    return (
        <ListItem key={id}
            onPress={() => enterChat(id, chatName)}
            key={id}
            bottomDivider>
            <Avatar
                rounded
                source={{
                    uri:
                        chatMessages?.[0]?.photoURL ||
                        "https://cdn1.iconfinder.com/data/icons/app-user-interface-glyph/64/user_man_user_interface_app_person-512.png"
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800" }}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.messages}
                </ListItem.Subtitle>
            </ListItem.Content>


        </ListItem>
    );

}
export default CustomListItem;
const Styles = StyleSheet.create({

})