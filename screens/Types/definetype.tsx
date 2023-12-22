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

{
}
