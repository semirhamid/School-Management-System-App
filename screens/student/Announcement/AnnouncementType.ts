export interface AnnouncementType {
  id: number;
  title: string;
  detail: string;
  date: string;
  attachmentFilesPath: string[];
  poster: {
    firstName: string;
    middleName: string;
    lastName: string;
    userName: string;
  };
  receiver: {
    firstName: string;
    middleName: string;
    lastName: string;
    userName: string;
  };
  section: null;
  uniqueKey: string;
  rolename: string;
}
