import { Alert, KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, Button, Center, Text, HStack, ScrollView, VStack, ZStack, CheckIcon, ArrowDownIcon, FlatList, Input, FormControl } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  AssessmentStackParamList,
  BottomTabParamList,
  RootStackParamList,
} from "../../../navigation/types/types";
import { UseColumnOrderInstanceProps } from "react-table";
import { AuthContext } from "../../../utils/auth/auth-context";
import { AxiosContext } from "../../../utils/auth/axios-context";
import { ApiURL } from "../../../utils/url.global";
import { LOCAL_BASE_URL } from "../../../utils/url.global";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { SET_CURRENT_HELP_SCREEN } from "../../../store/actions";
import { useTranslation } from "react-i18next";
import BackgroundTheme from "../../../assets/theme_bg"
import { Select } from 'native-base';
import { Course } from "../Material/types";
import { Assessment, Type2Assessment } from "./AssesmentType";

type Teacher = { firstName: string; middleName: string };
export type resultGrade = { id: number; name: string; teacher: Teacher };
interface GetStudentSectionDTO {
  SectionName: string;
  StreamName: string;
  GradeName: string;
  BranchName: string;
}
interface Student {
  firstName: string;
  middleName: string;
  lastName: string;
  studentId: string;
  email: string;
  username: string;
};


