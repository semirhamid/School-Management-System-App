import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import { Center, Image, VStack } from "native-base";
import styles from "../../../styles/styles";
import { AuthContext } from "../../../utils/auth/auth-context";
import { AxiosContext } from "../../../utils/auth/axios-context";
import { ApiURL } from "../../../utils/url.global";
import { useNavigation } from "@react-navigation/native";
import { BottomTabParamList } from "../../../navigation/types/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { MaterialType } from "./MaterialType";
import { SET_CURRENT_HELP_SCREEN } from "../../../store/actions";
import { useTranslation } from "react-i18next";

export default function Material() {
  const { t } = useTranslation()
  const authContext = useContext(AuthContext);
  const axiosContext = useContext(AxiosContext);
  const [materials, setMaterials] = useState<Array<MaterialType>>();
  const dispatch = useDispatch();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<BottomTabParamList, "MaterialStack">
    >();

  const currentChild = useSelector((state: RootState) => state.currentChild);
  useEffect(() => {
    dispatch({
      type: SET_CURRENT_HELP_SCREEN,
      payload: "Material",
    });
    console.log(
      ApiURL.MATERIAL_BY_USERNAME +
      "?username=" +
      currentChild.student.userName,
    );
    axiosContext?.authAxios
      .get(ApiURL.MATERIAL_BY_USERNAME + currentChild.student.userName)
      .then((res) => {
        setMaterials(res.data.reverse());
      })
      .catch((error) => console.log(error.response.data));

    axiosContext?.publicAxios
      .get(ApiURL.MATERIAL_BY_SECTIONID + currentChild.section.id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authContext?.getAccessToken()}`,
        },
      })
      .then((res) => {
        setMaterials(res.data.reverse());
      })
      .catch((error) => console.log(error.message));
  }, []);
  const viewMaterialDetail = (id: number) => {
    const material = materials?.find((item) => item.id === id);
    navigation.navigate("MaterialStack", {
      screen: "MaterialDetail",
      params: { id, material },
    });
  };

  return (
    <VStack flex={1} backgroundColor={"#1B3A4B"}>
      <VStack flex={2}>
        <Center flex={1}>
          <Text style={{ color: "white", fontSize: 24, fontWeight: "800" }}>
            {t("material.title")}
          </Text>
        </Center>
      </VStack>
      <VStack
        p={5}
        pb={0}
        backgroundColor={"#EFEFEF"}
        flex={9}
        style={styles.border}
      >
        <ScrollView style={{ width: "100%", flex: 1 }}>
          {materials && materials.length > 0 ? (
            materials
              ?.map((material: MaterialType) => (
                <Text />
              ))
              .reverse()
          ) : (
            <Center flex={1}>
              <View style={style.logoContainer}>
                <Image
                  alt="empty"
                  style={style.logo}
                  source={require("../../../assets/box.png")}
                />
              </View>
              <Text>{t("material.error")}</Text>
            </Center>
          )}
        </ScrollView>
      </VStack>
    </VStack>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 40,
  },
});
