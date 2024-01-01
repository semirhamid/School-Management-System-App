interface AcademicYear {
    id: number;
    name: string;
    year: string;
  }
  
  interface Grade {
    id: number;
    name: string;
    stream: string;
    branchName: string;
    numberOfSections: number;
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
  
  interface Teacher {
    firstName: string;
    middleName: string;
    lastName: string;
    userName: string;
  }
  
 export  interface Course {
    id: number;
    name: string;
    grade: Grade;
    section: Section;
    semester: Semester;
    teacher: Teacher;
  }
  


  interface Semester {
    id: number;
    name: string;
    academicYear: AcademicYear;
  }
  
  interface Teacher {
    firstName: string;
    middleName: string;
    lastName: string;
    userName: string;
  }
  
  interface AssessmentType {
    id: number;
    name: string;
    generated: boolean;
    totalWeight: number;
  }
  
  interface Subject {
    id: number;
    name: string;
    grade: Grade;
    section: Section;
    semester: Semester;
    teacher: Teacher;
  }
  
  export interface Assessment {
    id: number;
    name: string;
    weight: number;
    subject: Subject;
    assessmentType: AssessmentType;
  }
  
