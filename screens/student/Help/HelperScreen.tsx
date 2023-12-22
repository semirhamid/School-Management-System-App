import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { Center, HStack, ScrollView, VStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";
// import { HelpData } from "./HelpData";
import { Image } from "native-base";
import { useTranslation } from "react-i18next";

interface HelperItem {
  id: number;
  title: string;
  description: string;
  image: number;
}

export default function HelperScreen() {
  const { t } = useTranslation()
  const currentScreen = useSelector((state: RootState) => state.currentScreen);
  // const data = HelpData[currentScreen] ?? [];
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleAccordion = (itemId: number) => {
    if (expandedId === itemId) {
      setExpandedId(null);
    } else {
      setExpandedId(itemId);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* {data.map((item) => {
        // const image = item.image && require(item.image);
        return (
          <VStack key={item.id}>
            <HStack>
              <TouchableOpacity
                key={item.id}
                style={styles.itemContainer}
                onPress={() => toggleAccordion(item.id)}
              >
                <HStack display={"flex"} justifyContent={"space-between"}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Center width={"10%"}>
                    <Ionicons
                      name={
                        expandedId === item.id ? "chevron-up" : "chevron-down"
                      }
                      size={24}
                      color="black"
                    />
                  </Center>
                </HStack>
              </TouchableOpacity>
            </HStack>
            <VStack style={styles.descriptionContainer}>
              {expandedId === item.id && (
                <VStack style={{ paddingVertical: 30, paddingHorizontal: 10 }}>
                  <Center position={"relative"} width={"100%"} height={200}>
                    {item.image != "" && (
                      <Image
                        source={item.image}
                        alt={"help image"}
                        style={styles.image}
                      />
                    )}
                  </Center>
                  <Text style={styles.description}>{item.description}</Text>
                </VStack>
              )}
            </VStack>
          </VStack>
        );
      })} */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  descriptionContainer: {
    backgroundColor: "#fefefe",
    marginVertical: 5,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  itemContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  image: {
    resizeMode: "contain",
    borderRadius: 8,
    marginBottom: 20,
    maxHeight: 200,
    backgroundColor: "white",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    width: "90%",
  },
  description: {
    fontSize: 16,
    color: "#000",
    textAlign: "justify",
    paddingHorizontal: 20,
  },
});