export default function Assesments() {
  const { t } = useTranslation()
  const presentRefs = useRef({});
  const navigation =
    useNavigation<
      NativeStackNavigationProp<BottomTabParamList, "AssessmentStack">
    >();
  const authContext = useContext(AuthContext);
  const axiosContext = useContext(AxiosContext);
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const child = useSelector((state: RootState) => state.currentChild);
  const dispatch = useDispatch();
  const [subjects, setSubjects] = useState<Array<Course>>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [assessments, setAssessments] = useState<Array<Type2Assessment>>([]);
  const [assessmentsWeight, setAssessmentsWeight] = useState<Array<Assessment>>([]);
  const [selectedAssessment, setSelectedAssessment] = useState<string>('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [studentList, setStudentsList] = useState<Student[]>([])
  console.log("assesment weight", assessmentsWeight)
  console.log("assesment", assessments)
  const getStudentsBySection = async (section: GetStudentSectionDTO) => {
    axiosContext?.authAxios
      .post(LOCAL_BASE_URL + ApiURL.GET_STUDENTS_BY_SECTION, section)
      .then((res) => {
        setStudentsList(res.data);
      }).catch((err) => {
        console.log(err);
      });
  }
  const getAssesmentWeightByCourse = async (courseId: string) => {
    axiosContext?.authAxios
      .get(LOCAL_BASE_URL + ApiURL.GET_ASSESSMENT_WEIGHT_BY_SUBJECT_ID + courseId)
      .then((res) => {
        setAssessments(res.data);
      }).catch((err) => {
        console.log(err);
      });
  }
  const getAssesmentWeightById = async (weightId: string) => {
    axiosContext?.authAxios
      .get(LOCAL_BASE_URL + ApiURL.GET_ASSESSMENT_BY_WEIGHT_ID + weightId)
      .then((res) => {
        setAssessmentsWeight(res.data);
      }).catch((err) => {
        console.log(err);
      });
  }
  const getCourses = async () => {
    axiosContext?.authAxios
      .get(LOCAL_BASE_URL + ApiURL.GET_SUBJECT_BY_USERNAME)
      .then((res) => {
        setCourses(res.data);
      }).catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getCourses()
  }, [selectedSubject]);

  const submitGrades = () => {
    // students.forEach((student) => {
    //   console.log(`Student ID: ${student.id}, Present: ${student.present}`);
    // });
    // Alert.alert('Submit Grades', 'Grades have been submitted successfully!');
  };
  const inputsRef = useRef<{ [key: number]: string }>({});

  const handleGradeChange = (text: string, studentId: number) => {
    // setStudents(currentStudents =>
    //   currentStudents.map(student =>
    //     student.id === studentId ? { ...student, present: text } : student
    //   )
    // );
  };

  const changeCourse = (value: string) => {
    setSelectedSubject(value);
    getAssesmentWeightByCourse(value);
  }

  const changeAssesmentWeight = (value: string) => {
    setSelectedAssessment(value);
    const course = courses.find((course) => course.id.toString() === value);
    if (course) {
      const section = {
        SectionName: course.section.name,
        StreamName: course.grade.stream,
        GradeName: course.grade.name,
        BranchName: course.grade.branchName
      }
      getStudentsBySection(section);
    }
    getAssesmentWeightById(selectedAssessment)
  }
  const handleBlur = (studentId: number) => {
    // setStudents(currentStudents =>
    //   currentStudents.map(student =>
    //     student.id === studentId ? { ...student, present: inputsRef.current[studentId] } : student
    //   )
    // );
  };
  const renderHeaderComponent = () => {
    return (
      <VStack>
        <ZStack height={300} backgroundColor={'#00557A'} style={{ ...styles.banner, position: 'relative' }}>
          <Box
            height={300}
            width={"100%"}
            style={{ overflow: "hidden" }}
          >
            <BackgroundTheme
              height={350}
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
            height={300}
            style={styles.banner}
            px={10}
            width={"100%"}
          >
            <Center py={5}>
              <Text fontSize={'2xl'} color={'white'} fontWeight={'semibold'} textAlign={'center'}>
                Add Assesments
              </Text>
            </Center>
            <VStack >
              <VStack mb={'2'}>
                <FormControl>
                  <FormControl.Label _text={{ color: 'white' }}>Section</FormControl.Label>
                  <Select
                    placeholder="Select section"
                    onValueChange={(value) => changeCourse(value)}
                    selectedValue={selectedSubject}
                    backgroundColor={'white'}
                  >
                    {courses.map((course) => (
                      <Select.Item key={course.id} label={course.section?.name + "  " + course?.name} value={course.id.toString()} />
                    ))}
                  </Select>
                </FormControl>
              </VStack>
              {selectedSubject && (
                <VStack mt={'2'}>
                  <FormControl>
                    <FormControl.Label _text={{ color: 'white' }}>Assesment Weight</FormControl.Label>
                    <Select
                      placeholder="Select assesment weight"
                      onValueChange={(value) => changeAssesmentWeight(value)}
                      selectedValue={selectedAssessment}
                      backgroundColor={'white'}
                    >
                      {assessments.map((assesment) => (
                        <Select.Item key={assesment.id} label={assesment.name + "  " + assesment.weight} value={assesment?.id.toString()} />
                      ))}
                    </Select>
                  </FormControl>
                </VStack>
              )}

            </VStack>
          </VStack>

        </ZStack>
        <HStack mx={5} justifyContent="space-between" alignItems="center" mt={5} style={styles.headerRow}>
          <Text style={[styles.headerText, styles.headerNo]}>No</Text>
          <Text style={[styles.headerText, styles.headerStudents]}>Students</Text>
          <Text style={[styles.headerText, styles.headerPresent]}>Present</Text>
          <Text style={[styles.headerText, styles.headerTotal]}>Total</Text>
        </HStack>
      </VStack>
    )
  }
  console.log(studentList)

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <FlatList
        data={assessmentsWeight}
        keyboardShouldPersistTaps="always"
        extraData={assessmentsWeight}
        keyExtractor={(item) => item.id.toString()}
        backgroundColor={'#fefefe'}
        ListHeaderComponent={renderHeaderComponent}
        renderItem={({ item }) => (
          <Box style={styles.gradeRow} mx={5}>
            <HStack justifyContent="space-between" alignItems="center" my={2}>
              <Text width="15%" fontSize="md" textAlign="center" fontWeight={'semibold'} color={'#00557A'}>{item.student.studentId}</Text>
              <Text width="45%" fontSize="md" textAlign="left">{item.student.firstName + " " + item.student.middleName}</Text>
              <Input
                width="20%"
                variant="filled"
                backgroundColor={'#31C32E26'}
                keyboardType="numeric"
                value={item.result?.toString()}
                onChangeText={(text) => handleGradeChange(text, 100)}
                placeholder="Grade"
                textAlign="center"
                fontSize={'md'}
                fontWeight={'semibold'}
                color={'#31C32E'}
              />
              <Text width="20%" textAlign="center" fontSize={'lg'}
                fontWeight={'medium'}>{item.assessmentWeight.assessmentType.totalWeight}</Text>
            </HStack>
          </Box>
        )}

        ListFooterComponent={
          <Box mb={5} px={15}>
            <Button onPress={submitGrades} style={styles.submitButton}>Submit Grades</Button>
          </Box>
        }

      />
    </KeyboardAvoidingView>
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
