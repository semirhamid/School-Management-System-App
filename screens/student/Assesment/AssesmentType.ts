interface Student {
  firstName: string;
  middleName: string;
  lastName: string;
  studentId: string;
  email: string;
  username: string;
}

interface Teacher {
  firstName: string;
  middleName: string;
  lastName: string;
  userName: string;
}

interface Subject {
  id: number;
  name: string;
  grade: {
    id: number;
    name: string;
    stream: string;
    branchName: string;
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
  teacher: Teacher;
}

interface AssessmentType {
  id: number;
  name: string;
  generated: boolean;
  totalWeight: number;
}

interface AssessmentWeight {
  id: number;
  name: string;
  weight: number;
  subject: Subject;
  assessmentType: AssessmentType;
}

export interface Assessment {
  id: number;
  result: number | null;
  isSubmitted: boolean;
  isApproved: boolean;
  student: Student;
  assessmentWeight: AssessmentWeight;
}
interface Type2Subject {
  id: number;
  name: string;
  grade: {
    id: number;
    name: string;
    stream: string;
    branchName: string;
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

interface Type2AssessmentType {
  id: number;
  name: string;
  generated: boolean;
  totalWeight: number;
}

export interface Type2Assessment {
  id: number;
  name: string;
  weight: number;
  subject: Type2Subject;
  assessmentType: Type2AssessmentType;
}