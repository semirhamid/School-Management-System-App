import { StyleSheet, Text } from "react-native";
import { useContext, useEffect, useState } from "react";
import { Button, Center, HStack, Image, ScrollView, VStack } from "native-base";
import ProgressBar from "react-native-progress-bar-horizontal";
import { Assessment } from "./AssesmentType";
import { AxiosContext } from "../../../utils/auth/axios-context";
import { ApiURL, LOCAL_BASE_URL } from "../../../utils/url.global";
import { BarGraph } from "./BarGraph";
import { useTranslation } from "react-i18next";

interface Props {
  assesmentWeight: Array<Assessment>;
  firstIndex: number;
  currentIndex: number;
  setCurrentIndex: Function;
  // weight: number;
}
export type Item = {
  labels: string[];
  currentStudent: number;
  weight: number;
  datasets: number[];
  barColors: string[];
};

export default function CustomTabBar(assesmentWeight: Props) {
  const { t } = useTranslation()
  const currentAssesmentWeight = assesmentWeight.assesmentWeight
    .filter((assessment) => assessment.result !== null)
    .map((value) => value.assesmentWeight.name);
  const [currentIndex, setCurrentIndex] = [
    assesmentWeight.currentIndex,
    assesmentWeight.setCurrentIndex,
  ];
  const axiosContext = useContext(AxiosContext);
  const [classAssesmentWeight, setClassAssesmentWeight] = useState<
    Array<number>
  >([]);
  const [data, setData] = useState<Item>({
    labels: ["0 - 10", "11 - 20", "21 - 30"],
    weight: 30,
    currentStudent: 17,
    datasets: [100, 45, 28],
    barColors: ["rgb(220, 15, 15)", "rgb(255, 243, 17)", "rgb(57, 193, 102)"],
  });

  useEffect(() => {
    function getClassAssesmentWeight() {
      axiosContext?.publicAxios
        .get(
          LOCAL_BASE_URL +
          ApiURL.GET_ASSESMENT_WEIGHTS +
          assesmentWeight?.assesmentWeight[currentIndex]?.assesmentWeight?.id,
        )
        .then((res) => {
          const updatedClassAssesmentWeight = res?.data.sort(
            (a: number, b: number) => b - a,
          );
          setClassAssesmentWeight(updatedClassAssesmentWeight);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (currentIndex !== -1) {
      getClassAssesmentWeight();
    }
  }, [assesmentWeight.currentIndex, currentIndex]);

  const changeAssesmentWeight = (index: Array<number>) => {
    setClassAssesmentWeight(index);
  };
  function divideIntoGroups(number: number) {
    const groupSize = Math.ceil(number / 3);
    const labels = [];
    const data = [];

    let currentRangeStart = 1;

    for (let i = 0; i < 3; i++) {
      const currentRangeEnd = Math.min(
        currentRangeStart + groupSize - 1,
        number,
      );
      labels.push(`${currentRangeStart} - ${currentRangeEnd}`);

      const randomData = classAssesmentWeight.filter(
        (assesment) =>
          assesment >= currentRangeStart && assesment <= currentRangeEnd,
      ).length;
      data.push(randomData);

      currentRangeStart = currentRangeEnd + 1;
    }

    const result = {
      labels,
      currentStudent: currentWeight?.result,
      weight: number,
      datasets: data,
      barColors: ["rgb(220, 15, 15)", "rgb(255, 243, 17)", "rgb(57, 193, 102)"],
    };
    return result;
  }

  const changeTab = (index: number) => {
    setCurrentIndex(index);
  };
  const currentWeight = assesmentWeight.assesmentWeight.filter(
    (assesment) =>
      assesment.assesmentWeight.name === currentAssesmentWeight[currentIndex],
  )[0];

  return (
    <VStack style={styles.container} flex={1}>
      <VStack flex={1} style={styles.tabContainer}>
        <ScrollView
          backgroundColor={"#fff"}
          paddingY={1}
          height={20}
          horizontal={true}
        >
          {assesmentWeight.firstIndex != -1 &&
            currentAssesmentWeight.map((value, index) => (
              <Button
                key={value}
                onPress={() => changeTab(index)}
                style={[styles.commonTab]}
              >
                <Text
                  numberOfLines={1}
                  style={[
                    {
                      fontSize: 20,
                      fontWeight: "600",
                      color: "#000",
                      overflow: "hidden",
                    },
                    index === currentIndex
                      ? styles.activeTab
                      : styles.inactiveTab,
                  ]}
                >
                  {value.toLocaleUpperCase()}
                </Text>
              </Button>
            ))}
        </ScrollView>
      </VStack>

      {currentIndex !== -1 &&
        (classAssesmentWeight[0] != null ? (
          <>
            <HStack
              backgroundColor={"white"}
              marginY={10}
              height={100}
              justifyContent={"center"}
            >
              <Center>
                {currentWeight && (
                  <Text
                    style={{ fontSize: 30, fontWeight: "700" }}
                  >{` ${currentWeight?.result} / ${currentWeight?.assesmentWeight?.weight}`}</Text>
                )}
                <ProgressBar
                  progress={
                    currentWeight?.result /
                    currentWeight?.assesmentWeight?.weight
                  }
                  fillColor="#16b69d"
                  unfilledColor="#c2fcf2"
                  height={10}
                  borderWidth={0}
                  duration={100}
                  width={200}
                />

                <Text>{`${currentAssesmentWeight[currentIndex]} results`}</Text>
              </Center>

              <Center flex={1}>
                {classAssesmentWeight.indexOf(currentWeight?.result) + 1 ==
                  1 && (
                    <Image
                      source={require("../../../assets/images/first_badge.png")}
                      alt="Icon"
                      height={150}
                      width={150}
                    />
                  )}
                {classAssesmentWeight.indexOf(currentWeight?.result) + 1 ==
                  2 && (
                    <Image
                      source={require("../../../assets/images/second_badge.png")}
                      alt="Icon"
                      height={150}
                      width={150}
                    />
                  )}
                {classAssesmentWeight.indexOf(currentWeight?.result) + 1 ==
                  3 && (
                    <Image
                      source={require("../../../assets/images/third_badge.png")}
                      alt="Icon"
                      height={150}
                      width={150}
                    />
                  )}
              </Center>
            </HStack>
            <VStack p={0} m={0} flex={1} pt={3}>
              <Text
                style={{ fontSize: 20, fontWeight: "500", textAlign: "center" }}
              >
                {t("assesments.custom-tab-bar.grade-analysis")}
              </Text>
              {
                <BarGraph
                  barColors={
                    divideIntoGroups(
                      assesmentWeight?.assesmentWeight[currentIndex]
                        ?.assesmentWeight?.weight,
                    ).barColors
                  }
                  datasets={
                    divideIntoGroups(
                      assesmentWeight?.assesmentWeight[currentIndex]
                        ?.assesmentWeight?.weight,
                    ).datasets
                  }
                  weight={
                    divideIntoGroups(
                      assesmentWeight?.assesmentWeight[currentIndex]
                        ?.assesmentWeight?.weight,
                    ).weight
                  }
                  currentStudent={
                    divideIntoGroups(
                      assesmentWeight?.assesmentWeight[currentIndex]
                        ?.assesmentWeight?.weight,
                    ).currentStudent
                  }
                  labels={
                    divideIntoGroups(
                      assesmentWeight?.assesmentWeight[currentIndex]
                        ?.assesmentWeight?.weight,
                    ).labels
                  }
                />
              }
            </VStack>
          </>
        ) : (
          <VStack flex={1} bgColor={"white"} py={10}>
            <Center>
              <Image
                source={require("../../../assets/images/sad_cat.png")}
                alt="Icon"
                height={150}
                width={150}
              />
              <Text
                style={{
                  fontSize: 20,
                  textTransform: "uppercase",
                  fontWeight: "600",
                }}
              >
                {t("assesments.custom-tab-bar.data-not-computed")}
              </Text>
            </Center>
          </VStack>
        ))}
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    paddingTop: 10,
  },
  tabContainer: {
    flex: 1,
  },
  activeTab: {
    color: "#51A877",
  },
  inactiveTab: {},
  commonTab: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    borderRadius: 10,
    marginVertical: 3,
    textAlign: "center",
    backgroundColor: "#00000000",
  },
});
