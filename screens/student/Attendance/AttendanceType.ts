export interface Attendance {
  date: string;
  status: string;
}
export interface AttendanceRecord {
  id: number;
  status: string;
  date: string;
  student: {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    dateOfBirth: string;
    userName: string;
  };
  section: {
    id: number;
    name: string;
    capacity: number;
    grade: {
      id: number;
      name: string;
      numberOfSections: number;
      stream: string;
      branchName: string;
    };
  };
  semester: {
    id: number;
    name: string;
    academicYear: {
      id: number;
      name: string;
      year: string;
    };
  };
}

interface Teacher {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  userName: string;
}

interface Grade {
  id: number;
  name: string;
  numberOfSections: number;
  stream: string;
  branchName: string;
}

export interface AcademicYear {
  id: number;
  name: string;
  year: string;
}

export interface Section {
  id: number;
  name: string;
  capacity: number;
  grade: Grade;
}

export interface Semester {
  id: number;
  name: string;
  academicYear: AcademicYear;
}

export interface HomeRoomTeacher {
  id: number;
  teacher: Teacher;
  section: Section;
  semester: Semester;
}

export interface Student {
  firstName: string;
  middleName: string;
  lastName: string;
  studentId: string;
  email: string;
  username: string;
  selected: boolean;
}