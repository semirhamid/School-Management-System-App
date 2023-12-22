import { NavigatorScreenParams } from "@react-navigation/native";

import { TabContainerParamList } from "./TabContainerParamList";

export type StackContainerParamList = {
  LogIn: undefined;
  Home: undefined;
  Tab: NavigatorScreenParams<TabContainerParamList>;
  Announcement: undefined;
  AnnouncmentDetali: undefined;
  Material: undefined;
  Attendance: undefined;
  Help: undefined;
  SettingStack: undefined;
  Privacy: undefined;
  NoInternet: undefined;
};
