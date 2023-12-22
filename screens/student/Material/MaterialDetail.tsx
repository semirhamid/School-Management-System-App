import { Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  MaterialDetailParamList,
  BottomTabParamList,
} from "../../../navigation/types/types";
import { Center, VStack, ScrollView, HStack } from "native-base";
import moment from "moment";
import { MaterialType } from "./MaterialType";
import styles from "../../../styles/styles";
import { SET_CURRENT_HELP_SCREEN } from "../../../store/actions";
import { useDispatch } from "react-redux";

type MaterialDetailRouteProp = RouteProp<
  MaterialDetailParamList,
  "MaterialDetail"
>;

export const MaterialDetail = () => {
  const { params } = useRoute<MaterialDetailRouteProp>();
  const material: MaterialType = params.material;
  const id = params.id;
  const dispatch = useDispatch();

  const navigation =
    useNavigation<
      NativeStackNavigationProp<BottomTabParamList, "AnnouncementStack">
    >();
  useEffect(() => {
    dispatch({
      type: SET_CURRENT_HELP_SCREEN,
      payload: "MaterialDetail",
    });
  }, []);
  return (
    <VStack flex={1} backgroundColor={"#1B3A4B"}>
      <VStack flex={2}>
        <Center flex={1}>
          <Text style={{ color: "white", fontSize: 24, fontWeight: "800" }}>
            Material Detail
          </Text>
        </Center>
      </VStack>
      <VStack
        p={5}
        pb={0}
        backgroundColor={"white"}
        flex={9}
        style={styles.border}
      >
        <ScrollView>
          <VStack style={style.card}>
            <Text style={style.textStyle}>Title</Text>
            <Text
              style={{ fontWeight: "700", fontSize: 18, textAlign: "center" }}
            >
              {material.title}
            </Text>
          </VStack>
          <HStack
            style={style.dateStyle}
            flex={1}
            justifyContent={"space-between"}
            pr={3}
          >
            <Text style={style.postername}>
              {material.adderUser.firstName +
                "  " +
                material.adderUser.middleName}
            </Text>
            <Text style={style.postername}>
              {moment(material.date).format("LL")}
            </Text>
          </HStack>
          <VStack style={style.card}>
            <Text style={style.textStyle}>Description</Text>
            <Text style={{ textAlign: "justify" }}>{material.description}</Text>
          </VStack>
          <VStack justifyContent={"flex-start"} mb={30} flex={1}>
            <Text style={style.textStyle}>Attachments</Text>
            {material.filePath?.map((link: string) => (
              <Text />
            ))}
          </VStack>
        </ScrollView>
      </VStack>
    </VStack>
  );
};

const style = StyleSheet.create({
  Container: {
    backgroundColor: "white",
    elevation: 5,
    marginVertical: 3,
  },
  textStyle: {
    fontWeight: "500",
    fontSize: 17,
    marginBottom: 3,
  },
  textDetail: {},
  dateStyle: {
    paddingHorizontal: 10,
  },
  detail: {
    fontWeight: "400",
    textAlign: "auto",
  },
  postername: {
    fontWeight: "300",
    fontSize: 11,
  },
  Description: {},
  title: {
    fontWeight: "700",
  },
  card: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
});
