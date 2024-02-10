import { View, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { useContext, useEffect, useState } from "react";
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
  Checkbox,
  Switch,
  Card,
  Button,
} from "native-base";
import { Calendar } from "react-native-calendars";
import React from "react";
import moment from "moment";
import { AuthContext } from "../../../utils/auth/auth-context";
import { AxiosContext } from "../../../utils/auth/axios-context";
import { ApiURL } from "../../../utils/url.global";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { AttendanceRecord } from "./AttendanceType";
import { SET_CURRENT_HELP_SCREEN } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { useTranslation } from "react-i18next";
import BackgroundTheme from "../../../assets/theme_bg"
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
interface Student {
  id: number;
  name: string;
  selected: boolean; // To track if the student is selected for attendance
}

// Sample list of students
const initialStudents: Student[] = [
  { id: 1, name: 'Alice', selected: false },
  { id: 2, name: 'Bob', selected: false },
  { id: 3, name: 'Charlie', selected: false },
  { id: 4, name: 'Alice', selected: false },
  { id: 5, name: 'Bob', selected: false },
  { id: 6, name: 'Charlie', selected: false },
  // Add more students as needed
];
export default function Attendance() {
  const { t } = useTranslation()
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const authContext = useContext(AuthContext);
  const axiosContext = useContext(AxiosContext);
  const [error, setError] = useState(0);
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const [attendanceData, setAttendanceData] = useState<Array<AttendanceRecord>>(
    [],
  );
  const [selectedDates, setSelectedDates] = useState<MarkedDates>({});
  const [isRangeSelection, setIsRangeSelection] = useState<boolean>(false);
  const [rangeStart, setRangeStart] = useState<string>('');
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const handleMonthChange = (month: any) => {
    const firstDay = new Date(month.year, month.month - 1, 2);
    const lastDay = new Date(month.year, month.month, 1);

    setStartDate(firstDay.toISOString().split("T")[0]);
    setEndDate(lastDay.toISOString().split("T")[0]);
  };

  useEffect(() => {
    dispatch({
      type: SET_CURRENT_HELP_SCREEN,
      payload: "Attendance",
    });
    const currentDate = new Date();
    const currentMonth = {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
    };
    handleMonthChange(currentMonth);

    let suffix = `?username=${currentUser.name}&from=${startDate}&to=${endDate}`;

    axiosContext?.publicAxios
      .get(ApiURL.ATTENDANCE_BY_USERNAME_DATE_RANGE + suffix, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authContext?.getAccessToken()}`,
        },
      })
      .then((res) => {
        setAttendanceData(res.data.reverse());
      })
      .catch((error) => setError((prev) => prev + 1));
  }, []);

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
      // toggleModal();
    }
  };

  const toggleStudentSelection = (id: number): void => {
    const updatedStudents = students.map((student) =>
      student.id === id ? { ...student, selected: !student.selected } : student
    );
    setStudents(updatedStudents);
  };


  const confirmAttendance = (): void => {
    const selectedStudents = students.filter((student) => student.selected);
    console.log('Selected Dates:', selectedDates);
    console.log('Selected Students for Attendance:', selectedStudents);
    // Reset selections or perform further actions
  };

  const renderStudent = ({ item }: { item: Student }) => (
    <HStack paddingY={2} paddingX={3} borderRadius={4} marginY={1} backgroundColor={'white'} style={styles.studentRow}>
      <Text style={styles.studentName}>{item.name}</Text>
      <Checkbox
        value={item.id.toString()}
        isChecked={item.selected}
        size={'sm'}
      />
    </HStack>
  );


  return (
    <VStack flex={1} >
      <VStack height={150}>
        <ZStack height={150} backgroundColor={'#00557A'} style={{ ...styles.banner, position: 'relative' }}>
          <Box
            height={150}
            width={"100%"}
            style={{ overflow: "hidden" }}
          >
            <BackgroundTheme
              height={200}
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
            height={150}
            style={styles.banner}
            px={10}
            width={"100%"}
          >
            <Center py={5} flex={1}>
              <Text fontSize={'2xl'} color={'white'} fontWeight={'semibold'} textAlign={'center'}>
                {t("attendance.title")}
              </Text>
            </Center>
          </VStack>

        </ZStack>
      </VStack>
      <VStack
        p={5}
        pb={0}
        style={styles.courses}
        backgroundColor={"#EFEFEF"}
        flex={9}
      >
        <HStack display={'flex'} alignItems={'center'} justifyContent={'flex-end'} justifyItems={'center'}>
          <Center>
            <Text style={styles.headerText}>Select Range</Text>
          </Center>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isRangeSelection ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={() => setIsRangeSelection(!isRangeSelection)}
            value={isRangeSelection}
            size={'lg'}
          />
        </HStack>

        <VStack flex={1} py={5}>
          <FlatList
            data={students}
            renderItem={renderStudent}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={
              <>
                <VStack>
                  {/* <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={toggleModal}>
                    <View style={styles.modal}>
                      <View style={styles.modalContent}>
                        <Ionicons
                          name="close-circle"
                          size={30}
                          color="red"
                          onPress={toggleModal}
                          style={styles.closeIcon}
                        />
                        <Text>Add or view attendance here</Text>
                      </View>
                    </View>
                  </Modal> */}

                  <Calendar
                    markingType={'period'}
                    markedDates={selectedDates}
                    onDayPress={handleDayPress}
                  />
                </VStack>
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
              </>
            }
            ListFooterComponent={
              <Button
                onPress={confirmAttendance}
                backgroundColor={'#00557A'}
                marginY={2}
              >
                <Text color={'white'} fontWeight={'medium'} fontSize={'lg'} >Confirm Attendance</Text>
              </Button>
            }
          />
        </VStack>
      </VStack>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  studentName: {
    fontSize: 16,
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
