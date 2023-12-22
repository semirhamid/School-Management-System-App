import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ROUTES from "../../../constants/routes";
import { Home } from "../../../screens";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import { StyleSheet } from "react-native";

import React from "react";

const Stack = createNativeStackNavigator();

function HomeStackNavigator() {
  console.log("homestack render");
  return (
    <Stack.Navigator initialRouteName={ROUTES.HOME}>
      <Stack.Screen
        name={ROUTES.HOME}
        component={Home}
        options={{
          headerTitleAlign: "center",
          statusBarStyle: "dark",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
export default HomeStackNavigator;
