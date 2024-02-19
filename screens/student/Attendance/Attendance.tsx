import { View, StyleSheet, Modal, TouchableOpacity, Alert } from "react-native";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  Box,
  Center,
  Circle,
  Text,
  HStack,
  ScrollView,
  VStack,
  ZStack,
  FlatList,
  Switch,
  Card,
  Button,
  FormControl,
  Select,
  Checkbox,
  Pressable,
} from "native-base";
import { Calendar } from "react-native-calendars";
import React from "react";
import moment from "moment";
import { AuthContext } from "../../../utils/auth/auth-context";
import { AxiosContext } from "../../../utils/auth/axios-context";
import { ApiURL, LOCAL_BASE_URL } from "../../../utils/url.global";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { AcademicYear, AttendanceRecord, HomeRoomTeacher, Section, Semester, Student } from "./AttendanceType";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { useTranslation } from "react-i18next";
import BackgroundTheme from "../../../assets/theme_bg"
import { LayoutAnimation, Platform, UIManager } from 'react-native';

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface MarkedDates {
  [date: string]: {
    startingDay?: boolean;
    endingDay?: boolean;
    color: string;
    textColor: string;
    selected?: boolean;
  };
}
interface DayPressEvent {
  dateString: string;
  // You can add more properties here as needed
}
export default function Attendance() {
  const { t } = useTranslation()
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const authContext = useContext(AuthContext);
  const axiosContext = useContext(AxiosContext);
  const [error, setError] = useState(0);
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const [selectedDates, setSelectedDates] = useState<MarkedDates>({});
  const [isRangeSelection, setIsRangeSelection] = useState<boolean>(false);
  const [rangeStart, setRangeStart] = useState<string>('');
  const [hoomRoomTeachers, setHoomRoomTeachers] = useState<HomeRoomTeacher[]>([]);
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
  const [selectedAcademiYear, setSelectedAcademicYear] = useState<AcademicYear>();
  const [semesterByAcademicYear, setSemesterByAcademicYear] = useState<Semester[]>([]);
  const [selectedSemester, setSelectedSemester] = useState<Semester>()
  const [selectedSection, setSelectedSection] = useState<HomeRoomTeacher>()
  const [students, setStudents] = useState<Student[]>([])
  const [stackHeight, setStackHeight] = useState(180);
  const handleMonthChange = (month: any) => {
    const firstDay = new Date(month.year, month.month - 1, 2);
    const lastDay = new Date(month.year, month.month, 1);

    setStartDate(firstDay.toISOString().split("T")[0]);
    setEndDate(lastDay.toISOString().split("T")[0]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const currentDate = new Date();
      const currentMonth = {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
      };
      handleMonthChange(currentMonth);

      // Fetch homeroom teachers
      try {
        const res = await axiosContext?.authAxios.get(LOCAL_BASE_URL + ApiURL.GET_HOOMROOM_TEACHERS);
        setHoomRoomTeachers(res?.data);
      } catch (error) {
        console.warn(error);
      }

      // Fetch academic years
      try {
        const res = await axiosContext?.authAxios.get(LOCAL_BASE_URL + ApiURL.GET_ACADEMIC_YEARS);
        setAcademicYears(res?.data);
      } catch (error) {
        console.warn(error);
      }
    };

    fetchData();
  }, []); // Dependency array remains empty to mimic componentDidMount behavior


  const getMarkedDates = (attendanceData: Array<AttendanceRecord>) => {
    const markedDates: any = {};
    attendanceData.forEach((attendance) => {
      let statusColor;
      switch (attendance.status) {
        case "Present":
          statusColor = "#2EC4B6";
          break;
        case "Absent":
          statusColor = "#bb2880";
          break;
        case "Late":
          statusColor = "#F0C808";
          break;
        default:
          statusColor = "white";
      }
      markedDates[attendance.date.slice(0, 10)] = {
        customStyles: {
          container: {
            backgroundColor: statusColor,
          },
          text: {
            color: "white",
            fontWeight: "bold",
          },
        },
      };
    });
    return markedDates;
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const toggleModal = (): void => {
    setModalVisible(!modalVisible);
  };

  const changeAcademicYear = (value: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedAcademicYear(academicYears.find((year) => year.name === value));
    axiosContext?.authAxios.get(LOCAL_BASE_URL + ApiURL.GET_SEMESTERS_BY_ACADEMIC_YEAR + value)
      .then((res) => {
        setSemesterByAcademicYear(res.data);
      })
      .catch(error => console.warn(error));
    setStackHeight(280);
  }

  const changeSectionName = (value: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedSection(hoomRoomTeachers.find((section) => section.id.toString() === value));
    setStackHeight(360)
  }

  const changeSemester = (value: string) => {
    setSelectedSemester(semesterByAcademicYear.find((semester) => semester.id.toString() === value));
    axiosContext?.authAxios.post(LOCAL_BASE_URL + ApiURL.GET_STUDENTS_BY_SECTION, {
      branchName: selectedSection?.section.grade.branchName,
      gradeName: selectedSection?.section.grade.name,
      sectionName: selectedSection?.section.name,
      streamName: selectedSection?.section.grade.stream,
    }).then((res) => {
      setStudents(res.data.map((student: any) => ({ ...student, selected: false })));
    }
    ).catch(error => console.warn(error));
  }

  const handleDayPress = (day: DayPressEvent): void => {
    if (isRangeSelection) {
      if (rangeStart) {
        const newRangeStart = new Date(rangeStart);
        const newDay = new Date(day.dateString);
        if (newDay < newRangeStart) {
          setRangeStart(day.dateString);
          setSelectedDates({
            [day.dateString]: { startingDay: true, endingDay: true, color: '#00A698', textColor: '#ffffff' },
          });
        } else {
          let range: MarkedDates = {};
          for (let d = newRangeStart; d <= newDay; d.setDate(d.getDate() + 1)) {
            const key: string = d.toISOString().split('T')[0];
            range[key] = key === rangeStart || key === day.dateString
              ? { startingDay: key === rangeStart, endingDay: key === day.dateString, color: '#00A698', textColor: '#ffffff' }
              : { color: '#70d7c7', textColor: '#ffffff' };
          }
          setSelectedDates(range);
          setRangeStart('');
        }
      } else {
        setRangeStart(day.dateString);
        setSelectedDates({
          [day.dateString]: { startingDay: true, endingDay: true, color: '#00A698', textColor: '#ffffff' },
        });
      }
    } else {
      setSelectedDates({
        [day.dateString]: { selected: true, color: '#00A698', textColor: '#ffffff' },
      });
      setSelectedDate(day.dateString);
    }
  };

  const toggleStudentSelection = useCallback((studentId) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.studentId === studentId ? { ...student, selected: !student.selected } : student
      )
    );
  }, []);

  const confirmAttendance = (): void => {
    const selectedStudents = students.filter((student) => student.selected);
    const updatedList = selectedStudents.map((student) => ({
      date: selectedDate,
      sectionId: selectedSection?.section.id,
      semesterId: selectedSemester?.id,
      status: "Present",
      studentUsername: student.studentId
    }));

    axiosContext?.authAxios.post(LOCAL_BASE_URL + ApiURL.ADD_ATTENDANCE, updatedList)
      .then((res) => {
        // Assuming res.data contains a message you want to display
        const message = typeof res.data === 'string' ? res.data : "Attendance successfully added!";
        Alert.alert("Success", message);
      })
      .catch((err) => {
        // Improved error handling
        console.error(err.response?.data); // Log the error for debugging purposes
        const errorMessage = err.response?.data?.message || "Cannot add attendance";
        Alert.alert("Error", errorMessage);
      });
  };



  const renderStudent = ({ item }: { item: Student }) => (
    <StudentItem item={item} toggleStudentSelection={toggleStudentSelection} />
  );
  const StudentItem = React.memo(({ item, toggleStudentSelection }: { item: Student, toggleStudentSelection: Function }) => (
    selectedDate ? <Pressable onPress={() => toggleStudentSelection(item.studentId)} _pressed={{ opacity: 0.5 }}>
      <HStack paddingY={2} paddingX={3} borderRadius={4} marginY={1} marginX={5} backgroundColor={'white'} alignItems="center" style={styles.studentRow}>
        {/* Visual indicator of the selection */}
        <Checkbox
          value={item.studentId.toString()}
          isChecked={item.selected}
          aria-label={`Select student ${item.studentId}`}
          size={'md'}
          colorScheme={item.selected ? "green" : "red"}
          onChange={() => toggleStudentSelection(item.studentId)} // This will still work for accessibility
          accessibilityLabel="Select student"
        />

        <Text style={{ ...styles.studentName, width: '29%' }}>{item.studentId}</Text>
        <Text style={{ ...styles.studentName, textAlign: 'left', alignSelf: 'flex-start', width: '60%' }}>
          {item.firstName + " " + item.middleName}
        </Text>
      </HStack>
    </Pressable>
      : <></>
  ));

  return (
    <VStack >
      <FlatList
        data={students}
        renderItem={renderStudent}
        keyExtractor={(item) => item.studentId.toString()}
        ListHeaderComponent={
          <>
            <VStack height={stackHeight} >
              <ZStack flex={1} pb={5} backgroundColor={'#00557A'} style={{ ...styles.banner, position: 'relative' }}>
                <Box
                  height={stackHeight}
                  width={"100%"}
                  style={{ overflow: "hidden" }}
                >
                  <BackgroundTheme
                    height={stackHeight}
                    width={"100%"}
                  />

                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    style={styles.banner}
                    backgroundColor="rgba(0,21,27, 0.7)"
                  />
                </Box>
                <VStack
                  pb={5}
                  height={stackHeight}
                  style={styles.banner}
                  px={10}
                  width={"100%"}
                >
                  <Center py={5} flex={1}>
                    <Text fontSize={'2xl'} color={'white'} fontWeight={'semibold'} textAlign={'center'}>
                      {t("attendance.title")}
                    </Text>
                  </Center>
                  <VStack >
                    <FormControl>
                      <FormControl.Label _text={{ color: 'white' }}>Select Academic Year</FormControl.Label>
                      <Select
                        placeholder="Select Academic Year"
                        onValueChange={(value) => changeAcademicYear(value)}
                        selectedValue={selectedAcademiYear?.name}
                        backgroundColor={'white'}
                      >
                        {academicYears.map((year) => (
                          <Select.Item key={year.id} label={year?.name} value={year.name} />
                        ))}
                      </Select>
                    </FormControl>
                    {selectedAcademiYear && (
                      <FormControl mt={'2'}>
                        <FormControl.Label _text={{ color: 'white' }}>Select Section</FormControl.Label>
                        <Select
                          placeholder="Select Section"
                          onValueChange={(value) => changeSectionName(value)}
                          selectedValue={selectedSection?.id.toString()}
                          backgroundColor={'white'}
                        >
                          {hoomRoomTeachers.map((section) => (
                            <Select.Item key={section.id} label={section.section.grade.name + " " + section.section.name} value={section?.id.toString()} />
                          ))}
                        </Select>
                      </FormControl>
                    )}
                    {selectedSection && (
                      <FormControl mt={'2'}>
                        <FormControl.Label _text={{ color: 'white' }}>Select Semester</FormControl.Label>
                        <Select
                          placeholder="Select Semster"
                          onValueChange={(value) => changeSemester(value)}
                          selectedValue={selectedSemester?.id.toString()}
                          backgroundColor={'white'}
                        >
                          {semesterByAcademicYear.map((semester) => (
                            <Select.Item key={semester.id} label={semester.name} value={semester?.id.toString()} />
                          ))}
                        </Select>
                      </FormControl>
                    )}

                  </VStack>
                </VStack>


              </ZStack>
            </VStack>

            <VStack paddingX={5}>
              <Calendar
                markingType={'period'}
                markedDates={selectedDates}
                onDayPress={handleDayPress}
              />
            </VStack>
            {
              selectedDate ?
                <VStack paddingX={5}>
                  <HStack>
                    <Text my={5} color={'#00557A'}>
                      {moment(Object.keys(selectedDates)[0]).format('dddd, MMM YYYY')}
                    </Text>
                  </HStack>
                  <HStack justifyContent="space-between" alignItems="center" style={styles.headerRow}>
                    <Text style={[styles.headerText, styles.headerNo]}>No</Text>
                    <Text style={[styles.headerText, styles.headerStudents]}>Students</Text>
                    <Text style={[styles.headerText, styles.headerPresent]}>Check</Text>
                  </HStack>
                </VStack>
                : <></>
            }
          </>
        }
        ListFooterComponent={
          selectedDate ? <Button
            onPress={confirmAttendance}
            backgroundColor={'#00557A'}
            marginY={2}
            marginX={5}
          >
            <Text color={'white'} fontWeight={'medium'} fontSize={'lg'} >Confirm Attendance</Text>
          </Button> : <></>
        }
      />
    </VStack>
  );
}
const styles = StyleSheet.create({
  courses: {
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
  },
  studentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  studentName: {
    fontSize: 16,
    textAlign: 'left'
  },
  icon: {
    width: 40,
    height: 40,
  },
  container: {
    flex: 1,
    paddingTop: 50,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    width: '90%',
    borderRadius: 10,
  },
  closeIcon: {
    alignSelf: 'flex-end',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  modalClose: {
    fontSize: 18,
    color: "#1B3A4B",
    fontWeight: "bold",
  },
  bigContainer: {
    elevation: 20,
    flex: 1,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    textAlign: "center",
    marginHorizontal: "auto",
  },
  banner: {
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30
  },
  name: {
    fontSize: 30,
    fontWeight: "600",
    marginVertical: 10,
  },
  nameContainer: {
    marginTop: 5,
  },
  headerText: {
    fontWeight: 'bold',
    color: '#00557A', // White text for the header
  },
  itemText: {
    flex: 1,
  },
  input: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: 'white', // White background for the input box
  },
  headerRow: {
    backgroundColor: '#FFFFFF', // Adjust the color to match your theme
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    elevation: 1,
    marginBottom: 10, // Add space between rows
  },
  headerItem: {
    flex: 1, // Adjust flex distribution as needed
  }, gradeRow: {
    backgroundColor: '#FFFFFF', // Adjust the color to match your theme
    paddingVertical: 1,
    paddingHorizontal: 2,
    marginHorizontal: 1,
    marginVertical: 2,
    borderRadius: 4,
    elevation: 1,
  },
  headerNo: {
    width: '15%',
    // ... other styles you want to apply, like textAlign
  },
  headerStudents: {
    width: '45%',
    // ... other styles
  },
  headerPresent: {
    width: '20%',
    textAlign: "center",
    // ... other styles
  },
  headerTotal: {
    width: '20%',
    textAlign: "center",
    // ... other styles
  },
});
