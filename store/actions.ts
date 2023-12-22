import { Dispatch } from "redux";

export const SAVE_THEME = "SAVE_THEME";

export const saveTheme = (theme: string) => ({
  type: SAVE_THEME,
  payload: theme,
});
export const SAVE_CREDENTIALS = "SAVE_CREDENTIALS";
export const saveCredentials = (username: string, password: string) => ({
  type: SAVE_CREDENTIALS,
  payload: {
    username,
    password,
  },
});
export const SET_CURRENT_HELP_SCREEN = "SET_CURRENT_HELP_SCREEN";
export const setCurrentHelpScreen = (screenName: string) => ({
  type: SET_CURRENT_HELP_SCREEN,
  payload: screenName,
});

export const SET_CURRENT_CHILD = "SET_CURRENT_CHILD";
export const setCurrentChild = (currentChild: ChildData) => ({
  type: SET_CURRENT_CHILD,
  payload: currentChild,
});

export const SET_ALL_CHILDREN = "SET_ALL_CHILDREN";
export const setAllChildren = (allChildren: ChildData[]) => ({
  type: SET_ALL_CHILDREN,
  payload: allChildren,
});

export const SET_USER = "SET_USER";
export const setUser = (user: CurrentUser) => ({
  type: SET_USER,
  payload: user,
});

export interface CurrentUser {
  email: string;
  Id: string;
  role: string;
  name: string;
}
interface AcademicYear {
  id: number;
  name: string;
  year: string;
}

interface Grade {
  id: number;
  name: string;
  numberOfSections: number;
  stream: string;
  branchName: string;
}

interface Section {
  id: number;
  name: string;
  capacity: number;
  grade: Grade;
}

interface Semester {
  id: number;
  name: string;
  academicYear: AcademicYear;
}

interface User {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  userName: string;
}

export interface ChildData {
  id: number;
  schoolId: string;
  photoPath: string | null;
  transportProviderName: string;
  transportProviderPhone: string;
  medicalNote: string;
  student: User;
  parent: User;
  branchName: string;
  gradeName: string;
  streamName: string;
  section: Section;
  semester: Semester;
}
