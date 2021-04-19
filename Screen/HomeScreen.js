import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, View, ScrollView, TouchableOpacity, Button } from 'react-native'
import { Avatar } from 'react-native-elements'
import auth from '@react-native-firebase/auth';
import CustomListItem from '../component/CustomListItem'
import firestore from '@react-native-firebase/firestore';
import { Icon } from 'react-native-elements'


const HomeScreen = ({ navigation }) => {
    const [chats, setChats] = useState([]);


    const signOut = () => {
        auth().signOut().then(() => {
            navigation.replace("Login")
        });
    };

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('chats').onSnapshot(snapshot => {
                setChats(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
        return unsubscribe;
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Cave",
            headerStyle: { backgroundColor: "#fff" },
            headerTintColor: "black",
            headerTitleStyle: {
                textAlign: "center",
                flex: 1,
                color: "black"
            },
            headerLeft: () => (
                <View style={{ marginLeft: 10 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Edit')} activeOpacity={0.5}>
                        <Avatar

                            rounded
                            source={{ uri: auth()?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    with: 80,
                    margin: 20
                }}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{ marginRight: 5 }}>
                        <Icon name="camera" type='ionicon' color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5}
                        onPress={() => navigation.push('AddChat')}>
                        <Icon
                            name="pencil-alt"
                            type='font-awesome-5'
                            color="black" />
                    </TouchableOpacity>
                </View>
            ),
        });

    }, [navigation]);

    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", {
            id,
            chatName,
        });
    }


    return (


        <SafeAreaView  >
            <ScrollView>
                {chats.map(({ id, data: { chatName } }) => (
                    <CustomListItem
                        key={id}
                        id={id}
                        chatName={chatName}
                        enterChat={enterChat} />
                ))}
            </ScrollView>
        </SafeAreaView >

    )
}

export default HomeScreen
const Styles = StyleSheet.create({

})