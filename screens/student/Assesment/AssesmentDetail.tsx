import { Text, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Button, Center, HStack, ScrollView, VStack } from "native-base";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  AssessmentDetailParamList,
  BottomTabParamList,
} from "../../../navigation/types/types";
import { AxiosContext } from "../../../utils/auth/axios-context";
import { AuthContext } from "../../../utils/auth/auth-context";
import { ApiURL } from "../../../utils/url.global";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LOCAL_BASE_URL } from "../../../utils/url.global";
import { RootState } from "../../../store/reducers";
import { useDispatch, useSelector } from "react-redux";
import CustomTabBar from "./CustomTabBar";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Ionicons } from "@expo/vector-icons";
import { Assessment, AssessmentReport, Result } from "./AssesmentType";
import { SET_CURRENT_HELP_SCREEN } from "../../../store/actions";
import { useTranslation } from "react-i18next";

type AssessmentDetailRouteProp = RouteProp<
  AssessmentDetailParamList,
  "AssessmentDetail"
>;

const AssesmentDetail = () => {
  const { t } = useTranslation()
  const navigation =
    useNavigation<
      NativeStackNavigationProp<BottomTabParamList, "AssessmentStack">
    >();
  const params = useRoute<AssessmentDetailRouteProp>();
  const axiosContext = useContext(AxiosContext);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [assesmentTypeData, setAssesmentTypeData] = useState<Array<Result>>([]);
  const [refreshing, setRefreshing] = useState(false);
  const currentChild = useSelector((state: RootState) => state.currentChild);
  const [refresh, setRefresh] = useState(false);
  const authContext = useContext(AuthContext);
  const [first, setFirst] = useState<Array<AssessmentReport>>([]);
  const [second, setSecond] = useState<Array<Assessment>>([]);
  const [firstAssesmentIndex, setFirstAssesmentIndex] = useState(-1);
  const assesmentName = first.map((assesment) => assesment.assesmentType.name);
  const [secondAssesmentIndex, setSecondAssesmentIndex] = useState(-1);
  const dispatch = useDispatch();
  const [summary, setSummary] = useState(0);
  const currentAssesmentType = second.filter(
    (assesment) =>
      assesment.assesmentWeight.assesmentType.name ===
      assesmentName[firstAssesmentIndex],
  );
  const currentAssesmentWeight = second.filter(
    (assesmentWeight) =>
      assesmentWeight.assesmentWeight.assesmentType.name ===
      assesmentName[firstAssesmentIndex],
  );

  const changeFirstTab = (index: number) => {
    setFirstAssesmentIndex(index);
    setSecondAssesmentIndex(-1);
  };

  useEffect(() => {
    dispatch({
      type: SET_CURRENT_HELP_SCREEN,
      payload: "AssessmentDetail",
    });
    const fetchAssessmentData = async () => {
      const header = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authContext?.getAccessToken()}`,
        },
      };
      try {
        axiosContext?.publicAxios
          .get(
            LOCAL_BASE_URL +
            ApiURL.ASSESSMENT_REPORT +
            `?username=${currentChild.student.userName}&subjectId=${params.params.id}`,
            header,
          )
          .then((res) => {
            setFirst(res?.data);
          })
          .catch((error) => {
            console.log(error);
          });

        axiosContext?.publicAxios
          .get(
            LOCAL_BASE_URL +
            ApiURL.ASSESSMENT +
            `?username=${currentChild.student.userName}&subjectId=${params.params.id}`,
          )
          .then((res) => {
            setSecond(res?.data);
            const result = groupAssessmentsByTypeAndWeight(
              res?.data,
              extractAssesmentTypeData(first),
            );
            setAssesmentTypeData(result);

            calculateCurrentAverage(first, second);
            setSummary(
              res?.data && res?.data.length != 0
                ? res?.data.reduce((prev: any, curr: any, index: any) => {
                  return prev + curr.result / curr.assesmentWeight.weight;
                }, 0) / res?.data.length
                : 0,
            );
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
        setError(t("login.error.network-error"));
      }
    };

    fetchAssessmentData();
  }, []);

  const generateRandomId = (length = 8) => {
    let result = "";
    const characters = "0123456789";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }

    return parseInt(result, 10);
  };

  function extractAssesmentTypeData(
    assessments: Array<AssessmentReport>,
  ): Array<Result> {
    const result = assessments.map((assesment) => {
      if (assesment.assesments == undefined) {
        return {
          title: assesment?.assesmentType?.name,
          grade: assesment?.result,
          weight: assesment?.assesmentType?.totalWeight,
          id: assesment.assesmentType.id,
          assessments: [],
        };
      } else {
        return {
          title: assesment?.assesmentType?.name,
          grade: assesment?.result,
          weight: assesment?.assesmentType?.totalWeight,
          assessments: assesment.assesments,
          id: assesment.assesmentType.id,
        };
      }
    });

    return result;
  }

  function groupAssessmentsByTypeAndWeight(
    assessments: Array<Assessment>,
    assesmentType: Array<Result>,
  ) {
    const newAssessmentTypeData = [...assesmentType];
    assessments.forEach((assessment) => {
      const typeId = assessment.assesmentWeight.assesmentType.id;

      for (let i = 0; i < newAssessmentTypeData.length; i++) {
        if (newAssessmentTypeData[i].id === typeId) {
          const existingAssessment = newAssessmentTypeData[i].assessments.find(
            (item) => item.name === assessment.assesmentWeight.name,
          );

          if (!existingAssessment) {
            newAssessmentTypeData[i].assessments.push({
              name: assessment.assesmentWeight.name,
              weight: assessment.assesmentWeight.weight,
              value: assessment.result,
            });
          }
        }
      }
    });

    return newAssessmentTypeData;
  }

  const calculateCurrentAverage = (
    first: Array<AssessmentReport>,
    second: Array<Assessment>,
  ) => {
    const result = first.map((item) => {
      return item.assesmentType.name;
    });
  };

  return (
    <ScrollView style={styles.bigContainer} backgroundColor={"#fff"}>
      <VStack flex={1} backgroundColor={"#1B3A4B"}>
        <VStack mt={5}>
          <Center flex={1}>
            <Text style={{ color: "white", fontSize: 24, fontWeight: "800" }}>
              {params.params.name}
            </Text>
            <VStack>
              <HStack marginY={3}>
                <Center>
                  <Ionicons
                    name="person-outline"
                    size={24}
                    color="white"
                    style={{ marginRight: 10 }}
                  />
                </Center>
                <Center>
                  <Text
                    style={{ color: "white", fontSize: 20, fontWeight: "500" }}
                  >
                    {first.length > 0
                      ? `${first[0].student.firstName}  ${first[0].student.lastName}`
                      : ""}
                  </Text>
                </Center>
              </HStack>
              <HStack>
                <Center>
                  <Ionicons
                    name="calendar-outline"
                    size={24}
                    color="white"
                    style={{ marginRight: 10 }}
                  />
                </Center>
                <Center>
                  <Text
                    style={{ color: "white", fontSize: 20, fontWeight: "500" }}
                  >
                    {first.length > 0
                      ? `${first[0].assesmentType.subject.semester.name} || ${first[0].assesmentType.subject.semester.academicYear.name}`
                      : ""}
                  </Text>
                </Center>
              </HStack>
            </VStack>
          </Center>
        </VStack>

        <VStack mt={3} style={styles.lowerBody}>
          <Center>
            <VStack>
              <Center>
                <Text
                  style={{
                    color: "black",
                    fontSize: 24,
                    fontWeight: "800",
                    marginLeft: 20,
                  }}
                >
                  Grade Summary
                </Text>
              </Center>
              <Text
                style={{
                  color: "#717171",
                  fontSize: 16,
                  fontWeight: "500",
                  marginLeft: 20,
                  marginVertical: 10,
                }}
              >
                Assesment results of exams taken
              </Text>
            </VStack>
          </Center>
          <Center>
            <AnimatedCircularProgress
              size={220}
              width={12}
              fill={summary * 100}
              tintColor="#16b69d"
              backgroundColor="#c2fcf2"
              duration={2000}
              children={(fill) => (
                <VStack>
                  <Text
                    style={{ color: "black", fontSize: 36, fontWeight: "800" }}
                  >
                    {`${Math.round(fill)}%`}
                  </Text>
                  <Text
                    style={{
                      color: "#6B6B6B",
                      fontSize: 16,
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    {summary > 0.9
                      ? "Excellent"
                      : summary > 0.75
                        ? "Good"
                        : "Bad"}
                  </Text>
                </VStack>
              )}
              rotation={-125}
              lineCap="round"
              arcSweepAngle={250}
              dashedBackground={{ width: 10, gap: 20 }}
              prefill={0}
            />
          </Center>
        </VStack>
        <VStack flex={10} backgroundColor={"red.900"}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            backgroundColor={"#c2fcf2"}
            horizontal={true}
          >
            {assesmentName.map((value, index) => (
              <Button
                key={value}
                onPress={() => changeFirstTab(index)}
                style={[
                  styles.commonTab,
                  index === firstAssesmentIndex
                    ? styles.activeTab
                    : styles.inactiveTab,
                ]}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 20,
                    fontWeight: "600",
                    color: "#000",
                    overflow: "hidden",
                  }}
                >
                  {value.toLocaleUpperCase()}
                </Text>
              </Button>
            ))}
          </ScrollView>
          {
            <VStack flex={1}>
              <CustomTabBar
                assesmentWeight={currentAssesmentWeight}
                firstIndex={firstAssesmentIndex}
                currentIndex={secondAssesmentIndex}
                setCurrentIndex={setSecondAssesmentIndex}
              />
            </VStack>
          }
        </VStack>
      </VStack>
    </ScrollView>
  );
};
export default AssesmentDetail;
const styles = StyleSheet.create({
  courses: {
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
  },
  icon: {
    width: 40,
    height: 40,
  },
  bigContainer: {},
  lowerBody: {
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    backgroundColor: "#fefefe",
    paddingTop: 20,
  },
  activeTab: {
    borderWidth: 3,
    borderColor: "#16b69d",
    borderRadius: 30,
    paddingVertical: 10,
    backgroundColor: "#4DB6A6",
  },
  inactiveTab: {},
  commonTab: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    textAlign: "center",
    backgroundColor: "#ffffff00",
  },
});
