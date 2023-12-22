import { Text, StyleSheet, StatusBar } from "react-native";
import { useContext, useEffect, useState } from "react";
import { Center } from "native-base";
import { AuthContext } from "../../../utils/auth/auth-context";
import { AxiosContext } from "../../../utils/auth/axios-context";
import { ApiURL } from "../../../utils/url.global";

import { Table, Row } from "react-native-table-component";
import { VStack, ScrollView } from "native-base";
import dateFormat from "dateformat";
import Lottie from "lottie-react-native";
import { StudentProfile } from "./ProfileType";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { SET_CURRENT_HELP_SCREEN } from "../../../store/actions";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

export default function Profile() {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);
  const axiosContext = useContext(AxiosContext);
  const profilePicture = require("../../../assets/animation/profile_male.json");
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const [user, setUser] = useState<StudentProfile>({
    id: 1,
    transportProviderName: "",
    transportProviderPhone: "",
    medicalNote: "",
    student: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "",
      dateOfBirth: "",
      userName: "",
    },
    parent: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "",
      dateOfBirth: "",
      userName: "",
    },
    branchName: "",
    gradeName: "",
    streamName: "",
    section: {
      id: 1,
      name: "",
      capacity: 0,
      grade: {
        id: 1,
        name: "",
        numberOfSections: 2,
        stream: "",
        branchName: "",
      },
      success: true,
      error: false,
      message: "",
    },
    semester: {
      id: 1,
      name: "",
      academicYear: {
        id: 1,
        name: "",
        year: "",
      },
      success: true,
      error: false,
      message: "",
    },
    success: true,
    error: false,
    message: "",
  });

  const getProfile = async () => {
    try {
      await axiosContext?.publicAxios
        .get(ApiURL.USER_PROFILE_BY_USERNAME + currentUser.name, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(function (res) {
          if (res.status === 200) {
            setUser(res.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: SET_CURRENT_HELP_SCREEN,
      payload: "Profile",
    });
    getProfile();
  }, []);

  return (
    <>
      <StatusBar networkActivityIndicatorVisible />
      <VStack flex={1} backgroundColor={"#1B3A4B"}>
        <VStack style={styles.profileHolder} flex={5}>
          <Center>
            <Text style={{ color: "white", fontSize: 24, fontWeight: "800" }}>
              {t("profile.student-title")}
            </Text>
          </Center>
          <Center>
            <Lottie loop={false} source={profilePicture} style={styles.icon} />
          </Center>
          <Center>
            <Text style={styles.fullname}>
              {user.student.firstName.toUpperCase() +
                "  " +
                user.student.middleName.toUpperCase()}
            </Text>
          </Center>
        </VStack>
        <VStack
          p={5}
          pb={0}
          style={styles.background}
          backgroundColor={"#EFEFEF"}
          flex={9}
        >
          <ScrollView>
            <VStack style={styles.tableContainer}>
              <Table
                borderStyle={{
                  borderWidth: 2,
                  borderColor: "#efefef",
                  borderRadius: 10,
                }}
                style={styles.table}
              >
                <Row
                  data={[t("profile.basic-information")]}
                  style={{ ...styles.head }}
                  textStyle={styles.tableHeader}
                />
                <Row
                  data={[t("profile.first-name"), user.student.firstName]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
                <Row
                  data={[t("profile.middle-name"), user.student.middleName]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
                <Row
                  data={[t("profile.last-name"), user.student.lastName]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
                <Row
                  data={[t("global.email"), user.student.email]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
                <Row
                  data={[t("profile.phone"), user.student.phone]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
                <Row
                  data={[t("profile.gender"), user.student.gender]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
                <Row
                  data={[
                    t("profile.dob"),
                    dateFormat(user.student.dateOfBirth, "ddd, mmm, yyyy"),
                  ]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
                <Row
                  data={[t("global.username"), user.student.userName]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
              </Table>
            </VStack>

            <VStack style={styles.tableContainer}>
              <Table
                borderStyle={{
                  borderWidth: 2,
                  borderColor: "#efefef",
                  borderRadius: 10,
                }}
                style={styles.table}
              >
                <Row
                  data={[t("profile.parent-information")]}
                  style={styles.head}
                  textStyle={styles.tableHeader}
                />
                <Row
                  data={[t("profile.first-name"), user.parent.firstName]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
                <Row
                  data={[t("profile.middle-name"), user.parent.middleName]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
                <Row
                  data={[t("profile.last-name"), user.parent.lastName]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
                <Row
                  data={[t("global.email"), user.parent.email]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
                <Row
                  data={[t("profile.phone"), user.parent.phone]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
                <Row
                  data={[t("profile.gender"), user.parent.gender]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
                <Row
                  data={[
                    t("profile.dob"),
                    dateFormat(user.parent.dateOfBirth, "fullDate"),
                  ]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
                <Row
                  data={[t("global.username"), user.parent.userName]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
              </Table>
            </VStack>

            <VStack style={styles.tableContainer}>
              <Table
                borderStyle={{
                  borderWidth: 2,
                  borderColor: "#efefef",
                  borderRadius: 10,
                }}
                style={styles.table}
              >
                <Row
                  data={[t("profile.academic-information")]}
                  style={styles.head}
                  textStyle={styles.tableHeader}
                />
                <Row
                  data={[t("profile.academic-year"), user.semester.academicYear.name]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
                <Row
                  data={[t("profile.semester"), user.semester.name]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
                <Row
                  data={[t("profile.branch"), user.branchName]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
                <Row
                  data={[t("profile.stream"), user.streamName]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
                <Row
                  data={[t("profile.grade"), user.gradeName]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
                <Row
                  data={[t("profile.section"), user.section.name]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
              </Table>
            </VStack>

            <VStack style={styles.tableContainer}>
              <Table
                borderStyle={{
                  borderWidth: 2,
                  borderColor: "#efefef",
                  borderRadius: 10,
                }}
                style={styles.table}
              >
                <Row
                  data={[t("profile.additional-information")]}
                  style={styles.head}
                  textStyle={styles.tableHeader}
                />
                <Row
                  data={[t("profile.transport-provider-name"), user.transportProviderName]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
                <Row
                  data={[
                    t("profile.transport-provider-phone"),
                    user.transportProviderPhone,
                  ]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
                <Row
                  data={[t("profile.medical-note")]}
                  style={styles.text}
                  textStyle={styles.subHeader}
                />
                <Row data={[user.medicalNote]} textStyle={styles.medicaltext} />
              </Table>
            </VStack>
          </ScrollView>
        </VStack>
      </VStack>
    </>
  );
}

const styles = StyleSheet.create({
  profileHolder: {
    padding: 20,
    paddingBottom: 0,
  },

  table: {
    backgroundColor: "white",
    borderTopEndRadius: 40,
  },
  tableContainer: {
    marginVertical: 10,
    borderTopEndRadius: 20,
  },
  background: {
    borderTopStartRadius: 40,
  },
  icon: {
    width: 150,
    height: 150,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff",
  },
  head: {
    height: 50,
    backgroundColor: "#E2F8E3",
    borderTopEndRadius: 20,
  },
  tableHeader: {
    color: "black",
    textAlign: "center",
    fontWeight: "500",
    fontSize: 18,
  },
  subHeader: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 18,
  },
  textType: {
    paddingLeft: 10,
  },
  medicaltext: {
    paddingLeft: 10,
    textAlign: "justify",
    padding: 10,
  },
  semester: {
    height: 40,
    backgroundColor: "#fff",
    margin: 6,
    fontSize: 20,
    color: "#000",
    textAlign: "center",
    fontWeight: "600",
  },
  text: {
    margin: 6,
    fontSize: 18,
    height: 25,
  },
  fullname: {
    fontWeight: "700",
    fontSize: 20,
    color: "white",
  },
  textHead: {
    margin: 6,
    fontSize: 20,
    color: "#424141",
    fontWeight: "600",
  },
  textSemester: {
    margin: 6,
    fontSize: 20,
    color: "#000",
    textAlign: "center",
    fontWeight: "600",
  },
});
