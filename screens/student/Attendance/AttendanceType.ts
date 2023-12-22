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
