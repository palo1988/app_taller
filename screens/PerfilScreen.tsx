import { Button, StyleSheet, Text, View } from "react-native";
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

        const starCountRef = ref(db, "gamers/" + uid);
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
      <View>
      <Text style={styles.titulo}>Datos del usuario</Text>
      <View/>

          <View>
            <View style={{ borderWidth: 1, width: "100%", marginTop: 12 }} />
            <Text>ID: {id}</Text>
        <Text>Nombre: {usuario.nick}</Text>
        <Text>Email: {usuario.email}</Text>
        <Text>Edad: {usuario.age}</Text>
        <Text>Puntaje: {player.puntaje}</Text>
        </View>
        <Button title="Logout" onPress={() => logout()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
  },
});