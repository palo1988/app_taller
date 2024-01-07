import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ImageBackground,
} from "react-native";

const MovimientoBoton: React.FC = () => {
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const moverBoton = () => {
    Animated.timing(position, {
      toValue: { x: -50, y: -100 }, // Nueva posición del botón
      duration: 1000, // Duración de la animación en milisegundos
      useNativeDriver: false, // Necesario para algunas animaciones
    }).start();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://p4.wallpaperbetter.com/wallpaper/559/711/811/skulls-black-1280x1024-art-black-hd-art-wallpaper-preview.jpg",
        }}
        style={styles.img}
      />
      <Animated.View
        style={[styles.boton, { transform: position.getTranslateTransform() }]}
      >
        <TouchableOpacity onPress={moverBoton}>
          <Text style={styles.textoBoton}>APLASTAFF</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  img: { flex: 1, width: 800, height: 800, resizeMode: "cover" },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d5cee3",
  },
  boton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  textoBoton: {
    color: "white",
    fontSize: 18,
  },
});

export default MovimientoBoton;
