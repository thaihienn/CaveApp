import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth';

const ListItem = () => {
    return (
        <View style={styles.container}>
            <View style={styles.items} >
                <TouchableOpacity

                    activeOpacity={0.5}
                    style={{ padding: 5 }}>

                    <Text style={styles.text}>Preference</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.line} />
            <View style={styles.items} >
                <TouchableOpacity

                    activeOpacity={0.5}
                    style={{ padding: 5 }}>

                    <Text style={styles.text}>Help Center</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.line} />
            <View style={styles.items} >
                <TouchableOpacity

                    activeOpacity={0.5}
                    style={{ padding: 5 }}>

                    <Text style={styles.text}>Legal</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.line} />
            <View style={styles.items} >
                <TouchableOpacity

                    activeOpacity={0.5}
                    style={{ padding: 5 }}>

                    <Text style={styles.text}>FeedBack</Text>
                </TouchableOpacity>
            </View>
            {/* showID */}
            <View style={{ height: 10 }} />

            <View style={styles.show}>
                <TouchableOpacity

                    activeOpacity={0.5}
                    style={{ padding: 5 }}>
                    <Text style={styles.text}>Cave ID</Text>

                </TouchableOpacity>
                <Text style={{ alignItems: 'flex-end', padding: 5 }}>{auth()?.currentUser?.uid}</Text>
            </View>

            <View style={styles.line} />

            <View style={styles.show}>
                <TouchableOpacity

                    activeOpacity={0.5}
                    style={{ padding: 5 }}>
                    <Text style={styles.text}>Cave Version</Text>

                </TouchableOpacity>
                <Text style={{ alignItems: 'flex-end', padding: 5 }}>0.00.2</Text>


            </View>



        </View>
    )
}

export default ListItem

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        width: '100%'

    }, text: { fontSize: 16 }
    , line: { height: 2 }
    , items: { backgroundColor: "#fff", height: 50, justifyContent: 'center', paddingLeft: 5 },
    show: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 5,
        backgroundColor: "#fff",
        alignItems: 'center',
        height: 50,

    }
})
