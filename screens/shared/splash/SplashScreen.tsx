import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";

export default function SplashScreen() {
  const { t } = useTranslation()
  const scaleValue = new Animated.Value(1);
  const offset = useSharedValue(0);
  const textOffset = useSharedValue(0);
  const opacityOffset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: offset.value }],
  }));
  const animatedText = useAnimatedStyle(() => ({
    transform: [{ translateY: -30 }],
  }));
  React.useEffect(() => {
    offset.value = withTiming(offset.value + 1, { duration: 2000 });
    textOffset.value = withTiming(textOffset.value + 30, { duration: 2000 });
    opacityOffset.value = withTiming(opacityOffset.value + 1, {
      duration: 1000,
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Animated.Image
          style={[styles.logo, animatedStyles]}
          source={require("../../../assets/images/bgLogo.png")}
        />
        <Animated.Text
          style={[
            {
              fontSize: 25,
              fontWeight: "bold",
              color: "#1B3A4B",
              textAlign: "center",
              marginHorizontal: 40,
            },
            animatedText,
          ]}
        >
          {t('global.school-name-capital-part-1')}
        </Animated.Text>
        <Animated.Text
          style={[
            {
              fontSize: 25,
              fontWeight: "bold",
              color: "green",
              textAlign: "center",
              marginHorizontal: 40,
            },
            animatedText,
          ]}
        >
          {t('global.school-name-capital-part-2')}
        </Animated.Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
