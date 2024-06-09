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
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { SvgXml } from "react-native-svg";
import ClassesBox from "./ClassesBox";
import MenuItems from "./MenuItems";
import { RootState } from "../../../store/reducers";

export default function Home() {
  const { t } = useTranslation()
  const navigation =
    useNavigation<NativeStackNavigationProp<BottomTabParamList, "Home">>();
  const axiosContext = useContext(AxiosContext);
  const [text, setText] = useState("");
  const ref = useRef(null);
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'short' });
  const teacherInfo = useSelector((state: RootState) => state.teacherContactInfo);

  const menus = [
    {
      name: "Material",
      description: "View and Upload Material",
      iconName: "menu-book", // Correct Material Icon name
      onPress: () => navigation.navigate("MaterialStack", {
        screen: "Material",
        params: { id: 1, name: "Material" },
      }),
      mainBG: "#EBF2FD", // Lightened version of Soft blue
      subBG: "#D1E3F8", // Soft blue for contrast
    },
    {
      name: "Assessment",
      description: "View, Add And Edit Assessment",
      iconName: "assessment", // Correct Material Icon name
      onPress: () => navigation.navigate("AssessmentStack", {
        screen: "Assessment",
        params: { id: 2, name: "Assessment" },
      }),
      mainBG: "#FAE8FD", // Lightened version of Soft pink
      subBG: "#F3D1F4", // Soft pink for contrast
    },
    {
      name: "Announcement",
      description: "View, Post And Edit Announcement",
      iconName: "campaign", // Correct Material Icon name
      onPress: () => navigation.navigate("AnnouncementStack", {
        screen: "Announcement",
        params: { id: 3, name: "Announcement" },
      }),
      mainBG: "#E6EFF4", // Lightened version of Very light pastel blue
      subBG: "#C5E1A5", // Soft green for contrast
    },
    {
      name: "Attendance",
      description: currentDate,
      iconName: "how-to-reg", // Correct Material Icon name
      onPress: () => navigation.navigate("Attendance"),
      mainBG: "#FFF3E5", // Lightened version of Soft orange
      subBG: "#FFE0B2", // Soft orange for contrast
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

                <VStack pl={3} pt={2}>
                  <Text color={"#fff"} fontSize={30} fontWeight={"bold"}>
                    {teacherInfo?.userDTO?.firstName + " " + teacherInfo?.userDTO?.middleName + " " + teacherInfo?.userDTO?.lastName}
                  </Text>
                  <Text color={"#fff"} fontSize={14} fontWeight={"light"}>
                    Homeroom
                  </Text>
                </VStack>
                <Box w={4}></Box>
                <VStack >
                  <Text color={"#fff"} textAlign={'center'} fontSize={16} fontWeight={"bold"}>
                    Today
                  </Text>
                  <Box alignItems="center" justifyContent="center" padding={1} backgroundColor="#FDD835" borderRadius={10} style={{ borderWidth: 1, borderColor: "#DDD", shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1, elevation: 3 }}>
                    <Text color={"#1B3A4B"} fontSize={14} fontWeight={"bold"}>
                      <Text color={"#1B3A4B"} fontSize={14} fontWeight={"bold"}>
                        {currentDate}
                      </Text>
                    </Text>
                  </Box>
                </VStack>

              </HStack>
            </Center>
          </VStack>

        </ZStack>
        <VStack alignContent={'center'} justifyContent={'center'} justifyItems={'center'} alignItems={'center'}>
          {menus.map((menu) => {
            return <MenuItems key={menu.name} name={menu.name} iconName={menu.iconName} description={menu.description} mainBG={menu.mainBG} subBG={menu.subBG} onPress={menu.onPress} />
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
