import React, { Component, useLayoutEffect, useState } from 'react'
import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import { Icon, Input } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';



const AddChatScreen = ({ navigation }) => {
    const [input, setInput] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add a new chat =))',
            headerBackTitle: 'Chat'
        });
    }, [navigation]);
    const createChat = async () => {
        await firestore()
            .collection('chats')
            .add({
                chatName: input
            })
            .then(() => {
                navigation.goBack();
            })
            .catch((error) => alert(error));
    };
    return (

        <View style={styles.container}>
            <Input
                placeholder="Enter Chat Name"
                value={input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={createChat}
                leftIcon={
                    <Icon name="comments" type='font-awesome-5' color="black" />

                } />

            <Button
                title="Add Chat"
                color="#f194ff"
                onPress={createChat}
            />
        </View>
    )

}
export default AddChatScreen;
const styles = StyleSheet.create({
    container: {
        padding: 30,
        height: "100%"
    }
});