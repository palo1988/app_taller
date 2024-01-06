import { Button, StyleSheet, Text, View, Image } from "react-native";
import React from "react";

export default function WelcomeScreen({ navigation }: any) {
  return (
    <View>
      <Text style={styles.bigBlue}>Welcome</Text>
      <Button
        title="Ir a Registro"
        onPress={() => navigation.navigate("Tabs")}
      />
      <Image
        source={{
          uri: "https://render.fineartamerica.com/images/rendered/default/print/8/8/break/images/artworkimages/medium/2/indifference-mario-sanchez-nevado.jpg",
        }}
        style={styles.img}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  img: { width: 700, height: 700, resizeMode: "contain" },

  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 30,
  },
  red: {
    color: "red",
  },
});
