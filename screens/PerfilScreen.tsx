import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList, TextInput } from "react-native-gesture-handler";

import { db } from "../config/Config";
import { ref, set, onValue, update, remove } from "firebase/database";

export default function PerfilScreen({ navigation }: any) {
  const [url, seturl] = useState([]);
  const [correo, setcorreo] = useState("");
  const [contrasenia, setcontrasenia] = useState("");
  const [nick, setnick] = useState("");
  const [edad, setedad] = useState("");
  const [datos, setDatos] = useState([]);

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
  };

  return (
    <View>
      <Text style={styles.titulo}>Detalles</Text>
      <View style={{ borderWidth: 1, width: "100%", marginTop: 12 }} />
      <FlatList
        data={datos}
        renderItem={({ item }: { item: producto }) => (
          <View>
            <View style={{ borderWidth: 1, width: "100%", marginTop: 12 }} />
            <Text>Nickname: {item.nick}</Text>
            <Text>Correo: {item.email}</Text>
            <Text>Contraseña: {item.password}</Text>
            <Text>Edad: {item.age}</Text>
          </View>
        )}
      />
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
