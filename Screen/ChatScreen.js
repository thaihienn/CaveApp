import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, _ScrollView } from 'react-native'
import { Avatar, Icon } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';





const ChatScreen = ({ navigation, route }) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}>
                    <Avatar
                        rounded
                        source={{
                            uri:
                                "https://cdn1.iconfinder.com/data/icons/app-user-interface-glyph/64/user_man_user_interface_app_person-512.png"
                        }} />
                    <Text style={{ marginLeft: 30 }}>{route.params.chatName} Chat</Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={navigation.goBack}>
                    <Icon name="arrow-back-outline" type='ionicon' color="black" />
                </TouchableOpacity>


            ),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20
                }}>
                    <TouchableOpacity>
                        <Icon name="video-camera" type='font-awesome' color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="call" type='ionicon' color="black" />
                    </TouchableOpacity>
                </View>
            )
        })

    }, [navigation])


    const sendMessage = () => {
        Keyboard.dismiss();



        firestore().collection("chats").doc(route.params.id).collection("messages").add({
            timestamp: firestore.FieldValue.serverTimestamp(),
            messages: input,
            displayName: auth().currentUser.displayName,
            email: auth().currentUser.email,
            photoURL: auth().currentUser.photoURL,
        });
        setInput("");
    };
    useLayoutEffect(() => {

        const unsubscribe = firestore()
            .collection('chats')
            .doc(route.params.id).
            collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => setMessages(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
            ));
        return unsubscribe;
    }, [route])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar barStyle='dark-content' backgroundColor="#6633CC" />
            <KeyboardAvoidingView behavior={Platform.OS === "android" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={-200}>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView contentContainerStyle={{ paddingTop: 10 }}>
                            {messages.map(({ id, data }) =>
                                data.email === auth().currentUser.email ? (
                                    <View key={id} style={styles.reciever}>
                                        <Avatar
                                            position="absolute"
                                            rounded
                                            bottom={-15}
                                            right={-5}
                                            size={30}
                                            source={{
                                                uri: data.photoURL,
                                            }} />
                                        <Text style={styles.recieverText}>{data.messages}</Text>
                                    </View>
                                ) : (
                                    <View key={id} style={styles.sender}>
                                        <Avatar
                                            position="absolute"
                                            rounded
                                            bottom={-15}
                                            right={-5}
                                            size={30}
                                            source={{
                                                uri: data.photoURL,
                                            }}
                                        />
                                        <Text style={styles.senderText}>{data.messages}</Text>
                                        <Text style={styles.senderName}>{data.displayName}</Text>

                                    </View>
                                ))}



                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput
                                value={input}
                                onChangeText={(text) => setInput(text)}
                                placeholder="Enter Text"
                                onSubmitEditing={sendMessage}
                                style={styles.textInput} />
                            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                                <Icon name="send" size={24} color="#2B68E6" />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    reciever: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    },
    recieverText: {},
    senderName: {
        left: 5,
        paddingRight: 5,
        marginBottom: -10,
        fontSize: 10,
        color: "white"

    },
    sender: {
        padding: 15,
        backgroundColor: "#3399FF",
        alignSelf: "flex-start",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    },
    senderText: {},
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: '#ECECEC',
        padding: 10,
        color: "grey",
        borderRadius: 40
    }
})
