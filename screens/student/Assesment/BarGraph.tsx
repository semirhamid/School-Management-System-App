import { VStack } from "native-base";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export type Item = {
  labels: string[];
  currentStudent: number;
  weight: number;
  datasets: number[];
  barColors: string[];
};

function calculateSum(numbers: number[]): number {
  return numbers.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );
}

export const BarGraph = (data: Item) => {
  return (
    <View style={styles.container}>
      {data.labels.map((label: string, index: number) => {
        let barHeight =
          calculateSum(data.datasets) === 0
            ? 5
            : (data.datasets[index] / calculateSum(data.datasets)) * 200;

        return (
          <View style={styles.barContainer} key={index}>
            <Text style={{ fontWeight: "500" }}>{data.datasets[index]}</Text>
            <VStack
              style={{
                width: 50,
                height: barHeight,
                minHeight: 5,
                borderRadius: 10,
                backgroundColor: data.barColors[index],
              }}
            />
            <Text style={styles.label}>{label}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E3F4FD",
    elevation: 5,
    borderRadius: 30,
    marginTop: 10,
    flex: 1,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    alignContent: "flex-end",
    paddingHorizontal: 50,
  },
  barContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignContent: "center",
    alignItems: "center",
  },
  label: {
    height: 80,
    marginRight: 10,
    marginTop: 20,
    fontSize: 14,
    fontWeight: "500",
  },
});
