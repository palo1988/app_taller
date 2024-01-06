import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";

const MovimientoBoton: React.FC = () => {
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const moverBoton = () => {
    Animated.timing(position, {
      toValue: { x: 200, y: 200 }, // Nueva posición del botón
      duration: 1000, // Duración de la animación en milisegundos
      useNativeDriver: false, // Necesario para algunas animaciones
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.boton, { transform: position.getTranslateTransform() }]}
      >
        <TouchableOpacity onPress={moverBoton}>
          <Text style={styles.textoBoton}>¡Moverme!</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
