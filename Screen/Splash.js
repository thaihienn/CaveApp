import React, { useRef, useEffect, Component } from 'react';
import {
    StyleSheet,
    Animated,
    View,
    Text,
    Image, ActivityIndicator, ImageBackground
} from 'react-native';
import Logo from '../images/logo.png';
import background from '../images/unnamed.png';

const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current
    // Initial value for opacity: 0
    React.useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 1000,
            }
        ).start();
    }, [fadeAnim])

    return (
        <Animated.View                 // Special animatable View
            style={{
                ...props.style,
                opacity: fadeAnim,
                // Bind opacity to animated value
            }}
        >
            {props.children}
        </Animated.View>
    );
}




export default class Splash extends Component {

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('Login');
        }, 4000);
    }
    render() {
        return (
            <View style={styles.container} >
                <ImageBackground source={background} style={{
                    flex: 1,
                    height: 800,
                    resizeMode: "cover",
                    justifyContent: "center"
                }}></ImageBackground>
                <FadeInView style={styles.container2}>
                    <Image style={styles.Logo} source={{
                        uri:
                            "https://cdn.dribbble.com/users/403733/screenshots/14784188/0-logo__________1____32.jpg",
                    }} />
                    <Text style={styles.text}>
                        Wellcome
                    </Text>
                    <ActivityIndicator size="large" color="white" style={{ margin: 10 }}></ActivityIndicator>
                </FadeInView>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    Logo: {
        width: 200, height: 200, borderRadius: 50

    },
    text: {
        color: "white",
        alignItems: "center",
        fontWeight: "bold",
        fontFamily: "Google Sans",
        fontSize: 40
    },
    container2: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'center'
    }, container: {
        flex: 1,
    }
});


