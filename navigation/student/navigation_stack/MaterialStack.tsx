import ROUTES from "../../../constants/routes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Material from "../../../screens/student/Material/Material";
import React from "react";

const Stack = createNativeStackNavigator();

function MaterialStack() {
  return (
    <Stack.Navigator
      initialRouteName={"Material"}
      screenOptions={{ statusBarStyle: "dark", headerShown: false }}
    >
      <Stack.Screen
        name={"Material"}
        options={{
          headerTitleAlign: "center",
          statusBarStyle: "dark",
          headerShown: false,
        }}
        component={Material}
      />
    </Stack.Navigator>
  );
}
export default MaterialStack;
