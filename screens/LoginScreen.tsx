import {
  Alert,
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
        navigation.navigate("Juego");

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
  function limpiar() {
    //LIMPIAR LOS CAMPOS
    setCorreo("");
    setContrasenia("");
  }

  function total() {
    login();
    limpiar();
  }

  return (
    <View>
      <ImageBackground
        source={{
          uri: "https://t3.ftcdn.net/jpg/05/79/59/68/360_F_579596848_TxZpIapoifodbdWuyciISYUpJQLuvcHT.jpg",
        }}
        style={styles.img}
      />
      <Text style={{ fontSize: 30 }}>Login</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#ededed"
        placeholder="Ingrese correo"
        onChangeText={(texto) => setCorreo(texto)}
        keyboardType="email-address"
        autoCapitalize="none"
        value={correo}
      />

      <TextInput
        style={styles.input}
        placeholderTextColor="#ededed"
        placeholder="Ingresar contraseña"
        onChangeText={(texto) => setContrasenia(texto)}
        value={contrasenia}
      />

      <TouchableOpacity style={styles.button} onPress={() => total}>
        <Text style={styles.buttonText}>INGRESAR</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonReg}
        onPress={() => navigation.navigate("Registro")}
      >
        <Text style={styles.buttonTextReg}>REGISTRARSE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    flex: 5,
    width: 800,
    height: 800,
    resizeMode: "center",
  },
  container: {},
  button: {
    alignSelf: "center",
    borderRadius: 10,
    paddingVertical: 15,
    width: "50%",
    backgroundColor: "#168354",
  },
  buttonText: {
    textAlign: "center",
    color: "rgb(238, 238, 238)",
    fontSize: 16,
  },
  buttonReg: {
    fontSize: 10,
    alignSelf: "center",
    borderRadius: 25,
    paddingVertical: 20,
    width: "50%",
    backgroundColor: "#166483",
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,

    marginVertical: 10,
  },
  buttonTextReg: {
    textAlign: "center",
    color: "rgb(238, 238, 238)",
    fontSize: 12,
  },
  input: {
    fontSize: 15,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    width: "80%",
    marginVertical: 10,
  },
});
