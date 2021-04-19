import React, { useRef, useState } from 'react'
import {

    Text,
    StyleSheet,
    View,
    KeyboardAvoidingView,
    StatusBar,
    Alert,
} from 'react-native'
import { Button, Input, Avatar } from "react-native-elements";
import ImagePicker from 'react-native-image-crop-picker';
import auth from '@react-native-firebase/auth';
import BottomSheet from 'react-native-simple-bottom-sheet';


const ProfileScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [image, setImage] = useState("");

    const panelRef = useRef(null);
    const notifi = () => {
        Alert.alert(
            "Done",
            "Save Profile Successful",
            [

                { text: "OK", onPress: () => navigation.navigate('Home') }
            ]
        );
    }
    const openCamera = () => {

        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            setImage(image.path);
        });
    }
    const openGallary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            setImage(image.path);
        });
    }
    const update = {
        displayName: name,
        photoURL: image,
        phoneNumber: phone,
    };
    const update2 = {

        photoURL: image,

    };
    const save = (name, phone, image) => {
        if (!name && phone && image === null) {
            auth().currentUser.updateProfile(update2);
        } else if (!name || phone === null) {
            auth().currentUser.updateProfile(update2);
            notifi();
        } else {

            auth().currentUser.updateProfile(update);
            notifi();
        }
    }

    return (


        <KeyboardAvoidingView behavior="padding" style={styles.container}  >
            <StatusBar style="light" />
            <Avatar
                source={{
                    uri:
                        image || auth()?.currentUser?.photoURL
                }}
                rounded
                onPress={() => panelRef.current.togglePanel()}
                size="xlarge"
            >
                <Avatar.Accessory size={40} onPress={() => panelRef.current.togglePanel()} />
            </Avatar>
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Full Name"
                    autoFocus type="text"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Input
                    placeholder={auth()?.currentUser?.email}
                    editable={false}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />

                <Input
                    placeholder="Phone"
                    keyboardType='numeric'
                    maxLength={10}
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                />

            </View>

            <Button containerStyle={styles.button} onPress={() => save(name, phone, image)} title="Register" />
            <BottomSheet
                isOpen={false}
                sliderMinHeight={0}
                innerContentStyle={{

                    justifyContent: "center",
                    alignItems: "center",
                }}
                ref={ref => panelRef.current = ref}>
                <Button containerStyle={styles.button}
                    onPress={openCamera} title="Open Camera" />
                <Button containerStyle={styles.button}
                    onPress={openGallary} title="Choose form Gallary" />
                <Button containerStyle={styles.button}
                    onPress={() => panelRef.current.togglePanel()} title="Cancel" />
            </BottomSheet>
        </KeyboardAvoidingView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10
    },
    inputContainer: {
        width: 350,
        marginTop: 10
    },
    button: {
        width: 300,
        marginBottom: 10,

    }
})
