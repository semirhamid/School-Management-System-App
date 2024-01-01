import { ScrollView, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Box, Center, HStack, Icon, IconButton, Input, Text, VStack, ZStack } from "native-base";
import { AuthContext } from "../../../utils/auth/auth-context";
import { AxiosContext } from "../../../utils/auth/axios-context";
import { ApiURL } from "../../../utils/url.global";
import { useNavigation } from "@react-navigation/native";
import { BottomTabParamList } from "../../../navigation/types/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { MaterialType } from "./MaterialType";
import { SET_CURRENT_HELP_SCREEN } from "../../../store/actions";
import { useTranslation } from "react-i18next";
import BackgroundTheme from "../../../assets/theme_bg"
import { MaterialIcons } from "@expo/vector-icons";

export default function Material() {
  const { t } = useTranslation()
  const authContext = useContext(AuthContext);
  const axiosContext = useContext(AxiosContext);
  const [materials, setMaterials] = useState<Array<MaterialType>>();
  const dispatch = useDispatch();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<BottomTabParamList, "MaterialStack">
    >();
  const books = [
    { id: 1, title: 'Algebra Fundamentals', description: 'Exploring the basics of algebraic theories and applications.' },
    { id: 2, title: 'Literary Classics', description: 'A comprehensive analysis of must-read classics in literature.' },
    { id: 3, title: 'Modern World History', description: 'A journey through significant global events from the 18th century to the present.' },
    { id: 4, title: 'Biology: The Study of Life', description: 'An in-depth look into the mechanisms of life and living organisms.' },
    { id: 5, title: 'Physics in Motion', description: 'Understanding the laws that govern movement and energy.' },
    { id: 6, title: 'Chemical Reactions', description: 'A dive into the interactions between different substances.' },
    { id: 7, title: 'Economics Today', description: 'An introduction to modern economic principles and practices.' },
    { id: 8, title: 'Environmental Science', description: 'Exploring the relationship between nature and human activity.' },
    { id: 9, title: 'Geometry & Space', description: 'Investigating shapes, sizes, and the properties of space.' },
    { id: 10, title: 'Shakespeare Uncovered', description: 'A detailed study of William Shakespeare’s most famous works.' },
    { id: 11, title: 'Art History: Renaissance to Modern', description: 'A visual journey through art from the Renaissance to the 20th century.' },
    { id: 12, title: 'French Language Mastery', description: 'Mastering the French language through comprehensive lessons.' },
    { id: 13, title: 'Spanish for Beginners', description: 'Building a foundation in Spanish for first-time learners.' },
    { id: 14, title: 'Computer Science Principles', description: 'The fundamentals of computing and the understanding of technology.' },
    { id: 15, title: 'American Government', description: 'An overview of the structure and functions of the U.S. government.' },
    { id: 16, title: 'Calculus Concepts', description: 'A conceptual approach to calculus for real-world applications.' },
    { id: 17, title: 'Psychology Insights', description: 'An exploration into the human mind and behavior.' },
    { id: 18, title: 'Classic Poetry', description: 'Analyzing the beauty and depth of classic poetic works.' },
    { id: 19, title: 'Physical Education & Health', description: 'Promoting wellness and physical fitness in teens.' },
    { id: 20, title: 'Music Theory and History', description: 'Understanding the evolution of music and its theoretical underpinnings.' }
  ];



  return (
    <VStack flex={1} >
      <VStack>
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
            px={10}
            width={"100%"}
          >
            <Center py={5} flex={1}>
              <Text fontSize={'2xl'} color={'white'} fontWeight={'semibold'} textAlign={'center'}>
                {t("material.title")}
              </Text>
            </Center>
          </VStack>

        </ZStack>
        <VStack
          p={5}
          pb={0}
          height={'full'}
        >
          <HStack justifyContent="space-between" alignItems="center" mb={5}>
            <Input placeholder="Search..." width="85%" borderRadius="10" px="2" />
            <IconButton
              icon={<Icon as={MaterialIcons} name="add" size="sm" color={'red.50'} />}
              borderRadius="full"
              backgroundColor={'green.400'}
            />
          </HStack>
          <VStack>
            {books.map((book) => (
              <HStack
                key={book.id}
                borderWidth="1"
                borderColor="coolGray.300"
                p="4"
                borderRadius="10"
                justifyContent="space-between"
                alignItems="center"
              >
                <IconButton
                  icon={<Icon as={MaterialIcons} name="book" size="xl" />}
                  borderRadius="full"
                />
                <VStack flex={1}>
                  <Text bold>Title</Text>
                  <Text fontSize="xs" color="coolGray.600">Description</Text>
                </VStack>
              </HStack>
            ))}
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  );
}


const styles = StyleSheet.create({
  courses: {
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
  },
  icon: {
    width: 40,
    height: 40,
  },
  bigContainer: {
    elevation: 20,
    flex: 1,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    textAlign: "center",
    marginHorizontal: "auto",
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
  headerText: {
    fontWeight: 'bold',
    color: '#00557A', // White text for the header
  },
  itemText: {
    flex: 1,
  },
  input: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: 'white', // White background for the input box
  },
  submitButton: {
    marginTop: 16,
    backgroundColor: '#00557A', // Use your theme color for the button
  }, container: {
    flex: 1,
    padding: 16,
  },
  headerRow: {
    backgroundColor: '#FFFFFF', // Adjust the color to match your theme
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    elevation: 1,
    marginBottom: 10, // Add space between rows
  },
  studentRow: {
    backgroundColor: '#f0f0f0', // Light gray for the input background, adjust as needed
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginBottom: 2, // Add space between rows
  },
  headerItem: {
    flex: 1, // Adjust flex distribution as needed
  }, gradeRow: {
    backgroundColor: '#FFFFFF', // Adjust the color to match your theme
    paddingVertical: 1,
    paddingHorizontal: 2,
    marginHorizontal: 1,
    marginVertical: 2,
    borderRadius: 4,
    elevation: 1,
  },
  headerNo: {
    width: '15%',
    // ... other styles you want to apply, like textAlign
  },
  headerStudents: {
    width: '45%',
    // ... other styles
  },
  headerPresent: {
    width: '20%',
    textAlign: "center",
    // ... other styles
  },
  headerTotal: {
    width: '20%',
    textAlign: "center",
    // ... other styles
  },
});
