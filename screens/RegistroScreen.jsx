import { Alert, Image,Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { db } from "../config/Config";
import { ref, set, onValue, update, remove } from "firebase/database";

export default function RegistroScreen() {

  const [usuario, setUsuario] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [contrasenia2, setContrasenia2] = useState("");

  const [datos, setDatos] = useState([]);


  return (
    <View>
      <Text style={styles.encabezado}>Ingrese los datos:</Text>
      <Text style={styles.titulo}>Usuario</Text>
      <TextInput style={styles.ingreso}
      placeholder="Escriba su usuario"
      onChangeText={(texto) => setUsuario(texto)}
    />
      <Text style={styles.titulo}>Correo</Text>
      <TextInput style={styles.ingreso}
      placeholder="Esriba su correo electrónico"
      onChangeText={(texto) => setCorreo(texto)}
    />
      <Text style={styles.titulo}>Contraseña</Text>
      <TextInput style={styles.ingreso}
      placeholder="Escriba su contraseña"
      onChangeText={(texto) => setContrasenia(texto)}
    />
      <Text style={styles.titulo}>Confirmar contraseña</Text>
      <TextInput style={styles.ingreso}
      placeholder="Reingrese la contraseña"
      onChangeText={(texto) => setContrasenia2(texto)}
    />

<Button title="Registrarse" color={'#b625b1'}/>

    </View>
  )
}

const styles = StyleSheet.create({

  titulo:{
    fontSize:18,
    fontFamily: 'monospace',
    marginTop:5,
    marginBottom:1,
    color:'#202446'
  },

  encabezado:{
    fontSize:20,
    fontFamily: 'monospace',
    marginTop:8,
    marginBottom:8,
    color:'#352442'
  },

  ingreso:{
    fontSize:16,
    fontFamily: 'monospace',
    marginTop:1,
    marginBottom:5,
  },

  img: { width: 700, height: 700, resizeMode: "contain" },

  container: {
    marginTop: 50,
  },

})