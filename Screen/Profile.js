import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'
import Header from '../component/Profile/Header'
import Items from '../component/Profile/ListItem'
import auth from '@react-native-firebase/auth';

const Profile = ({ navigation }) => {
    const signOut = () => {
        auth().signOut().then(() => {
            navigation.replace("Login")
        });
    };

    return (

        <View style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.avatar}>
                <Avatar
                    source={{
                        uri:
                            auth()?.currentUser?.photoURL
                    }}
                    rounded

                    size="xlarge"
                />
                <Text style={styles.text}>{auth()?.currentUser?.displayName}</Text>
                <Text style={styles.text}>{auth()?.currentUser?.email}</Text>
            </View>
            <View style={{ alignItems: 'flex-start' }}>
                <Items navigation={navigation} />
            </View>
            {/* logout */}
            <View style={{ height: 10 }} />

            <View style={styles.items} >
                <TouchableOpacity
                    onPress={signOut}
                    activeOpacity={0.5}
                    style={{ padding: 5 }}>

                    <Text style={{ fontSize: 16 }}>Sing Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {


    },
    avatar: {
        marginTop: 10,
        alignItems: 'center', justifyContent: "center",
        alignItems: "center",

    },
    text: {
        marginTop: 5,
        fontSize: 20
    }, items: { backgroundColor: "#fff", height: 50, justifyContent: 'center', paddingLeft: 5 },
})
