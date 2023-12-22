import { NavigationContainer } from "@react-navigation/native";
import ROUTES from "../../constants/routes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Notification from "../../screens/student/Notification/Notification";
import Login from "../../screens/shared/Auth/Login";
import BottomTabNavigator from "./BottomTabNavigator";
import DrawerNavigator from "./drawer_navigator/DrawerNavigator";
import React, { useContext } from "react";
import { HelperScreen, Home } from "../../screens";
import NoInternet from "../../screens/shared/Utilities/NoInternet";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import { AuthContext } from "../../utils/auth/auth-context";

const Stack = createNativeStackNavigator();

function AuthNavigator() {
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const authContext = useContext(AuthContext);
  const isAuthenticated = !!authContext?.getAccessToken();
  let initial = "DRAWER";
  // if (isAuthenticated) {
  //   if (currentUser.role === "parent") {
  //     initial = "PARENT";
  //   } else {
  //     initial = "DRAWER";
  //   }
  // }
  return (
    <Stack.Navigator
      initialRouteName={initial}
      screenOptions={{ statusBarStyle: "dark" }}
    >
      <Stack.Screen
        name={"LOGIN"}
        options={{
          headerTitleAlign: "center",
          statusBarStyle: "dark",
          headerShown: false,
        }}
        component={Home}
      />
      <Stack.Screen
        name={"DRAWER"}
        component={DrawerNavigator}
        options={{
          headerTitleAlign: "center",
          statusBarStyle: "dark",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"Help"}
        component={HelperScreen}
        options={{
          headerTitleAlign: "center",
          statusBarStyle: "dark",
        }}
      />
      <Stack.Screen
        name={"NoInternet"}
        component={NoInternet}
        options={{
          headerTitleAlign: "center",
          statusBarStyle: "dark",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
export default AuthNavigator;
