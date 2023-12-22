import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Circle,
  Container,
  HStack,
  ScrollView,
  VStack,
} from "native-base";
import { Calendar, LocaleConfig } from "react-native-calendars";
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
  }, [startDate, endDate, error]);

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

  const closeModal = () => {
    setModalVisible(false);
  };
  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    setModalVisible(true);
  };

  return (
    <VStack flex={1} backgroundColor={"#1B3A4B"}>
      <VStack flex={2}>
        <Center flex={1}>
          <Text style={{ color: "white", fontSize: 24, fontWeight: "800" }}>
            {t("attendance.title")}
          </Text>
        </Center>
      </VStack>
      <VStack
        p={5}
        pb={0}
        style={styles.courses}
        backgroundColor={"#EFEFEF"}
        flex={9}
      >
        <ScrollView>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <View style={styles.modal}>
              <View style={styles.modalContent}>
                <VStack>
                  <HStack backgroundColor={"#00A698"} width={"100%"}>
                    <Center m={"auto"}>
                      <Text
                        style={{
                          fontWeight: "800",
                          fontSize: 18,
                          color: "white",
                        }}
                      >
                        {selectedDate}
                      </Text>
                    </Center>
                    <Center alignSelf={"flex-end"} top={1}>
                      <Ionicons
                        style={styles.icon}
                        name="close"
                        size={30}
                        color={"red"}
                        onPress={closeModal}
                      />
                    </Center>
                  </HStack>
                  {/* <LottieView source={require('../assets/animation/dancing.json')} autoPlay style={{ width: "100%", marginTop: -10, backgroundColor: "green.800" }} /> */}

                  <HStack p={3}>
                    <Text
                      style={{
                        fontWeight: "500",
                        fontSize: 18,
                        textAlign: "justify",
                        color: "black",
                      }}
                    >
                      {t("attendance.did-not-attended-the-class")}
                    </Text>
                  </HStack>
                </VStack>
              </View>
            </View>
          </Modal>
          <Calendar
            onMonthChange={handleMonthChange}
            markedDates={getMarkedDates(attendanceData)}
            markingType={"custom"}
            onDayPress={handleDayPress}
          />
          <VStack>
            <Center>
              <HStack
                w={"95%"}
                space={9}
                p={10}
                mt={3}
                backgroundColor={"white"}
                rounded={20}
              >
                <Circle size={10} backgroundColor={"#bb2880"}></Circle>
                <Text style={{ fontSize: 20 }}>
                  {
                    attendanceData.filter(
                      (record) => record.status.toLowerCase() === "absent",
                    ).length
                  }{" "}
                  {t("attendance.total-absent")}
                </Text>
              </HStack>
            </Center>
          </VStack>
        </ScrollView>
      </VStack>
    </VStack>
  );
}
const styles = StyleSheet.create({
  courses: {
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 4,
    width: "80%",
    alignItems: "center",
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
});
