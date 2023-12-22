import { useContext, useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabParamList } from "../../../navigation/types/types";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../../utils/auth/auth-context";
import { AxiosContext } from "../../../utils/auth/axios-context";
import { ApiURL, LOCAL_BASE_URL } from "../../../utils/url.global";
import { Center, VStack, ScrollView, Text, Image } from "native-base";
import styles from "../../../styles/styles";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { AnnouncementType } from "./AnnouncementType";
import { RefreshControl } from "react-native-gesture-handler";
import { SET_CURRENT_HELP_SCREEN } from "../../../store/actions";
import { useTranslation } from "react-i18next";

export default function Announcement() {
  const { t } = useTranslation()
  const [refreshing, setRefreshing] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState("");
  const navigation =
    useNavigation<
      NativeStackNavigationProp<BottomTabParamList, "AnnouncementStack">
    >();
  const [announcements, setAnnouncements] = useState<Array<AnnouncementType>>(
    [],
  );
  const authContext = useContext(AuthContext);
  const axiosContext = useContext(AxiosContext);

  const currentUser = useSelector((state: RootState) => state.currentUser);
  const currentChild = useSelector((state: RootState) => state.currentChild);
  const dispatch = useDispatch();

  const viewAnnouncementDetail = (id: number) => {
    const announcement = announcements.find((item) => item.id === id);
    navigation.navigate("AnnouncementStack", {
      screen: "AnnouncementDetail",
      params: { id, announcement },
    });
  };
  function onRefresh() {
    setRefreshing(true);
    setRefreshing(false);
    setRefresh((refresh) => !refresh);
  }
  const getAnnouncements = async () => {
    axiosContext?.authAxios
      .get(
        LOCAL_BASE_URL +
        ApiURL.ANNOUNCEMENT_FOR_STUDENT +
        `?username=${currentChild.student.userName}&sectionId=${currentChild.section.id}&rolename=student`,
      )
      .then((res) => {
        setAnnouncements(res.data);
      })
      .catch((error) => setError(error.response.data));
  };

  useEffect(() => {
    dispatch({
      type: SET_CURRENT_HELP_SCREEN,
      payload: "Announcement",
    });
    getAnnouncements();
  }, [refresh]);

  const viewDetail = (id: string, data: string) => {
    navigation.navigate("AnnouncementStack", {
      screen: "AnnouncementDetail",
      params: { id, data },
    });
  };

  return (
    <VStack flex={1} width={"100%"} backgroundColor={"#1B3A4B"}>
      <VStack flex={2}>
        <Center flex={1}>
          <Text style={{ color: "white", fontSize: 24, fontWeight: "800" }}>
            {t("announcement.title")}
          </Text>
        </Center>
      </VStack>
      <VStack
        p={5}
        pb={0}
        backgroundColor={"#fff"}
        flex={9}
        style={styles.border}
      >
        <ScrollView
          style={{ width: "100%" }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {error == "" && announcements.length != 0 ? (
            announcements
              ?.map((announcement: AnnouncementType) => (
                <Text />
              ))
              .reverse()
          ) : (
            <Center flex={1}>
              <View style={style.logoContainer}>
                <Image
                  alt="empty"
                  style={style.logo}
                  source={require("../../../assets/no_announcement.png")}
                />
              </View>
              <Text>{t("announcement.error")}</Text>
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
    width: 200,
    height: 200,
    marginBottom: 40,
  },
});
