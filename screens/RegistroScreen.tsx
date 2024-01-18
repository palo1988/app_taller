import {
  Alert,
  Image,
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
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

export default function RegistroScreen({ navigation }: any) {
  const [usuario, setUsuario] = useState("");

  const [url, seturl] = useState("");

  const [correo, setcorreo] = useState("");
  const [contrasenia, setcontrasenia] = useState("");
  const [nick, setnick] = useState("");

  const [edad, setedad] = useState("");
  const [userid, setuserid] = useState("");

  /*async function registro() {
    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;

        console.log("este es el user", user.uid);
        setuserid(user.uid);
        navigation.navigate("Login");

        console.log("este es el userid de registro", userid);
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
  }*/
  async function registro() {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        correo,
        contrasenia
      );
      const user = userCredential.user;

      console.log("este es el user", user.uid);
      setuserid(user.uid);
      navigation.navigate("Login");

      console.log("este es el userid de registro", userid);
      // console.log('Registro exitoso')
      guardar(user.uid, nick, edad, correo, url);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode);

      if (errorCode === "auth/email-already-in-use") {
        Alert.alert("Error", "El correo ingresado ya está en uso");
      }

      switch (errorCode) {
        case "auth/invalid-email": {
          Alert.alert("Error", "Las credenciales son incorrectas");
          // statements;
          break;
        }
        case "auth/missing-password": {
          Alert.alert("Error", "La contraseña no se ha enviado");
          // statements;
          break;
        }
        default: {
          // statements;
          Alert.alert(errorCode, errorMessage);
          break;
        }
      }
    }
  }

  //GUARDAR
  function guardar(
    id: string,
    nick: string,
    edad: string,
    correo: string,
    url: string
  ) {
    set(ref(db, "gamers/" + id), {
      nick: nick,
      age: edad,
      email: correo,
      url: url,
    });
    Alert.alert("Mensaje", "Datos guardados");
  }
  function recuperarUrl(direccion: any) {
    console.log(direccion);
    seturl(direccion);
    //return direccion
    console.log(url);
  }

  function registroT() {
    registro();
    //guardar(userid, nick, edad, correo, url);
  }

  return (
    <View>
      <ImageBackground
        source={{
          uri: "https://wegaelite.com/10362-home_default/stencil-aerografia-calavera-022-monton.jpg",
        }}
        style={styles.img1}
      />
      <Text style={styles.encabezado}>Ingrese los datos:</Text>
      <Text style={styles.titulo}>Nick</Text>
      <TextInput
        style={styles.ingreso}
        placeholder="ingrese Nick"
        onChangeText={(texto) => setnick(texto)}
      />
      <Text style={styles.titulo}>Edad</Text>
      <TextInput
        style={styles.ingreso}
        placeholder="Ingrese su edad"
        onChangeText={(texto) => setedad(texto)}
      />
      <Text style={styles.titulo}>Correo</Text>
      <TextInput
        style={styles.ingreso}
        placeholder="Escriba su correo electrónico"
        onChangeText={(texto) => setcorreo(texto)}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Text style={styles.titulo}>Contraseña</Text>
      <TextInput
        style={styles.ingreso}
        placeholder="Escriba su contraseña"
        onChangeText={(texto) => setcontrasenia(texto)}
        textContentType="password"
        secureTextEntry={true}
      />
      <Camara capturar={recuperarUrl}></Camara>
      <TouchableOpacity style={styles.button} onPress={() => registroT()}>
        <Text style={styles.buttonText}>REGISTRARSE</Text>
      </TouchableOpacity>
      <Text> {url}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  img1: {
    flex: 5,
    width: 800,
    height: 800,
    resizeMode: "center",
  },
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
