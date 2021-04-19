import *as React from 'react';
import {

  StyleSheet,

} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './Screen/ResgisterScreen'
import LoginScreen from './Screen/LoginScreen'
import HomeScreen from './Screen/HomeScreen'
import AddChat from './Screen/AddChatScreen'
import ChatScreen from './Screen/ChatScreen'
import EditScreen from './Screen/EditProfileScreen'
import ProScreen from './Screen/Profile'
import SplashScreen from './Screen/Splash'

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#6633CC" },
  headerTitles: { color: "white" },
  headerTintColor: "white",
  headerTitleStyle: {
    textAlign: "center",
    flex: 1
  },
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={globalScreenOptions}>
        <Stack.Screen name="Slpash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddChat" component={AddChat} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Edit" component={EditScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Pro" component={ProScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});
