import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";

//FIREBASE
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/Config";

export default function LoginScreen({ navigation }: any) {
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  function login() {
    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigation.navigate("Drawer_Welcome");

        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        /*
        if (errorCode === "auth/invalid-credential") {
          
          Alert.alert("Error", "Las credenciales son incorrectas");
        } else if (errorCode === "auth/missing-password") {
          Alert.alert("Error", "La contrasenia no se ha enviado");
        } else {
          Alert.alert(errorCode, errorMessage);
        }*/

        switch (errorCode) {
          case "auth/invalid-credential": {
            Alert.alert("Error", "Las credenciales son incorrectas");
            //statements;
            break;
          }
          case "auth/missing-password": {
            Alert.alert("Error", "La contrasenia no se ha enviado");
            //statements;
            break;
          }
          default: {
            //statements;
            Alert.alert(errorCode, errorMessage);
            break;
          }
        }
      });
  }

  return (
    <View>
      <Text style={{ fontSize: 30 }}>Login</Text>
      <TextInput
        placeholder="Ingrese correo"
        onChangeText={(texto) => setCorreo(texto)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Ingresar contraseña"
        onChangeText={(texto) => setContrasenia(texto)}
      />

      <Button title="Ingresar" onPress={() => login()} />

      <Text onPress={() => navigation.navigate("Registro")}>
        {" "}
        👉 Regístrate aquí 👈
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
