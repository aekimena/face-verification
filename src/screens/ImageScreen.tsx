import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import keyCenter from "../utils/keyCenter";
import * as Progress from "react-native-progress";
import { Notifier, Easing, NotifierComponents } from "react-native-notifier";

export const ImageScreen = ({ route, navigation }) => {
  const { passedData } = route.params;
  const [uploadProgess, setProgress] = useState(0);

  function showSuccess() {
    Notifier.showNotification({
      Component: () => (
        <View style={{ padding: 30, paddingTop: 50 }}>
          <View style={[styles.infoBox, { backgroundColor: "#56C98E" }]}>
            <Text style={styles.infoText}>Face Validation Successful!</Text>
          </View>
        </View>
      ),
    });
  }
  function showError() {
    Notifier.showNotification({
      Component: () => (
        <View style={{ padding: 30, paddingTop: 50 }}>
          <View style={[styles.infoBox, { backgroundColor: "#C95656" }]}>
            <Text style={styles.infoText}>Face Validation Failed!</Text>
          </View>
        </View>
      ),
    });
  }

  async function scanImage() {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("selfie", {
      uri: passedData,
      name: "selfie.jpg",
      type: "image/jpeg",
    });
    formData.append("threshold", "1");

    xhr.open("POST", "https://idv-eu.kairos.com/v0.1/liveness-verification");
    xhr.setRequestHeader("app_id", keyCenter.appID);
    xhr.setRequestHeader("app_key", keyCenter.appKey);

    // Track upload progress
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = event.loaded / event.total;
        //   console.log(`Upload Progress: ${progress}%`);
        setProgress(progress);
        // You can update a progress bar or any UI element here
      }
    };

    // Handle response
    xhr.onload = () => {
      if (xhr.status === 200) {
        console.log("Response:", xhr.responseText);
        if (JSON.parse(xhr.responseText)?.response_data?.faces_liveness >= 1) {
          showSuccess();
        } else {
          showError();
        }
      } else {
        console.log("Error:", xhr.status, xhr.responseText);
      }
    };

    // Handle error
    xhr.onerror = () => {
      console.error("Request failed");
      showError();
    };

    // Send the request with the form data
    xhr.send(formData);
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            height: 300,
            width: 300,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: passedData }}
            style={{ height: 300, width: 300 }}
          />
        </View>
        <View style={{ marginTop: 30 }}>
          <Progress.Bar
            progress={uploadProgess}
            width={300}
            height={10}
            borderWidth={0.5}
            color="#569FC9"
          />
        </View>
      </View>
      <View style={{ padding: 20 }}>
        <Button
          title="Proceed"
          onPress={scanImage}
          color="#569FC9"
          disabled={uploadProgess > 0 && uploadProgess < 1}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoBox: {
    height: 50,
    width: "100%",

    justifyContent: "center",
    alignItems: "center",
  },
  infoText: { fontSize: 15, color: "#fff", fontWeight: "500" },
});
