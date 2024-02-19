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


export const SET_TEACHER_CONTACT_INFO = "SET_TEACHER_CONTACT_INFO";
export const setTeacherInfo = (teacherContactInfo: TeacherContactInfo) => ({
  type: SET_TEACHER_CONTACT_INFO,
  payload: teacherContactInfo,
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


interface UserData {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string; 
  userName: string;
}

export interface TeacherContactInfo {
  id: number;
  alternatePhoneNumber: string;
  houseNumber: string;
  woreda: string;
  subCity: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  userDTO: UserData;
  success: boolean;
  error: boolean;
  message: string;
}
