import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Announcement, AnnouncementDetail } from "../../../screens";

const Stack = createNativeStackNavigator();

function AnnouncementStack() {
  return (
    <Stack.Navigator
      initialRouteName={"Announcement"}
      screenOptions={{ statusBarStyle: "dark", headerShown: false }}
    >
      <Stack.Screen
        name={"Announcement"}
        options={{
          headerTitleAlign: "center",
          statusBarStyle: "dark",
          headerShown: false,
        }}
        component={Announcement}
      />
      <Stack.Screen
        name={"AnnouncementDetail"}
        component={AnnouncementDetail}
        options={{
          headerTitleAlign: "center",
          statusBarStyle: "dark",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
export default AnnouncementStack;
