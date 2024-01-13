import {
  Button,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function WelcomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "http://m.gettywallpapers.com/es/wp-content/uploads/2023/06/Fondos-de-Pantalla-Calaveras-4k.jpg",
        }}
        style={styles.img}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Tabs")}
      >
        <Text style={styles.buttonText}>INICIAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  img: { flex: 1, width: 790, height: 790, resizeMode: "cover" },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ab8be9",
  },
  bigBlue: {
    color: "rgb(77, 237, 239)",
    fontWeight: "bold",
    fontSize: 50,
  },
  red: {
    color: "red",
  },
  button: {
    alignSelf: "center",
    borderRadius: 10,
    paddingVertical: 15,
    width: "50%",
    backgroundColor: "rgb(43, 22, 90)",
  },
  buttonText: {
    textAlign: "center",
    color: "rgb(231, 231, 233)",
    fontSize: 25,
  },
});
