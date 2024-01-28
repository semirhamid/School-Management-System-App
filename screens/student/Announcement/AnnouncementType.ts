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

export interface AnnouncementType {
  title: string;
  detail: string;
  date: string;
  attachmentFiles: string[];
  adderUser: AdderUser;
  receivers: (null | any)[]; // Replace `any` with a more specific type if possible
  sections: Section[];
  roleNames: string[];
  uniqueKey: string;
}