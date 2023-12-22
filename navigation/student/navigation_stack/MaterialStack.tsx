import ROUTES from "../../../constants/routes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AssesmentDetail } from "../../../screens";
import Material from "../../../screens/student/Material/Material";
import React from "react";
import { MaterialDetail } from "../../../screens/student/Material/MaterialDetail";

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
      <Stack.Screen
        name={"MaterialDetail"}
        component={MaterialDetail}
        options={{
          headerTitleAlign: "center",
          statusBarStyle: "dark",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
export default MaterialStack;
