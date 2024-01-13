import {
    Button,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useState } from "react";
  import { getStorage, ref, uploadBytes } from "firebase/storage";
  //image picker
  import * as ImagePicker from "expo-image-picker";
  //firebase
  import { storage } from "../config/Config";
  
  export default function Galeria() {
    const [imagen, setimagen] = useState(" ");
    //funcion para conseguir info asincrona para q espere y luego salte
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setimagen(result.assets[0].uri);
      }
    };
    //subir imagen
    async function subirImagen(nombre: string) {
      const storageRef = ref(storage, "usuarios/" + nombre);
  
      try {
        //transforma de bytes a imagen
        const response = await fetch(imagen);
        const blob = await response.blob();
  
        await uploadBytes(storageRef, blob, {
          contentType: "image/jpg",
        });
  
        console.log("La imagen se subió con éxito");
  
        // Obtiene la URL de la imagen
        // const imageURL = await getDownloadURL(storageRef);
        //console.log('URL de desacarga de la imagen', imageURL);
      } catch (error) {
        console.log(error);
      }
    }
  
    return (
      <View>
        <ImageBackground
          source={{
            uri: "https://support.mobincube.com/hc/en-us/article_attachments/202063493/canvasGallery.jpg",
          }}
          style={styles.img1}
        />
  
        <Image source={{ uri: imagen }} style={styles.img} />
  
        <TouchableOpacity style={styles.button} onPress={() => pickImage()}>
          <Text style={styles.buttonText}>ABRIR GALERIA</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={styles.buttonReg}
          onPress={() => subirImagen("avatar1")}
        >
          <Text style={styles.buttonTextReg}>Subir imagen</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    img: {
      width: 400,
      height: 300,
      resizeMode: "contain",
    },
    Text: {
      textAlign: "center",
      color: "rgb(238, 238, 238)",
      fontSize: 50,
    },
  
    img1: {
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
      backgroundColor: "#7e03ab",
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
      backgroundColor: "#2e8adc",
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