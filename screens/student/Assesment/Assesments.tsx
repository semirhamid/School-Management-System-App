import { Alert, KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
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
import NumericInput from "./NumericInputProps";

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
  const [assessmentsWeightSubmit, setAssessmentsWeightSubmit] = useState<Array<Assessment>>([]);
  const [selectedAssessment, setSelectedAssessment] = useState<string>('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [studentList, setStudentsList] = useState<Student[]>([])
  const inputValuesRef = useRef<{ [studentId: string]: string }>({});


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
  }, []);

  const submitGrades = async () => {
    const studentResult = assessmentsWeight.map((item) => {
      return {
        id: item.id,
        assesmentWeightId: parseInt(selectedAssessment),
        result: item.result,
        studentUsername: item.student.username,
        isSubmitted: true,
        isApproved: false
      }
    }
    ).filter((item) => item.result);
    console.log(studentResult)
    await axiosContext?.authAxios
      .post(LOCAL_BASE_URL + ApiURL.ADD_MULTIPLE_ASSESMENT, studentResult, {
        timeout: 30000
      })
      .then((res) => {
        console.log(res);
        Alert.alert('Success', 'Assessment submitted successfully');
      }).catch((err) => {
        console.log(err.response.data);
        console.log(studentResult)
        Alert.alert('Error', 'Something went wrong');
      }
      );
    getAssesmentWeightById(selectedAssessment);
  };

  const handleGradeChange = useCallback((text: string, studentId: string) => {
    const newAssessment = assessmentsWeight.map(assessment => {
      if (assessment.student.studentId === studentId) {
        return { ...assessment, result: text ? parseInt(text) : null };
      }
      return assessment;
    })
    setAssessmentsWeight(newAssessment);
  }, []);

  const changeCourse = (value: string) => {
    setSelectedSubject(value);
    getAssesmentWeightByCourse(value);
  }
  const handleSubmitOrBlur = useCallback((studentId: string) => {
    // Retrieve the value from ref
    const value = inputValuesRef.current[studentId];

    // Now update your state or perform actions as necessary
    console.log(`Submit or Blur: ${studentId} with value: ${value}`);
    // Example: updateAssessmentResult(studentId, value); // Implement this function based on your application logic
  }, []);

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
    getAssesmentWeightById(value)
  }


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
          <Text style={[styles.headerText, styles.headerPresent]}>Result</Text>
        </HStack>
      </VStack>
    )
  }

  const renderItem = ({ item }: { item: Assessment }) => (
    <Box style={styles.gradeRow} mx={5}>
      <HStack justifyContent="space-between" alignItems="center" my={2}>
        <Text width="30%" fontSize="xs" textAlign="center" fontWeight={'semibold'} color={'#00557A'}>
          {item.student.studentId}
        </Text>
        <Text width="50%" fontSize="sm" textAlign="left">
          {item.student.firstName + " " + item.student.middleName}
        </Text>
        <Input
          width="20%"
          variant="filled"
          isReadOnly={!!item.isSubmitted}
          backgroundColor="#31C32E26"
          keyboardType="numeric"
          defaultValue={item.result?.toString() ?? ''}
          onChangeText={(text) => handleGradeChange(text, item.student.studentId)}
          placeholder="N/A"
          textAlign="center"
          fontSize="sm"
          fontWeight="semibold"
          color="#31C32E"
          ref={(el) => (inputValuesRef.current[item.student.studentId] = el)}
          onFocus={() => console.log(`Input ${item.student.studentId} focused`)}
          onBlur={() => handleSubmitOrBlur(item.student.studentId)}
        />
      </HStack>
    </Box>
  );



  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
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
          <Text style={[styles.headerText, styles.headerPresent]}>Result</Text>
        </HStack>
      </VStack>
      {/* <FlatList
        data={assessmentsWeight}
        keyboardShouldPersistTaps="always"
        extraData={assessmentsWeight}
        keyExtractor={(item) => item.id.toString()}
        backgroundColor={'#fefefe'}
        ListHeaderComponent={renderHeaderComponent}
        renderItem={renderItem}
        ListFooterComponent={
          assessmentsWeight.filter((item) => item?.result == null).length > 0 ?
            <Box mb={5} px={15}>
              <Button onPress={submitGrades} style={styles.submitButton}>Submit Grades</Button>
            </Box> : null
        }

      /> */}
      <ScrollView>
        {
          assessmentsWeight.map(item => {
            return <Box key={item.student.email} style={styles.gradeRow} mx={5}>
              <HStack justifyContent="space-between" alignItems="center" my={2}>
                <Text width="30%" fontSize="xs" textAlign="center" fontWeight={'semibold'} color={'#00557A'}>
                  {item.student.studentId}
                </Text>
                <Text width="50%" fontSize="sm" textAlign="left">
                  {item.student.firstName + " " + item.student.middleName}
                </Text>
                <Input
                  width="20%"
                  variant="filled"
                  isReadOnly={!!item.isSubmitted}
                  backgroundColor="#31C32E26"
                  keyboardType="numeric"
                  defaultValue={item.result?.toString() ?? ''}
                  onChangeText={(text) => handleGradeChange(text, item.student.studentId)}
                  placeholder="N/A"
                  textAlign="center"
                  fontSize="sm"
                  fontWeight="semibold"
                  color="#31C32E"
                  ref={(el) => (inputValuesRef.current[item.student.studentId] = el)}
                  onFocus={() => console.log(`Input ${item.student.studentId} focused`)}
                  onBlur={() => handleSubmitOrBlur(item.student.studentId)}
                />
              </HStack>
            </Box>
          })
        }
        {
          assessmentsWeight.filter((item) => item?.result == null).length > 0 ?
            <Box mb={5} px={15}>
              <Button onPress={submitGrades} style={styles.submitButton}>Submit Grades</Button>
            </Box> : null
        }
      </ScrollView>
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
