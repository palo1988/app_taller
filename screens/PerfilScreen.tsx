<<<<<<< HEAD
=======
import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

//FIREBASE
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/Config";
import { ref, onValue } from "firebase/database";
import { db } from "../config/Config";

export default function PerfilScreen({ navigation }: any) {
  const [url, seturl] = useState([]);
  const [correo, setcorreo] = useState("");
  const [contrasenia, setcontrasenia] = useState("");
  const [nick, setnick] = useState("");
  const [edad, setedad] = useState("");
  const [datos, setDatos] = useState([]);
  /*
  useEffect(() => {
    function leer() {
      const starCountRef = ref(db, "gamers/");
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();

        const dataTemp: any = Object.keys(data).map((nick) => ({
          nick,
          ...data[nick],
        }));

        setDatos(dataTemp);
      });
    }

    leer();
    console.log(datos);
  }, []);

  type producto = {
    nick: string;
    email: string;
    password: string;
    age: string;
  };*/
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
  return (
    <View>
      <View>
        <Text>WelcomeScreen</Text>
        <Text>{usuario.nick}</Text>
        <Text>{usuario.email}</Text>
        <Text>{usuario.age}</Text>
        <Text>{player.puntaje}</Text>
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
>>>>>>> 81bb96f39fb105044431033f4f2acac607d5b661
