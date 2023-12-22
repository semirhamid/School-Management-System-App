export interface MaterialType {
  id: number;
  title: string;
  description: string;
  uniqueKey: string;
  date: string;
  filePath: string[];
  adderUser: {
    firstName: string;
    middleName: string;
    lastName: string;
    userName: string;
  };
  student: {
    firstName: string;
    middleName: string;
    lastName: string;
    userName: string;
  };
  section: null;
  success: boolean;
  error: boolean;
  message: null;
}
