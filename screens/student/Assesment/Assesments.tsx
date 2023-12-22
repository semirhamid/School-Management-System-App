import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Center, ScrollView, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  AssessmentStackParamList,
  BottomTabParamList,
  RootStackParamList,
} from "../../../navigation/types/types";
import { UseColumnOrderInstanceProps } from "react-table";
import { AuthContext } from "../../../utils/auth/auth-context";
import { AxiosContext } from "../../../utils/auth/axios-context";
import { ApiURL } from "../../../utils/url.global";
import { LOCAL_BASE_URL } from "../../../utils/url.global";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { SET_CURRENT_HELP_SCREEN } from "../../../store/actions";
import { useTranslation } from "react-i18next";

type Teacher = { firstName: string; middleName: string };
export type resultGrade = { id: number; name: string; teacher: Teacher };

export default function Assesments() {
  const { t } = useTranslation()
  const navigation =
    useNavigation<
      NativeStackNavigationProp<BottomTabParamList, "AssessmentStack">
    >();
  const [data, setData] = useState<Array<resultGrade>>([]);
  const authContext = useContext(AuthContext);
  const axiosContext = useContext(AxiosContext);
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const child = useSelector((state: RootState) => state.currentChild);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: SET_CURRENT_HELP_SCREEN,
      payload: "Assessment",
    });
    axiosContext?.publicAxios
      .get(
        LOCAL_BASE_URL +
        ApiURL.GET_SUBJECTS +
        `${child.section.id}&semesterId=${child.semester.id}`,
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  type Detail = {
    id: number;
    courseName: string;
  };

  const viewDetail = (id: number, name: string) => {
    navigation.navigate("AssessmentStack", {
      screen: "AssesmentDetail",
      params: { id, name },
    });
  };

  return (
    <VStack flex={1} style={styles.bigContainer} backgroundColor={"#1B3A4B"}>
      <VStack flex={2}>
        <Center flex={1}>
          <Text style={{ color: "white", fontSize: 24, fontWeight: "800" }}>
            {t("assesments.title")}
          </Text>
        </Center>
      </VStack>
      <VStack
        p={5}
        pb={0}
        style={styles.courses}
        backgroundColor={"#fefefe"}
        flex={9}
      >
        <ScrollView>
          <Text>
            Hello nigga
          </Text>
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
  bigContainer: {
    elevation: 20,
  },
});
