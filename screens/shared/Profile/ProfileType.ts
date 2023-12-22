export interface Student {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  userName: string;
}

export interface Parent {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  userName: string;
}

export interface Grade {
  id: number;
  name: string;
  numberOfSections: number;
  stream: string;
  branchName: string;
}

export interface Section {
  id: number;
  name: string;
  capacity: number;
  grade: Grade;
  success: boolean;
  error: boolean;
  message: string;
}

export interface AcademicYear {
  id: number;
  name: string;
  year: string;
}

export interface Semester {
  id: number;
  name: string;
  academicYear: AcademicYear;
  success: boolean;
  error: boolean;
  message: string;
}

export interface StudentProfile {
  id: number;
  transportProviderName: string;
  transportProviderPhone: string;
  medicalNote: string;
  student: Student;
  parent: Parent;
  branchName: string;
  gradeName: string;
  streamName: string;
  section: Section;
  semester: Semester;
  success: boolean;
  error: boolean;
  message: string;
}
