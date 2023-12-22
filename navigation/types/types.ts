import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AnnouncementType } from "../../screens/student/Announcement/AnnouncementType";
import { MaterialType } from "../../screens/student/Material/MaterialType";

export type RootStackParamList = {
  BottomTab: BottomTabParamList;
};
export type MainStackParamList = {
  DRAWER: undefined;
  LOGIN: undefined;
  Help: undefined;
  NoInternet: undefined;
};

export type AssessmentStackParamList = {
  screen: string;
  params: { id: number; name: string };
};
export type AnnouncementStackParamList = {
  screen: string;
  params: any;
};
export type MaterialStackParamList = {
  screen: string;
  params: any;
};
export type SettingStackParamList = {
  screen: string;
  params: any;
};
export type AssessmentStacks = {
  Assessment: undefined;
  AssessmentDetail: undefined;
};
export type SettingStack = {
  Setting: undefined;
  Help: undefined;
  Privacy: undefined;
  Profile: undefined;
};

export type AssessmentDetailParamList = {
  AssessmentDetail: {
    id: number;
    data: any;
    name: string;
  };
};

export type Params = {
  id: number;
};
export type BottomTabParamList = {
  Home: undefined;
  Profile: undefined;
  SettingStack: SettingStackParamList;
  AssessmentStack: AssessmentStackParamList;
  Attendance: undefined;
  Calendar: undefined;
  AnnouncementStack: AnnouncementStackParamList;
  MaterialStack: MaterialStackParamList;
  SchoolRegulation: undefined;
  Help: undefined;
  NoInternet: undefined;
};
export type MainParamList = {
  Home: string;
  Profile: string;
  Settings: string;
  AssessmentStack: string;
  Attendance: string;
  Calendar: string;
};

export type LoginType = NativeStackScreenProps<RootStackParamList>;

export interface GradeSubject {
  id: number;
  result: number;
  assesmentType: AssesmentType;
  student: User;
}

interface AssesmentType {
  id: number;
  name: string;
  generated: boolean;
  totalWeight: number;
  subject: Subject;
}

interface Subject {
  id: number;
  name: string;
  grade: Grade;
  teacher: User;
  semester: Semester;
  section: Section;
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
  capacity: string;
  grade: Grade;
}

interface Semester {
  id: number;
  name: string;
  academicYear: AcademicYear;
}

interface AcademicYear {
  id: number;
  name: string;
  year: string;
}

interface User {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  userName: string;
}

export type AnnouncementDetailParamList = {
  AnnouncmentDetail: {
    id: unknown;
    announcement: AnnouncementType;
  };
};

export type AssesmentParamList = {
  Assesment: {
    studentId: unknown;
    section: unknown;
  };
};
export type AttendanceParamList = {
  Attendance: {
    userName: string | unknown;
  };
};
export type MaterialParamList = {
  Material: {
    data: object;
  };
};

export type MaterialDetailParamList = {
  MaterialDetail: {
    id: unknown;
    material: MaterialType;
  };
};

export interface USERCREDENTIAL {
  currentUser: string;
  email: string;
  name: string;
  role: string;
}
