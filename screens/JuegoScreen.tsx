import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  Alert,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";

import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { auth, db } from "../config/Config";
import { getDatabase, ref, set, onValue } from "firebase/database";

import { Modal } from "react-native";
import Skull from "../components/Skull";
import Skull2 from "../components/Skull2";

import { useFonts } from "expo-font";

import { Audio } from "expo-av";

// import { firebaseConfig } from '../components/Config';

export default function Juego({ navigation }: any) {
  const [tiempo, setTiempo] = useState(10);
  const [contador, setContador] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [calaveradisparo, setcalaveradisparo] = useState(0);

  const [nick, setNick] = useState(""); /////Borrar////
  const [calaveras, setcalaveras] = useState(""); /////Borrar/////
  const [sound, setSound] = useState(Audio);

  useEffect(() => {
    function leer() {
      const starCountRef = ref(db, "pruebareg/");
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();

        const dataTemp: any = Object.keys(data).map((nick) => ({
          nick,
          ...data[nick],
        }));

        setcalaveras(dataTemp);
        setNick(nick);
      });
    }

    leer();
    console.log(calaveras);
  }, []);

  type producto = {
    nick: string;
    email: string;
    password: string;
    age: string;
  };

  useEffect(() => {
    // const temporizador = setInterval(() => {
    //   setTiempo((tiempoAnterior) => tiempoAnterior-1)
    // }, 1000 //Milisegundos
    // )

    //setInterval: Función exclusiva de RN para medir el tiempo
    const temporizador = setInterval(() => {
      setTiempo((tiempoAnterior) => {
        if (tiempoAnterior == 1) {
          clearInterval(temporizador); //Detiene el temporizador
        }
        return tiempoAnterior - 1;
      });
    }, 1000); //Milésimas de un segundo
  }, []);

  useEffect(() => {
    if (tiempo == 0) {
      setcalaveradisparo(contador);
      setModalVisible(true);
      // Alert.alert("GAME OVER", "Su puntuación es: " + contador);
      setTiempo(10);
      //Función que envía la puntuación a firebase
      // puntuacion();
      //setContador(0);
    }
  }, [tiempo]);

  /////////////////////////////////////////////////////////////////

  function contar() {
    setContador(contador + 1);
    //playSound();
  }

  ////////////////////////////////////////////////////////////////

  // function reiniciarTemporizador() {
  //   setTiempo(10); // Restablece el valor del temporizador a 10 segundos
  // }

  /////////////////////////////////////////////////////////////////

  function registrar() {
    createUserWithEmailAndPassword(auth, nick, calaveras)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        guardar(nick, calaveras);

        Alert.alert(
          "REGISTRO EXITOSO",
          "Ahora destruye la mayor cantidad de calaveras en el tiempo establecido...!!!"
        );
        navigation.navigate("Juego");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Error", "Ingrese sus datos nuevamente");
        console.log(errorMessage);
        // ..
      });
  }

  //Función para guardar los datos en un json
  function guardar(nick: string, calaveras: string) {
    /* Se elimina la línea 45 debido a que ya se encuentra
  implementada en el archivo Config.js*/
    // const db = getDatabase();
    set(ref(db, "jugadores/" + nick), {
      nick: nick,
      calavera: calaveras,
      puntaje: contador,
    });
  }

  // const jugador = setNick(onValue) ;

  // Función para guardar en Firebase
  /* function puntuacion() {
    set(ref(db, "puntuacion/" + nick), {
      nick: nick,
      puntaje: contador,
    });
  }*/

  // const app = initializeApp(firebaseConfig);
  function logOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.

        navigation.navigate("Login");
        setModalVisible(false);
      })
      .catch((error) => {
        // An error happened.
        Alert.alert("Error");
      });
  }

  function reiniciar() {
    setContador(0);
    navigation.navigate("Juego");
    setModalVisible(false);
    const temporizador = setInterval(() => {
      setTiempo((tiempoAnterior) => {
        if (tiempoAnterior == 1) {
          clearInterval(temporizador); //Detiene el temporizador
          //playSound2();
        }

        return tiempoAnterior - 1;
      });
    }, 1000); //Milésimas de un segundo
  }

  //Importar fonts
  /*const [fontsLoaded] = useFonts({
    pixel: require("app_taller/assets/fonts/fonth.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }*/

  ///////////////
  /*
  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/9-mm-gunshot.mp3")
    );
    setSound(Audio);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  async function playSound2() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("app_taller/assets/go.mp3")
    );
    setSound(Audio);

    console.log("Playing Sound");
    await sound.playAsync();
  }*/

  function saveOut() {
    //puntuacion();
    guardar(nick, calaveras);

    logOut();
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://i.pinimg.com/736x/43/c5/b9/43c5b9caba61e0f530cf0bc4151075f2.jpg",
        }} // Ruta de la imagen de fondo
        style={styles.backgroundImage}
      >
        <View style={styles.fila}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{
                uri: "https://media.istockphoto.com/id/1314484635/es/vector/ilustraci%C3%B3n-vectorial-cr%C3%A1neo-negro-dibujado-a-mano-con-efectos-de-salpicadura.jpg?s=612x612&w=0&k=20&c=if3E6JhkcRHmGigvvB0kVblL41r2Q5Ofk84ZaRB0lWw=",
              }}
              style={styles.imgT}
            />
            <Text style={{ fontSize: 25, color: "white" }}> {contador}</Text>
          </View>

          <Text style={styles.time}>{tiempo}</Text>
        </View>

        <Skull presionar={contar} />
        <Skull2 presionar={contar} />

        <Modal
          visible={isModalVisible}
          // onBackdropPress={() => setModalVisible(false)}
          animationType="fade"
          transparent={true}
          style={styles.modalContainer}
        >
          <View style={styles.modal}>
            <Image
              source={{
                uri: "https://w7.pngwing.com/pngs/769/720/png-transparent-blue-and-yellow-skull-illustration-t-shirt-illustration-skull-print-prints-sticker-fictional-character-thumbnail.png",
              }}
              style={{ width: 300, height: 200 }}
            />
            <Text>{"\n"}</Text>
            <Text style={styles.txtFin}>FIN DE LA PARTIDA...!!!</Text>
            <Text></Text>
            <Text style={styles.txtResultado}>
              Usted ha destruido: {calaveradisparo} calaveras
            </Text>

            <View style={styles.row}>
              <TouchableOpacity style={styles.btn} onPress={() => reiniciar()}>
                <Text style={styles.txtBtn}>Reiniciar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btn} onPress={() => saveOut()}>
                <Text style={styles.txtBtn}>Salir</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                // Acción al presionar el botón 2
                setModalVisible(false);
              }}
            ></TouchableOpacity>
          </View>
        </Modal>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",

    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 10,
  },
  btn: {
    color: "#fff",
    height: 30,
    width: "30%",
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "black",
    margin: 10,
  },
  txtResultado: {
    color: "#fff",
    //fontFamily: "pixel",
  },
  txtFin: {
    color: "#fff",
    //
  },
  txtBtn: {
    color: "#fff",
    //fontFamily: "pixel",
  },
  modal: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    // flex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: "center",
    alignItems: "center",
    // fontFamily: "pixel",
  },
  imgT: {
    height: "100%",
    width: "29%",
  },

  fila: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    height: "5%",
    width: "80%",
    borderRadius: 30,
    top: "5%",
  },
  time: {
    color: "white",
    fontSize: 40,
  },
});
