import { View, Text, StyleSheet } from "react-native";
import { Button, Center, VStack } from "native-base";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../../navigation/types/types";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

export default function NoInternet() {
  const { t } = useTranslation()
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  return (
    <View style={styles.container}>
      <Center flex={1}>
        <VStack alignItems="center">
          <LottieView
            source={require("../../../assets/animation/dancing.json")}
            autoPlay
            loop
            style={styles.animation}
          />
          <Text style={styles.message}>
            {t("no-internet.check-connection")}
          </Text>
          <Button
            size="lg"
            colorScheme="blue"
            onPress={() => {
              navigation.goBack();
            }}
          >
            {t("global.back")}
          </Button>
        </VStack>
      </Center>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  animation: {
    width: 200,
    height: 200,
  },
  message: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
});
