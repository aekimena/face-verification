import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { HomeScreen } from "./src/screens/HomeScreen";
import { ImageScreen } from "./src/screens/ImageScreen";
import { NotifierWrapper } from "react-native-notifier";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <GestureHandlerRootView>
      <NotifierWrapper>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{ animation: "slide_from_right" }}
            >
              <Stack.Screen
                component={HomeScreen}
                name="Home"
                options={{ title: "Home" }}
              />
              <Stack.Screen
                component={ImageScreen}
                name="Image"
                options={{ title: "Face Validation" }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </NotifierWrapper>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
