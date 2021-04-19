import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native'
import { Icon } from 'react-native-elements'

const Header = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor="#fff" />
            <View style={{ justifyContent: 'flex-start' }}>
                <TouchableOpacity
                    onPress={() => navigation.push('Home')}
                    activeOpacity={0.5}
                    style={{ padding: 5 }}>

                    <Icon name="arrow-back-circle-outline" type='ionicon' size={40} color="black" />
                </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'flex-start' }}>
                <TouchableOpacity onPress={() => navigation.push('Edit')}
                    activeOpacity={0.5}
                    style={{ padding: 5 }}>

                    <Text style={{ fontSize: 20, marginTop: 5 }}>Edit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#fff",
        height: 50,
        flexDirection: "row",
        justifyContent: "space-between"
    }
})
