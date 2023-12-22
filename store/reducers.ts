import { combineReducers } from "redux";
import {
  SAVE_THEME,
  SAVE_CREDENTIALS,
  SET_CURRENT_CHILD,
  SET_ALL_CHILDREN,
  SET_USER,
  ChildData,
  CurrentUser,
  SET_CURRENT_HELP_SCREEN,
  setCurrentHelpScreen,
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
  currentChild: ChildData;
  allChildren: ChildData[];
  currentUser: CurrentUser;
  currentScreen: string;
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
const initialCurrentHelpScreen = "Home";
const initialChildEmail: ChildData = {
  id: 0,
  schoolId: "",
  photoPath: null,
  transportProviderName: "",
  transportProviderPhone: "",
  medicalNote: "",
  student: {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    userName: "",
  },
  parent: {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    userName: "",
  },
  branchName: "",
  gradeName: "",
  streamName: "",
  section: {
    id: 0,
    name: "",
    capacity: 0,
    grade: {
      id: 0,
      name: "",
      numberOfSections: 0,
      stream: "",
      branchName: "",
    },
  },
  semester: {
    id: 0,
    name: "",
    academicYear: {
      id: 0,
      name: "",
      year: "",
    },
  },
};

const initialChildrenList: ChildData[] = [];

const currentChildReducer = (
  state = initialChildEmail,
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    case SET_CURRENT_CHILD:
      return action.payload;
    default:
      return state;
  }
};

const currentHelpScreen = (
  state = initialCurrentHelpScreen,
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    case SET_CURRENT_HELP_SCREEN:
      return action.payload;
    default:
      return state;
  }
};
const allChildrenReducer = (
  state = initialChildrenList,
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    case SET_ALL_CHILDREN:
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
      if (action.payload === null) return;

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
  currentChild: currentChildReducer,
  allChildren: allChildrenReducer,
  currentUser: currentUserReducer,
  currentScreen: currentHelpScreen,
});

export default rootReducer;
