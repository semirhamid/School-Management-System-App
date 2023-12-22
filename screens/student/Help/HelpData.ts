// interface HelperDataTypes {
//   id: number;
//   title: string;
//   description: string;
//   image: undefined;
// }

// interface HelpDataTypes {
//   [key: string]: HelperDataTypes[];
// }

// export const HelpData: HelpDataTypes = {
//   Assessment: [
//     {
//       id: 1,
//       title: "How to See Assessment",
//       description:
//         "Here below the cards are your assesments summary. The bold text is the name of the subject. the text below the subject name is the name of the particular teacher.",
//       image: require("../../../assets/help/assesment.jpg"),
//     },
//     {
//       id: 2,
//       title: "What is the circle on the right",
//       description:
//         "They are the summary of your grades out of 100. they are displayed once all the assesments are graded for that particular subject.",
//       image: require("../../../assets/help/assesment.jpg"),
//     },
//     {
//       id: 3,
//       title: "Why the circle is N/A",
//       description:
//         "Since the whole semester assesment is not graded yet, the circle is N/A. Once the assesment is graded the circle will display your grade out of 100.",
//       image: require("../../../assets/help/assesment.jpg"),
//     },
//     {
//       id: 4,
//       title: " How to see the detail of my grade.",
//       description:
//         "Click on any of the subject , it willnavigate you to the detail screen.",
//       image: require("../../../assets/help/assesment.jpg"),
//     },
//   ],
//   AssessmentDetail: [
//     {
//       id: 2,
//       title: "What is in the top of purple box",
//       description:
//         "This box contains the summary of the subject. The top is the name of the subject, The text below is the name of the student, the text below it is the semester and the year of the assesment.",
//       image: require("../../../assets/help/assesment_detail_subject.jpg"),
//     },
//     {
//       id: 3,
//       title: "What is Grade summary",
//       description:
//         "This contains the computed result of the assesment taken by the student, This doesnot means it is out of 100 result of the student, rather if the student continue to score like this by the end of the semester he will get this grade.",
//       image: require("../../../assets/help/assesment_detail_summary.jpg"),
//     },
//     {
//       id: 4,
//       title: "How to read my assesments",
//       description:
//         "First you need to select from list of assesment types. once you select that below it there will be a list of continues assesment you tookfor that assesment type.. then you need to select from them. once you selected that below it there will be a detail about that assesment appear.",
//       image: require("../../../assets/help/assesment_detail_step.jpg"),
//     },
//     {
//       id: 5,
//       title: "How to read the assesment result",
//       description:
//         "the one on the left is the result you got on that assesment. for example 20 out of 20. the linear progress bar is to indicate the result in bar. the below text is the name of the assesment result.",
//       image: require("../../../assets/help/assesment_detail_step.jpg"),
//     },
//     {
//       id: 6,
//       title: "What is the badge on the assesment result",
//       description:
//         "You can only see the badge if your result is in top three of the class.",
//       image: require("../../../assets/help/assesment_detail_step.jpg"),
//     },
//     {
//       id: 7,
//       title: "What is the grade analysis",
//       description:
//         "It is a bar graph that shows the ranges of grades that are scored in the class. This is only for purpose of comparison and to increase a competition.",
//       image: require("../../../assets/help/assesment_detail_analysis.jpg"),
//     },
//     {
//       id: 8,
//       title: "How to read the grade analysis",
//       description:
//         "The bar graph is divided into three with color code of red, yellow and green. The red one is the number of students who scored below 33%, the yellow one is the number of students who scored between 33% and 66%, and the green one is the number of students who scored above 66%. above each egen there is a number that indicates the number of students who scored in that range.",
//       image: require("../../../assets/help/assesment_detail_analysis.jpg"),
//     },
//   ],
//   Home: [
//     {
//       id: 1,
//       title: "What are this colorfull boxes?",
//       description:
//         "These are your menu items. You can click on them to navigate to the respective page.",
//       image: require("../../../assets/help/home_menus.jpg"),
//     },
//     {
//       id: 2,
//       title: "What are this small icons at the bottom of screen?",
//       description:
//         "These are your tab bar menu items. You can click on them to navigate between your home page and settings.",
//       image: require("../../../assets/help/tab_bar.jpg"),
//     },
//   ],
//   Setting: [
//     {
//       id: 1,
//       title: "What is in the dark blue box?",
//       description:
//         "These are your profile summary. This will show your name, email and your profile picture.",
//       image: require("../../../assets/help/dark_blue.jpg"),
//     },
//     {
//       id: 2,
//       title: "What are the items below the deep blue box?",
//       description:
//         "Those are your settings. You can click on them to navigate to the respective page.",
//       image: require("../../../assets/help/setting_items.jpg"),
//     },
//     {
//       id: 3,
//       title: "How to see my profile detail?",
//       description:
//         "There is a green box with a title View Profile. Click on it to see your profile detail.",
//       image: require("../../../assets/help/profile_eye.jpg"),
//     },
//   ],
//   Profile: [
//     {
//       id: 1,
//       title: "What is this screen",
//       description:
//         " This is your profile detail. This table contain all the information we had about you.",
//       image: require("../../../assets/help/profile_detail.jpg"),
//     },
//   ],
//   Privacy: [
//     {
//       id: 1,
//       title: "What is this screen",
//       description:
//         " This is your privacy settings. It contains the privacy policy of the school.",
//       image: require("../../../assets/help/privacy.jpg"),
//     },
//   ],
//   Rules: [
//     {
//       id: 1,
//       title: "What is this screen",
//       description:
//         " This screen contain the rules and regulations of the school. ",
//       image: require("../../../assets/help/privacy.jpg"),
//     },
//   ],
//   Help: [
//     {
//       id: 1,
//       title: "What is this screen",
//       description:
//         " This screen prepared to help you with any problem you might have. ",
//       image: require("../../../assets/images/virtual_assistant.png"),
//     },
//   ],
//   Attendance: [
//     {
//       id: 1,
//       title: "How to see my attendance",
//       description:
//         "This screen contains the attendance record of the student throughout the year. You can view your attendance on the timetable. The dates are color-coded based on your class presence. The ones marked in red are the days you didn't attend the class, the ones with a yellow circle indicate the days you attended the class but left early, and the ones with a green circle represent the days you attended the class and stayed until the end. Below the calendar, there is a summary of the number of days you attended the class and the number of days you didn't attend the class.",
//       image: require("../../../assets/help/attendance.jpg"),
//     },
//   ],
//   Announcement: [
//     {
//       id: 1,
//       title: "How to see latest announcements",
//       description:
//         "The announcements are sorted based on their date, so the one on top are the latest one.",
//       image: require("../../../assets/help/announcement.jpg"),
//     },
//     {
//       id: 2,
//       title: "How to read the detail of the announcement",
//       description:
//         "click on any of the listed announcement it will redirect youto detail page",
//       image: require("../../../assets/help/announcement.jpg"),
//     },
//     {
//       id: 3,
//       title: "How to see who posted it",
//       description:
//         "On the left side of each card the announcer name is listed with his respective role. for example in the above one it is posted by Mr. Semir whose role is Adminstrator.",
//       image: require("../../../assets/help/announcement.jpg"),
//     },
//     {
//       id: 4,
//       title: "What is the difference between the bold and the thin text",
//       description:
//         "The bold text are the title of the announcement while the thin are their description",
//       image: require("../../../assets/help/announcement.jpg"),
//     },
//     {
//       id: 5,
//       title: "What is the avatar on the left of the card",
//       description: "It is the photo of the person who made the announcement",
//       image: require("../../../assets/help/announcement.jpg"),
//     },
//     {
//       id: 6,
//       title: "How to know the date of the post",
//       description:
//         "on the right bottom edge of the card it is mentioned there.",
//       image: require("../../../assets/help/announcement.jpg"),
//     },
//   ],
//   AnnouncementDetail: [
//     {
//       id: 1,
//       title: "What is this screen",
//       description:
//         "Here you see is the detail of the announcement you clicked. The bold one is with in the box is the title of the announcement, while the thin one is the description of the announcement.",
//       image: require("../../../assets/help/announcement_detail.jpg"),
//     },
//     {
//       id: 2,
//       title: "What attachements",
//       description:
//         "Attachements are files or documents, they are attached to the announcement to give more information about the announcement. You can download them by clicking on them.",
//       image: require("../../../assets/help/announcement_detail.jpg"),
//     },
//   ],
// };
