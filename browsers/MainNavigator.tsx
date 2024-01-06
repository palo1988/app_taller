import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { NavigationContainer } from "@react-navigation/native";
import WelcomeScreen from "../screens/WelcomeScreen";
import ListaProducto from "../screens/ListaProducto";
import RegistroProductoScreen from "../screens/RegistroProductoScreen";
import IntegrantesScreen from "../screens/IntegrantesScreen";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Registro producto" component={RegistroProductoScreen} />
      <Tab.Screen name="Lista producto" component={ListaProducto} />
      <Tab.Screen name="Integrantes" component={IntegrantesScreen} />
    </Tab.Navigator>
  );
}

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Tabs" component={MyTabs} />
      <Tab.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
}

export default function TopTabNavigator() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
