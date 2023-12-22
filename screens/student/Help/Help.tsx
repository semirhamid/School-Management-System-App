import { View, Text, StyleSheet, Button } from "react-native";
import React, { useEffect } from "react";
import {
  ScrollView,
  VStack,
  Image,
  TextArea,
  Box,
  FormControl,
  Input,
} from "native-base";
import { Button as Bu } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { SET_CURRENT_HELP_SCREEN } from "../../../store/actions";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import axios from "axios";
import { RootState } from "../../../store/reducers";
import { useTranslation } from "react-i18next";

export default function Help() {
  const { t } = useTranslation()
  const dispatch = useDispatch();
  const [problem, setProblem] = useState("");
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [attachmentFiles, setAttachmentFiles] = useState("");
  const currentUser = useSelector((state: RootState) => state.currentUser);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("PosterUsername", currentUser.name);
    formData.append("Title", title);
    formData.append("Detail", detail);
    formData.append("AttachmentFiles", attachmentFiles);
    try {
      await axios.post("https://ask.com", { problem });
      alert("Problem submitted successfully!");
    } catch (error) {
      alert("Failed to submit problem. Please try again later.");
    }
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAttachmentFiles(result.assets[0].uri);
    }
  };

  useEffect(() => {
    dispatch({
      type: SET_CURRENT_HELP_SCREEN,
      payload: "Help",
    });
  }, []);

  return (
    <ScrollView flex={1} backgroundColor={"white"}>
      <VStack style={styles.container} flex={1}>
        <Image
          rounded={20}
          alt="Assistant image"
          source={require("../../../assets/images/virtual_assistant.png")}
          height={250}
        />
        <Text style={styles.title}>How can we help you?</Text>
        <Text style={styles.subtitle}>Describe your problem</Text>
        <FormControl alignSelf={"flex-start"}>
          <FormControl.Label fontWeight={"100"}>
            {t("login.email")}
          </FormControl.Label>
          <Box bgColor={"white"}>
            <Input
              w={{ base: "100%", md: "25%" }}
              fontSize={14}
              placeholder="Please enter the title"
              autoCapitalize="none"
              borderRadius={5}
              onChangeText={(text) => setTitle(text)}
              value={title}
              bgColor={"white"}
            />
          </Box>
        </FormControl>
        <TextArea
          placeholder="Enter your problem here"
          size="lg"
          marginBottom={5}
          totalLines={10}
        />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {attachmentFiles && (
            <Image
              source={{ uri: attachmentFiles }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
        <Bu>{t("global.submit")}</Bu>
      </VStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "lightgrey",
    paddingHorizontal: 20,
  },
  feedbackTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
    textAlign: "center",
  },
  feedbackText: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  feedbackButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
    marginTop: 20,
  },
  yesButton: {
    backgroundColor: "green",
  },
  noButton: {
    backgroundColor: "red",
  },
});
