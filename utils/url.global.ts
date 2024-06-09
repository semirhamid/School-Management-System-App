import { TeacherAddress } from './../screens/shared/Profile/ProfileType';
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
  // assesment
  GET_SUBJECT_BY_USERNAME: string;
  GET_ASSESSMENT_WEIGHT_BY_SUBJECT_ID: string;
  ADD_MATERIAL_MULTIPLE: string;
  GET_STUDENTS_BY_SECTION: string;
  GET_MATERIAL_BY_ADDEDUSER: string;
  UPDATE_MATERIAL: string;
  DELETE_MATERIAL: String;
  REMOVE_ATTACHEMENT: string;
  ADD_MATERIAL_TO_STUDENTS: string;
  UPDATE_MATERIAL_FOR_STUDENTS: string;
  GET_ANNOUNCEMENTS: string;
  UPDATE_ANNOUNCEMENT: string;
  DELETE_ANNOUNCEMENT: String;
  REMOVE_ATTACHEMENT_FROM_ANNOUNCEMENT: string;
  ADD_ANNOUNCEMENT: string;
  GET_ASSESSMENT_BY_WEIGHT_ID: string;
  ADD_MULTIPLE_ASSESMENT: string;
  UPDATE_ASSESMENT: string;
  ADD_SINGLE_ASSESMENT: string;
  GET_CONTACT_INFORMATION: string;
  GET_HOOMROOM_TEACHERS: string;
  GET_ACADEMIC_YEARS: string;
  GET_SEMESTERS_BY_ACADEMIC_YEAR: string;
  ADD_ATTENDANCE: string;
  CREATE_ASSESSMENT_TABLE: string;
  UPDATE_MULTIPLE_ASSESSMENT: string;
  ATTENDANCE_BY_SECTION_ID: string;
  TeacherAddress: string;

}

export const ApiURL: ApiURLType = {
  USER_LOGIN: `/api/Auth/Login/Login`,
  USER_GRADES: `/api/AssesmentReport/GetAssesmentReportByUsernameSubjectId/GetAssesmentReportByUsernameSubjectId?username=student&subjectId=`,
  USER_PROFILE_BY_USERNAME: `/api/GeneralProfile/GetUserByUsername/GetUserByUsername/`,
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
  GET_SUBJECT_BY_USERNAME: `/api/Academic/GetSubjectsByUsername/GetSubjectsByUsername`,
  GET_ASSESSMENT_WEIGHT_BY_SUBJECT_ID: `/api/Assesment/GetAssesmentWeightsBySubjectId/GetAssesmentWeightsBySubjectId?subjectId=`,
  ADD_MATERIAL_MULTIPLE: `/api/Material/AddMaterialToMultipleSections`,
  GET_STUDENTS_BY_SECTION: `/api/Assesment/GetStudentsInSection/GetStudentsInSection`,
  GET_MATERIAL_BY_ADDEDUSER: `/api/Material/GetMaterialByAddedUsername`,
  UPDATE_MATERIAL: `/api/Material/UpdateMaterialsForSections`,
  DELETE_MATERIAL: `/api/Material/DeleteMaterialByUniqueKey?key=`,
  REMOVE_ATTACHEMENT: `/api/Material/RemoveAttachmentFromSelectedMaterialByUniqueKey?uniqueKey=`,
  ADD_MATERIAL_TO_STUDENTS: `/api/Material/AddMaterialToMultipleStudents`,
  UPDATE_MATERIAL_FOR_STUDENTS: `/api/Material/UpdateMaterialsForStudents`,
  GET_ANNOUNCEMENTS: `/api/Announcement/GetAnnouncementByPosterUsername`,
  UPDATE_ANNOUNCEMENT: "/api/Announcement/UpdateAnnouncement",
  DELETE_ANNOUNCEMENT: "/api/Announcement/DeleteAnnouncementByUniqueKey?key=",
  REMOVE_ATTACHEMENT_FROM_ANNOUNCEMENT: "/api/Announcement/RemoveAttachementByUniqueKey?uniqueKey=",
  ADD_ANNOUNCEMENT: "/api/Announcement/AddAnnouncementsToMultipleUsers",
  GET_ASSESSMENT_BY_WEIGHT_ID: "/api/Assesment/GetAssesmentByWeightId/GetAssesmentByWeightId?assementWeightId=",
  ADD_MULTIPLE_ASSESMENT: "/api/Assesment/UpdateMultipleAssesment/UpdateMultipleAssesment",
  ADD_SINGLE_ASSESMENT: "/api/Assesment/AddAssesment/AddAssesment",
  UPDATE_ASSESMENT: "/api/Assesment/UpdateAssesment/UpdateAssesment",
  GET_CONTACT_INFORMATION: "/api/GeneralProfile/GetContactInformationByUsername/GetContactInformationByUsername",
  GET_HOOMROOM_TEACHERS: "/api/Attendance/GetHomeRoomTeacherByUsername/GetHomeRoomTeacherByUsername",
  GET_ACADEMIC_YEARS: "/api/Academic/GetAllAcademicYears/GetAllAcademicYears",
  GET_SEMESTERS_BY_ACADEMIC_YEAR: "/api/Academic/GetSemestersByAcademicYear/GetSemestersByAcademicYear?academicYear=",
  ADD_ATTENDANCE: "/api/Attendance/AddAttendance/AddAttendance",
  CREATE_ASSESSMENT_TABLE: "/api/Assesment/AddMultipleAssesment/AddMultipleAssesment",
  UPDATE_MULTIPLE_ASSESSMENT: "/api/Assesment/UpdateMultipleAssesment/UpdateMultipleAssesment",
  ATTENDANCE_BY_SECTION_ID: "/api/Attendance/GetAttendanceBySectionIdExactDate/GetAttendanceBySectionIdExactDate?",
  TeacherAddress: '/api/GeneralProfile/GetContactInformationByUsername/GetContactInformationByUsername'
};

export const LOCAL_BASE_URL = "https://lumos.et";
export const REMOTE_BASE_URL = "https://lumos.et";

