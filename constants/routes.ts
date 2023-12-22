export interface ROUTESType {
  LOGIN: string;
  REGISTER: string;
  NOTIFICATION: string;
  HOME: string;
  HOME_STACK: string;
  GRADE: string;
  WALLET: string;
  BOTTOM_TAB: string;
  SETTINGS: string;
  ASSESSMENTS: string;
  ASSESSMENT_DETAILS: string;
  ANNOUNCEMENT: string;
  ANNOUNCEMENT_DETAIL: string;
  MATERIAL_STACK: string;
}

export const ROUTES: ROUTESType = {
  MATERIAL_STACK: "MaterialStack",
  LOGIN: "Login",
  REGISTER: "Register",
  NOTIFICATION: "Notification",
  HOME: "Home",
  HOME_STACK: "HomeStack",
  GRADE: "Grade",
  WALLET: "Wallet",
  BOTTOM_TAB: "BottomTab",
  SETTINGS: "Settings",
  ASSESSMENTS: "Assessments",
  ASSESSMENT_DETAILS: "AssessmentDetails",
  ANNOUNCEMENT: "Announcement",
  ANNOUNCEMENT_DETAIL: "AnnouncementDetail",
};

export default ROUTES;
