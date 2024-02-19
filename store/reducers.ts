import { combineReducers } from "redux";
import {
  SAVE_THEME,
  SAVE_CREDENTIALS,
  SET_USER,
  CurrentUser,
  TeacherContactInfo,
  SET_TEACHER_CONTACT_INFO,
} from "./actions";

type ThemeState = {
  theme: string;
};

type CredentialsState = {
  username: string;
  password: string;
};

export type RootState = {
  theme: ThemeState;
  credentials: CredentialsState;
  currentUser: CurrentUser;
  teacherContactInfo: TeacherContactInfo
};

const initialThemeState: ThemeState = {
  theme: "light",
};

const initialCredentialsState: CredentialsState = {
  username: "",
  password: "",
};

const initialUserState: CurrentUser = {
  email: "",
  Id: "",
  name: "",
  role: "",
};

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

const initialTeacherContactInfo: TeacherContactInfo = {
  id: 0,
  alternatePhoneNumber: "",
  houseNumber: "",
  woreda: "",
  subCity: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  userDTO: {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    userName: "",
  },
  success: false,
  error: false,
  message: "",
};


const currentTeacherContactInfoReducer = (
  state = initialTeacherContactInfo,
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    case SET_TEACHER_CONTACT_INFO:
      return action.payload;
    default:
      return state;
  }
};


const themeReducer = (
  state = initialThemeState,
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    case SAVE_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};

const currentUserReducer = (
  state = initialUserState,
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    case SET_USER:
      if (action.payload === null) return state;

      return action.payload;
    default:
      return state;
  }
};


const credentialsReducer = (
  state = initialCredentialsState,
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    case SAVE_CREDENTIALS:
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers<RootState>({
  theme: themeReducer,
  credentials: credentialsReducer,
  teacherContactInfo: currentTeacherContactInfoReducer,
  currentUser: currentUserReducer,
});

export default rootReducer;
