import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AssesmentDetail, Assesments } from "../../../screens";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

function AssesmentStack() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      initialRouteName="Assesment"
      screenOptions={{ statusBarStyle: "dark", headerShown: false }}
    >
      <Stack.Screen
        name="Assesment"
        options={{
          headerTitleAlign: "center",
          statusBarStyle: "dark",
          headerShown: false,
        }}
        component={Assesments}
      />
      <Stack.Screen
        name="AssesmentDetail"
        component={AssesmentDetail}
        options={{
          headerTitleAlign: "center",
          statusBarStyle: "dark",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default AssesmentStack;
