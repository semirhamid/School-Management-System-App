import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Center,
  VStack,
  Image,
  Text,
  Divider,
  Button,
  Icon,
} from "native-base";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabParamList, MainStackParamList } from "../../types/types";
import { useDispatch } from "react-redux";
import {
  SAVE_CREDENTIALS,
  SET_USER,
} from "../../../store/actions";

const CustomDrawer = ({ ...props }) => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<BottomTabParamList>>();
  const mainnavigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  function test() { }
  const onLogout = () => {
    dispatch({
      type: SET_USER,
      payload: {
        email: "",
        id: "",
        role: "",
        name: "",
      },
    });
    dispatch({
      type: SAVE_CREDENTIALS,
      payload: {
        username: "",
        password: "",
      },
    });
    mainnavigation.replace("LOGIN");
  };

  return (
    <VStack flex={1} p={0} m={0}>
      <DrawerContentScrollView>
        <Center>
          <Image
            alt="bgis"
            source={require("../../../assets/images/bgLogo.png")}
            style={{ padding: 20, height: 265 }}
          />

          <Divider mt={1} />
        </Center>
        <Box style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}></Box>
        <VStack
          space={1}
          style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}
        >
          <DrawerItemList
            state={navigation.getParent()}
            navigation={navigation.getParent()}
            descriptors={navigation.getParent()}
            {...props}
          />
          <Button
            onPress={() => {
              navigation.navigate("AssessmentStack", {
                screen: "Assesment",
                params: { id: 0, name: "" },
              });
            }}
            leftIcon={
              <Icon
                as={Ionicons}
                name="analytics-outline"
                size="lg"
                color="gray"
              />
            }
            variant="link"
            style={styles.buttonStyle}
            color="black"
          >
            <Center style={styles.buttonTextWrapper}>
              <Text style={styles.buttonText}>Assessment</Text>
            </Center>
          </Button>
          <Button
            onPress={() => {
              navigation.navigate("Attendance");
            }}
            variant="link"
            leftIcon={
              <Icon
                as={Ionicons}
                name="checkmark-done-outline"
                size="lg"
                color="gray"
              />
            }
            style={styles.buttonStyle}
            color="black"
          >
            <Center style={styles.buttonTextWrapper}>
              <Text style={styles.buttonText}>Attendance</Text>
            </Center>
          </Button>
          <Button
            onPress={() => {
              navigation.navigate("MaterialStack", {
                screen: "Material",
                params: { id: 10, name: "Abebe" },
              });
            }}
            variant="link"
            leftIcon={
              <Icon as={Ionicons} name="book-outline" size="lg" color="gray" />
            }
            style={styles.buttonStyle}
            color="black"
          >
            <Center style={styles.buttonTextWrapper}>
              <Text style={styles.buttonText}>Materials</Text>
            </Center>
          </Button>
          <Button
            onPress={() => {
              navigation.navigate("AnnouncementStack", {
                screen: "Announcement",
                params: { id: 10, name: "Abebe" },
              });
            }}
            leftIcon={
              <Icon
                as={Ionicons}
                name="analytics-outline"
                size="lg"
                color="gray"
              />
            }
            variant="link"
            style={styles.buttonStyle}
            color="black"
          >
            <Center style={styles.buttonTextWrapper}>
              <Text style={styles.buttonText}>Announcement</Text>
            </Center>
          </Button>
        </VStack>
      </DrawerContentScrollView>
      <VStack
        style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}
      >
        <Button
          onPress={() => onLogout()}
          colorScheme={"pink"}
          style={{ paddingVertical: 15 }}
        >
          <VStack style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" color={"white"} size={22} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
                color: "white",
              }}
            >
              Sign Out
            </Text>
          </VStack>
        </Button>
      </VStack>
    </VStack>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  cardText: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
  },
  icon: {
    height: 50,
    width: 50,
  },
  buttonText: {
    textAlign: "left",
    fontSize: 16,
  },
  buttonStyle: {
    marginHorizontal: 10,
    marginVertical: 1,
    textAlign: "left",
    justifyContent: "flex-start",
    color: "black",
    backgroundColor: "Red",
  },
  buttonTextWrapper: {
    marginLeft: 8,
    backgroundColor: "Red",
  },
});
