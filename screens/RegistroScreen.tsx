import {
  Alert,
  Image,
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { db } from "../config/Config";
import { ref, set, onValue, update, remove } from "firebase/database";
//FIREBASE
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/Config";
import Camara from "../components/Camara";
import { storage } from "../config/Config";
import { uploadBytes, getDownloadURL } from "firebase/storage";
//image picker
import * as ImagePicker from "expo-image-picker";

export default function RegistroScreen({ navigation }: any) {
  const [usuario, setUsuario] = useState("");

  const [url, seturl] = useState([]);

  const [correo, setcorreo] = useState("");
  const [contrasenia, setcontrasenia] = useState("");

  const [nick, setnick] = useState("");
  const [email, setemail] = useState("");
  const [edad, setedad] = useState("");

  //GUARDAR
  function guardar(nick: string, edad: string) {
    set(ref(db, "pruebareg/" + nick), {
      age: edad,
    });
    Alert.alert("Mensaje", "Datos guardados");
  }

  function registro() {
    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;

        navigation.navigate("Login");

        //console.log('Registro exitoso')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorCode);
        if (errorCode === "auth/email-already-in-use") {
          Alert.alert("Error", "El correo ingresado ya esta en uso");
        }

        switch (errorCode) {
          case "auth/invalid-email": {
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
  function registroT() {
    registro();
    guardar(nick, edad);
  }
  function recuperarUrl(direccion: any) {
    seturl(direccion);
    //return direccion
    console.log(url);
  }
  return (
    <View>
      <Text style={styles.encabezado}>Ingrese los datos:</Text>
      <Text style={styles.titulo}>Usuario</Text>
      <TextInput
        style={styles.ingreso}
        placeholder="ingrese Nick"
        onChangeText={(texto) => setnick(texto)}
      />
      <Text style={styles.titulo}>Correo</Text>
      <TextInput
        style={styles.ingreso}
        placeholder="Ingrese su edad"
        onChangeText={(texto) => setedad(texto)}
      />
      <TextInput
        style={styles.ingreso}
        placeholder="Esriba su correo electrónico"
        onChangeText={(texto) => setcorreo(texto)}
      />
      <Text style={styles.titulo}>Contraseña</Text>
      <TextInput
        style={styles.ingreso}
        placeholder="Escriba su contraseña"
        onChangeText={(texto) => setcontrasenia(texto)}
      />
      <Camara capturar={recuperarUrl}></Camara>
      <TouchableOpacity style={styles.button} onPress={() => registroT()}>
        <Text style={styles.buttonText}>REGISTRARSE</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 18,
    fontFamily: "monospace",
    marginTop: 5,
    marginBottom: 1,
    color: "#202446",
  },

  encabezado: {
    fontSize: 20,
    fontFamily: "monospace",
    marginTop: 8,
    marginBottom: 8,
    color: "#352442",
  },

  ingreso: {
    fontSize: 16,
    fontFamily: "monospace",
    marginTop: 1,
    marginBottom: 5,
  },

  img: { width: 700, height: 700, resizeMode: "contain" },

  container: {
    marginTop: 50,
  },
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
});
