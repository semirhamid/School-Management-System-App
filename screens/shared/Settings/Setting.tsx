import {
  Pressable,
  VStack,
  HStack,
  Center,
  Button,
  ScrollView,
} from "native-base";
import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import Lottie from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabParamList } from "../../../navigation/types/types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { SET_CURRENT_HELP_SCREEN } from "../../../store/actions";
import { useTranslation } from "react-i18next";

const Setting = () => {
  const { t } = useTranslation()
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const profilePicture = require("../../../assets/animation/profile_male.json");
  const navigation =
    useNavigation<
      NativeStackNavigationProp<BottomTabParamList, "SettingStack">
    >();
  const currentUser = useSelector((state: RootState) => state.currentUser);

  const handleNotificationSwitch = () => {
    setNotificationEnabled(!notificationEnabled);
  };

  const handleLocationSwitch = () => {
    setLocationEnabled(!locationEnabled);
  };

  const handleDarkModeSwitch = () => {
    setDarkModeEnabled(!darkModeEnabled);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: SET_CURRENT_HELP_SCREEN,
      payload: "Setting",
    });
  }, []);
  return (
    <ScrollView flex={1} backgroundColor={"#fefefe"}>
      <VStack style={styles.container}>
        <VStack style={styles.header} backgroundColor={"#1B3A4B"}>
          <Center>
            <Lottie
              loop={false}
              source={profilePicture}
              style={{ height: 120 }}
            />
          </Center>
          <Center>
            <Text style={styles.fullname}>{currentUser.name}</Text>
            <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
              {currentUser.email}
            </Text>
          </Center>
          <Center style={{ marginTop: 10 }}>
            <Button
              px={5}
              height={12}
              py={0}
              onPress={() => {
                navigation.navigate("SettingStack", {
                  screen: "Profile",
                  params: {},
                });
              }}
              endIcon={<Ionicons name="eye" color={"green"} size={25} />}
              borderWidth={1}
              borderColor={"tertiary.400"}
              variant={"subtle"}
              colorScheme="tertiary"
              rounded={25}
              paddingX={10}
            >
              {t("settings.view-profile")}
            </Button>
          </Center>
        </VStack>

        {/* 
      <HStack style={{...styles.item, }}>
      <HStack>
          <Ionicons
          
                  name='moon-outline'
                  color={"black"}
                  size={25}
                  style={styles.btn}
                />
                <Text style={styles.itemText}>Dark mode</Text>
        </HStack>
        <Switch value={locationEnabled} onValueChange={handleLocationSwitch} size="lg" />
        </HStack> */}

        <Pressable
          onPress={() => {
            navigation.navigate("SettingStack", {
              screen: "Privacy",
              params: {},
            });
          }}
        >
          <HStack style={{ ...styles.item }}>
            <HStack>
              <Ionicons
                name="lock-closed-outline"
                color={"black"}
                size={25}
                style={styles.btn}
              />
              <Text style={styles.itemText}>{t("settings.privacy")}</Text>
            </HStack>
          </HStack>
        </Pressable>

        <Pressable
          onPress={() => {
            navigation.navigate("SettingStack", { screen: "Help", params: {} });
          }}
        >
          <HStack style={{ ...styles.item }}>
            <HStack>
              <Ionicons
                name="help-outline"
                color={"black"}
                size={25}
                style={styles.btn}
              />
              <Text style={styles.itemText}>{t("settings.help-and-feedback")}</Text>
            </HStack>
          </HStack>
        </Pressable>
      </VStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fullname: {
    fontWeight: "700",
    fontSize: 20,
    color: "white",
  },
  btn: {
    paddingHorizontal: 10,
    paddingRight: 15,
  },
  HItem: {
    backgroundColor: "#f5f5f5",
  },
  HText: {
    paddingLeft: 20,
    paddingVertical: 5,
    fontSize: 12,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#1B3A4B",
    paddingVertical: 15,
    paddingTop: 20,
    marginBottom: 0,
    borderRadius: 10,
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
    marginHorizontal: 2,
    marginVertical: 3,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
  item: {
    backgroundColor: "#ffffff",
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    height: 60,
  },
  itemText: {
    fontSize: 18,
    color: "#000000",
  },
  icon: {
    fontSize: 20,
  },
});

export default Setting;
