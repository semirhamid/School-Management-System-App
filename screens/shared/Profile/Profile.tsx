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
import { StudentProfile, TeacherAddress, TeacherProfile } from "./ProfileType";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

export default function Profile() {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);
  const axiosContext = useContext(AxiosContext);
  const profilePicture = require("../../../assets/animation/profile_male.json");
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const [user, setUser] = useState<TeacherProfile>();
  const [userAddress, setUserAddress] = useState<TeacherAddress>();

  const getProfile = async () => {
    try {
      await axiosContext?.authAxios
        .get(ApiURL.USER_PROFILE_BY_USERNAME, {
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
  const getAddress = async () => {
    try {
      await axiosContext?.authAxios
        .get(ApiURL.TeacherAddress, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(function (res) {

          if (res.status === 200) {
            setUserAddress(res.data);
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
    getProfile();
    getAddress();
  }, []);

  return (
    <>
      <StatusBar networkActivityIndicatorVisible />
      <VStack flex={1} backgroundColor={"#1B3A4B"}>
        <VStack style={styles.profileHolder} flex={2}>
          <Center>
            <Text style={{ color: "white", fontSize: 32, fontWeight: "800" }}>
              Profile
            </Text>
          </Center>
          {/* <Center>
            <Lottie loop={false} source={profilePicture} style={styles.icon} />
          </Center> */}
          <Center>
            <Text style={styles.fullname}>
              {user?.user.firstName.toUpperCase() +
                "  " +
                user?.user.middleName.toUpperCase() + "  " +
                user?.user.lastName.toUpperCase()}
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
                  data={[t("profile.first-name"), user?.user.firstName]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
                <Row
                  data={[t("profile.middle-name"), user?.user.middleName]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
                <Row
                  data={[t("profile.last-name"), user?.user.lastName]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
                <Row
                  data={[t("global.email"), user?.user.email]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
                <Row
                  data={[t("profile.phone"), user?.user.phone]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
                <Row
                  data={[t("profile.gender"), user?.user.gender]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
                <Row
                  data={[
                    t("profile.dob"),
                    dateFormat(user?.user.dateOfBirth, "ddd, mmm, yyyy"),
                  ]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
                <Row
                  data={[t("global.username"), user?.user.userName]}
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
                  data={["Additional Information"]}
                  style={styles.head}
                  textStyle={styles.tableHeader}
                />
                <Row
                  data={["Alternative Phone", userAddress?.alternatePhoneNumber]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
                <Row
                  data={["Sub City", userAddress?.subCity]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
                <Row
                  data={["Wereda", userAddress?.woreda]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
                <Row
                  data={["House Number", userAddress?.houseNumber]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
                <Row
                  data={["Emergency Contact"]}
                  style={styles.head}
                  textStyle={styles.textType}
                />
                <Row
                  data={["Name", userAddress?.emergencyContactName]}
                  style={styles.text}
                  textStyle={styles.textType}
                />
                <Row
                  data={[
                    "phone", userAddress?.emergencyContactPhone
                  ]}
                  style={styles.text}
                  textStyle={styles.textType}
                />

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
