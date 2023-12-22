import ROUTES from "../../../constants/routes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Setting, Help, Privacy, Profile } from "../../../screens";
import SchoolRegulation from "../../../screens/shared/Rules/SchoolRegulation";

const Stack = createNativeStackNavigator();

function SettingStack() {
  return (
    <Stack.Navigator
      initialRouteName={"Setting"}
      screenOptions={{ statusBarStyle: "dark" }}
    >
      <Stack.Screen
        name={"Profile"}
        component={Profile}
        options={{
          headerTitleAlign: "center",
          statusBarStyle: "dark",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"Setting"}
        options={{
          headerTitleAlign: "center",
          statusBarStyle: "dark",
          headerShown: false,
        }}
        component={Setting}
      />
      <Stack.Screen
        name={"Help"}
        component={Help}
        options={{
          headerTitleAlign: "center",
          statusBarStyle: "dark",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"Privacy"}
        component={Privacy}
        options={{
          headerTitleAlign: "center",
          statusBarStyle: "dark",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"SchoolRegulation"}
        component={SchoolRegulation}
        options={{
          headerTitleAlign: "center",
          statusBarStyle: "dark",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
export default SettingStack;
