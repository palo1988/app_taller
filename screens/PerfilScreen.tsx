import { Button, StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";

//FIREBASE
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/Config";
import { ref, onValue } from "firebase/database";
import { db } from "../config/Config";
import { FlatList } from "react-native-gesture-handler";

export default function PerfilScreen({ navigation }: any) {
  
  const [url, seturl] = useState([]);
  const [correo, setcorreo] = useState("");
  const [contrasenia, setcontrasenia] = useState("");
  const [nick, setnick] = useState("");
  const [edad, setedad] = useState("");
  const [datos, setDatos] = useState([]);

  const [id, setid] = useState("");
  const [usuario, setusuario] = useState({});
  const [player, setplayer] = useState({});
  


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("Este es el UID: ", uid);
        setid(uid);

        const starCountRef = ref(db, "gamers/" + uid+"/url");
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          setusuario(data);
          console.log("Datos del usuario:", data);
        });
      } else {
        // User is signed out
        console.log("Usuario desconectado");
      }
    });

    return () => {
      // Desuscribe la función cuando el componente se desmonta
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("Este es el UID: ", uid);
        setid(uid);

        const starCountRef = ref(db, "jugadores/" + uid);
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          setplayer(data);

          console.log("Datos del usuario:", data);
        });
      } else {
        // User is signed out
        console.log("Usuario desconectado");
      }
    });

    return () => {
      // Desuscribe la función cuando el componente se desmonta
      unsubscribe();
    };
  }, []);
  function logout() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigation.goBack();
      })
      .catch((error) => {
        // An error happened.
      });
  }

  

  // Función para obtener datos del usuario
  const obtenerDatosUsuario = (collectionPath: string) => {
    const uid = auth.currentUser?.uid;

    if (uid) {
      setid(uid);

      const starCountRef = ref(db, collectionPath + uid);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        if (collectionPath === "gamers/") {
          setusuario(data);
          console.log("Datos del usuario:", data);
        } else if (collectionPath === "jugadores/") {
          setplayer(data);
          console.log("Datos del jugador:", data);
        }
      });
    } else {
      // Usuario desconectado
      console.log("Usuario desconectado");
    }
  };

  // Efecto para obtener datos del usuario y del jugador
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        obtenerDatosUsuario("gamers/");
        obtenerDatosUsuario("jugadores/");
      }
    });

    return () => {
      // Desuscribe la función cuando el componente se desmonta
      unsubscribe();
    };
  }, []);


  return (
    <View>
      <ImageBackground
        source={{
          uri: "https://i.pinimg.com/736x/48/2a/55/482a557b575d882a32106c26b6f61024.jpg",
        }} // Ruta de la imagen de fondo
        style={styles.backgroundImage}>
      <View>
      <Text style={styles.titulo}>Datos del usuario</Text>
      <View/>
        <View>
        <View style={{ borderWidth: 1, width: "100%", marginTop: 12 }} />
        <Text style={styles.texto}>ID: {id}</Text>
        <Text style={styles.texto}>Nickname: {usuario.nick}</Text>
        <Text style={styles.texto}>Email: {usuario.email}</Text>
        <Text style={styles.texto}>Edad: {usuario.age}</Text>
        <Text style={styles.texto}>Puntaje: {player.puntaje}</Text>
        {usuario.url && (
            <Image source={{ uri: usuario.url }} style={styles.imagen} />
          )}
        
        </View>
        <Button title="Logout" onPress={() => logout()} color={'#e96d90'}/>
      </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({

  titulo:{
    fontSize:25,
    fontFamily:'monospace',
    marginTop:10,
    marginBottom:10,
    textAlign:'center',
  },

  texto:{
    fontSize:20,
    alignSelf:'center',
    fontFamily:'monospace',
    marginTop:10,
    marginBottom:10,
  },

  imagen: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
  },

  backgroundImage: {
    width: 400,
    height: 750,
    resizeMode: 'cover',
  },

});