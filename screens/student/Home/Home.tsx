import { useContext, useEffect, useRef, useState } from "react";
import {
  Center,
  Text,
  Button,
  ScrollView,
  VStack,
  Image,
  HStack,
  Box,
  ZStack,
} from "native-base";
import { AxiosContext } from "../../../utils/auth/axios-context";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabParamList } from "../../../navigation/types/types";
import BackgroundTheme from "../../../assets/theme_bg"
import {
  AnnouncementSVG,
  AssesmentSVG,
  AttendanceSVG,
  HelpSVG,
  MaterialSVG,
  SchoolRegulationSVG,
} from "./SVGComponent";
import { useDispatch } from "react-redux";
import { SET_CURRENT_HELP_SCREEN } from "../../../store/actions";
import { useTranslation } from "react-i18next";
import { SvgXml } from "react-native-svg";
import ClassesBox from "./ClassesBox";
import MenuItems from "./MenuItems";

export default function Home() {
  const { t } = useTranslation()
  const navigation =
    useNavigation<NativeStackNavigationProp<BottomTabParamList, "Home">>();
  const axiosContext = useContext(AxiosContext);
  const [text, setText] = useState("");
  const ref = useRef(null);
  const dispatch = useDispatch();
  const classes: string[] = ["9A", "9B", "9C", "9D", "9E", "9F"];
  useEffect(() => {
    dispatch({
      type: SET_CURRENT_HELP_SCREEN,
      payload: "Home",
    });
  }, []);
  const menus = [
    {
      name: "Material",
      onPress: () => navigation.navigate("MaterialStack", {
        screen: "Material",
        params: { id: 1, name: "Material" },
      })
    },
    {
      name: "Assessment",
      onPress: () => navigation.navigate("AssessmentStack", {
        screen: "Assessment",
        params: { id: 2, name: "Assessment" },
      })
    },
    {
      name: "Announcement",
      onPress: () => navigation.navigate("AnnouncementStack", {
        screen: "Announcement",
        params: { id: 3, name: "Announcement" },
      })
    },
    {
      name: "Attendance",
      onPress: () => navigation.navigate("Attendance")
    }
  ];

  return (
    <ScrollView flex={1} backgroundColor={"#F8F8F8"}>
      <VStack flex={1}>
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

            width={"100%"}
          >
            <Center>
              <HStack
                width={"100%"}
                justifyContent={"space-between"}
                alignItems={"center"}
                paddingX={5}
                alignContent={'center'}
                justifyItems={'center'}
                height={'100%'}
                paddingY={2}
              >
                <Box></Box>
                <VStack>
                  <Text color={"#fff"} fontSize={18} fontWeight={"bold"}>
                    Abel Teacher
                  </Text>
                  <Text color={"#fff"} fontSize={14} fontWeight={"light"}>
                    Homeroom 9B
                  </Text>
                </VStack>
                <VStack >
                  <Text color={"#fff"} fontSize={16} fontWeight={"bold"}>
                    Today
                  </Text>
                  <Box alignItems="center" justifyContent="center" padding={1} backgroundColor="#FDD835" borderRadius={10} style={{ borderWidth: 1, borderColor: "#DDD", shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1, elevation: 3 }}>
                    <Text color={"#1B3A4B"} fontSize={14} fontWeight={"bold"}>
                      Wed
                    </Text>
                  </Box>
                </VStack>

              </HStack>
            </Center>
          </VStack>

        </ZStack>
        <VStack alignContent={'center'} justifyContent={'center'} justifyItems={'center'} alignItems={'center'}>
          {menus.map((menu) => {
            return <MenuItems key={menu.name} name={menu.name} onPress={menu.onPress} />
          })}
        </VStack>
      </VStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    textAlign: "center",
    marginHorizontal: "auto",
  },
  icon: {
    height: 50,
    width: 50,
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
  imageContainer: {},
});
