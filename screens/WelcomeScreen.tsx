import { Button, StyleSheet, Text, View, Image } from "react-native";
import React from "react";

export default function WelcomeScreen({ navigation }: any) {
  return (
    <View>
      <Text style={styles.bigBlue}>Welcome</Text>
      <Button title="opciones" onPress={() => navigation.navigate("Tabs")} />

      <Image
        source={{
          uri: "http://m.gettywallpapers.com/es/wp-content/uploads/2023/06/Fondos-de-Pantalla-Calaveras-4k.jpg",
        }}
        style={styles.img}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  img: { width: 600, height: 600, resizeMode: "contain" },

  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: "rgb(77, 237, 239)",
    fontWeight: "bold",
    fontSize: 50,
  },
  red: {
    color: "red",
  },
});
