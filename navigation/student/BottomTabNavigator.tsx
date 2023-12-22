import React from "react";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import HomeStackNavigator from "./navigation_stack/HomeStackNavigator";
import { StackContainerParamList } from "../types/StackContainerParamList";
import { TabContainerParamList } from "../types/TabContainerParamList";
import {
  Attendance,
  Help,
  HelperScreen,
  Profile,
  Setting,
} from "../../screens";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { EdgeInsets } from "react-native-safe-area-context";
import { Box, HStack, Center, Text } from "native-base";
import SettingStack from "./navigation_stack/SettingStack";
import AssesmentStack from "./navigation_stack/AssesmentStack";
import AnnouncementStack from "./navigation_stack/AnnouncementStack";
import SchoolRegulation from "../../screens/shared/Rules/SchoolRegulation";
import MaterialStack from "./navigation_stack/MaterialStack";
import { useRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator<TabContainerParamList>();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="HomeStackNavigator"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        header: () => (
          <HStack
            backgroundColor={"white"}
            style={{ marginTop: 10, paddingHorizontal: 20, paddingTop: 20 }}
          >
            <Box flex={1}>
              <Center>
                <Text style={{ fontSize: 20 }}>Bisrate Gebriel IS</Text>
              </Center>
            </Box>
            <Box style={{ marginTop: -5 }}>
              <Ionicons name="notifications-outline" size={30} color="black" />
            </Box>
          </HStack>
        ),
      }}
    >
      <Tab.Screen
        name="HomeStackNavigator"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="SettingStack"
        component={SettingStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-settings" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AssessmentStack"
        component={AssesmentStack}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="AnnouncementStack"
        component={AnnouncementStack}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Attendance"
        component={Attendance}
        options={{
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name="SchoolRegulation"
        component={SchoolRegulation}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Help"
        component={Help}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="MaterialStack"
        component={MaterialStack}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
