export interface Course {
    id: number;
    name: string;
    grade: {
      id: number;
      name: string;
      stream: string;
      branchName: string;
      numberOfSections: number;
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
    teacher: {
      firstName: string;
      middleName: string;
      lastName: string;
      userName: string;
    };
  }


export interface MaterialStudent {
    firstName: string;
    middleName: string;
    lastName: string;
    studentId: string;
    email: string;
    username: string;
};


interface AdderUser {
  firstName: string;
  middleName: string;
  lastName: string;
  userName: string;
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
  success: boolean;
  error: boolean;
  message: string;
}

interface Student {
  firstName: string;
  middleName: string;
  lastName: string;
  userName: string;
}

export interface MaterialType {
  title: string;
  description: string;
  date: string;
  filePath: string[];
  adderUser: AdderUser;
  students: Student[];
  sections: (Section | null)[];
  uniqueKey: string;
}