export interface ApiURLType {
  USER_LOGIN: string;
  USER_GRADES: string;
  USER_PROFILE_BY_USERNAME: string;
  SUBJECTS: string;
  ALL_SEMESTER: string;
  ANNOUNCEMENT: string;
  ANNOUNCEMENT_FOR_PARENT: string;
  ANNOUNCEMENT_BY_RECIVER_USERNAME: string;
  ANNOUNCEMENT_FOR_STUDENT: string;
  MATERIAL_BY_SECTIONID: string;
  MATERIAL_BY_FILENAME: string;
  MATERIAL_BY_USERNAME: string;
  ATTENDANCE_BY_USERNAME_DATE_RANGE: string;
  GET_USER: string;
  GET_PARENT: string;
  GET_ANNOUNCEMENT_BY_ROLE_PARENT: string;
  ASSESSMENT_REPORT: string;
  ASSESSMENT: string;
  GET_CHILDREN: string;
  GET_MATERIAL_BY_STUDENT_USERNAME: string;
  GET_SUBJECTS: string;
  GET_ASSESMENT_WEIGHTS: string;
  PARENT_FEEDBACK: string;
}

export const ApiURL: ApiURLType = {
  USER_LOGIN: `/api/Auth/Login/Login`,
  USER_GRADES: `/api/AssesmentReport/GetAssesmentReportByUsernameSubjectId/GetAssesmentReportByUsernameSubjectId?username=student&subjectId=`,
  USER_PROFILE_BY_USERNAME: `/api/StudentProfile/GetStudentBasicProfileByUsername/GetStudentBasicProfileByUsername?username=`,
  SUBJECTS: `/api/Academic/GetSubjectsByGrade/GetSubjectsByGrade?gradeId=1`,
  ALL_SEMESTER: `/api/Academic/GetAllSemesters/GetAllSemesters`,
  ANNOUNCEMENT: `/api/Announcement/GetAnnouncementByRecieverUsername?username=`,
  ANNOUNCEMENT_FOR_PARENT: `/api/Announcement/GetAnnouncementForUsers`,
  ANNOUNCEMENT_BY_RECIVER_USERNAME: `/api/Announcement/GetAnnouncementByRecieverUsername?receivername=`,
  ANNOUNCEMENT_FOR_STUDENT: `/api/Announcement/GetAnnouncementForStudents`,
  MATERIAL_BY_SECTIONID: `/api/Material/GetMaterialBySectionId?sectionId=`,
  MATERIAL_BY_FILENAME: `/api/Material/GetMaterialByFilename?filename=`,
  MATERIAL_BY_USERNAME: `/api/Material/GetMaterialByStudentUsername?username=`,
  ATTENDANCE_BY_USERNAME_DATE_RANGE: `/api/Attendance/GetAttendanceByUsernameWithDateRange/GetAttendanceByUsernameWithDateRange`,
  GET_USER: `/api/GeneralProfile/GetUserByUsername/GetUserByUsername?username=`,
  GET_PARENT: `/api/GeneralProfile/GetContactInformationByUsername/GetContactInformationByUsername?username=`,
  GET_ANNOUNCEMENT_BY_ROLE_PARENT: `/api/Announcement/GetAnnouncementByRolename?rolename=parent`,
  ASSESSMENT_REPORT: `/api/AssesmentReport/GetAssesmentReportByUsernameSubjectId/GetAssesmentReportByUsernameSubjectId`,
  ASSESSMENT: `/api/Assesment/GetAssesmentByUsernameSubjectId/GetAssesmentByUsernameSubjectId`,
  GET_CHILDREN: `/api/StudentProfile/GetChildrenBasicProfiles/GetChildrenBasicProfiles?parentUserName=`,
  GET_MATERIAL_BY_STUDENT_USERNAME: `/api/Material/GetMaterialByStudentUsername?studentUsername=`,
  GET_SUBJECTS: `/api/Academic/GetSubjectsBySectionBySemester/GetSubjectsBySectionBySemester?sectionId=`,
  GET_ASSESMENT_WEIGHTS: `/api/Assesment/GetAssesmentListByWeightId/GetAssesmentListByWeightId?assementWeightId=`,
  PARENT_FEEDBACK: `Parent/Feedback`,
};

export const LOCAL_BASE_URL = "http://138.68.155.204";
export const REMOTE_BASE_URL = "http://138.68.155.204";
