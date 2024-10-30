import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";

export const HomeScreen = ({ navigation }) => {
  async function openCamera() {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [3, 3],
      quality: 1,
      cameraType: ImagePicker.CameraType.front,
    });

    if (!result.canceled) {
      navigation.navigate("Image", { passedData: result.assets[0].uri });
    }
  }
  async function openGallery() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [3, 3],
      quality: 1,
      cameraType: ImagePicker.CameraType.front,
    });

    if (!result.canceled) {
      navigation.navigate("Image", { passedData: result.assets[0].uri });
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ gap: 20 }}>
        <Button title="open camera" onPress={openCamera} />
        <Button title="Open Gallery" onPress={openGallery} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
