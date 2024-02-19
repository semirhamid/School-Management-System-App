import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "native-base";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

export default function SchoolRegulation() {
  const { t } = useTranslation()
  const dispatch = useDispatch();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{t("school-regulation.title1")}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{t("school-regulation.title2")}</Text>
        <Text style={styles.text}>
          {t("school-regulation.description1")}
        </Text>
        <Text style={styles.title}>{t("school-regulation.title3")}</Text>
        <Text style={styles.text}>
          {t("school-regulation.description2")}
        </Text>
        <Text style={styles.title}>{t("school-regulation.title4")}</Text>
        <Text style={styles.text}>
          {t("school-regulation.description3")}
        </Text>
        <Text style={styles.title}>{t("school-regulation.title5")}</Text>
        <Text style={styles.text}>
          {t("school-regulation.description4")}
        </Text>
        <Text style={styles.title}>{t("school-regulation.title6")}</Text>
        <Text style={styles.text}>
          {t("school-regulation.description5")}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F7F7F7",
    padding: 20,
  },
  header: {
    backgroundColor: "#1B3A4B",
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  content: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
    textAlign: "justify",
  },
});
