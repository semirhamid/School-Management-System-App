import React, { useContext, useEffect, useState } from 'react';
import { NativeBaseProvider, Modal, Button, FormControl, Input, TextArea, VStack, HStack, Text, IconButton, Icon, FlatList, Box, Select, SectionList } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import { ApiURL, LOCAL_BASE_URL } from '../../../utils/url.global';
import { set } from 'react-native-reanimated';
import { AuthContext } from '../../../utils/auth/auth-context';
import { AxiosContext } from '../../../utils/auth/axios-context';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers';
import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import CustomMultiSelect from '../Material/MultiSelectModal';
import { Course } from '../Assesment/types';


interface Attachment {
    name: string;
    uri: string;
}
// Extend the FormData type to accept our file structure
declare module 'react-native' {
    interface FormDataValue {
        uri: string;
        name: string;
        type: string;
    }

    interface FormData {
        append(name: string, value: string | Blob | FormDataValue, fileName?: string): void;
    }
}

interface AnnouncementProps {
    id: string;
    editTitle: string;
    editDescription: string;
    sectionsId: number[];
    studentsId: string[]
    documents: string[];
    isOpen: boolean,
    onClose: (isSuccess: boolean) => void,
    operation: string,
    screen: string
}
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



const EditAnnouncement: React.FC<AnnouncementProps> = ({ isOpen, onClose, editTitle, id, editDescription, sectionsId, studentsId, documents, operation, screen }) => {
    const [section, setSection] = useState<string[]>(sectionsId.map(x => x.toString()));
    const [students, setStudents] = useState<string[]>(studentsId);
    const [studentList, setStudentsList] = useState<Student[]>([])
    const [title, setTitle] = useState<string>(editTitle);
    const [description, setDescription] = useState<string>(editDescription);
    const [attachments, setAttachments] = useState<Attachment[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<string[]>([]);
    const [selectedCourseStudent, setSelectedCourseForStudent] = useState<string>();
    const [editDocuments, setEditDocuments] = useState<string[]>(documents)
    const axiosContext = useContext(AxiosContext);
    const currentUser = useSelector((state: RootState) => state.currentUser)
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

    const getUniqueSections = (courses: Course[]) => {
        const uniqueSectionsMap = new Map<number, { sectionName: string; streamId: string }>();

        courses.forEach((course) => {
            if (!uniqueSectionsMap.has(course.section.id)) {
                uniqueSectionsMap.set(course.section.id, {
                    sectionName: course.section.name + ` ${course.grade.name}`,
                    streamId: course.section.id.toString(),
                });
            }
        });

        return Array.from(uniqueSectionsMap, ([sectionId, { sectionName, streamId }]) => ({
            label: sectionName,
            value: sectionId.toString(),
        }));
    };
    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleSelectionDone = (selected: string[]) => {
        setSelectedStudents(selected);
        handleCloseModal();
    };
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
        setTitle(editTitle);
        setDescription(editDescription);
        setSection(sectionsId.map(String));
        setStudents(studentsId);
        setEditDocuments(documents);
        setSelectedCourse(sectionsId.map(String));
        setSelectedStudents(studentsId.map(String));
    }, [editTitle, editDescription, sectionsId, studentsId, documents, isOpen, screen]);

    const editPostAnnouncement = async () => {
        const formData = new FormData();
        if (screen == "student") {
            selectedStudents?.forEach((student) => {
                formData.append('ReceiverUsername', student);
            })
        } else {
            selectedCourse?.forEach((course) => {
                formData.append('SectionId', course);
            })
        }
        formData.append('Title', title);
        formData.append('PosterUsername', currentUser.name);
        formData.append('Detail', description);
        formData.append('Unique', id);

        // Function to infer the MIME type from the file extension
        const getMimeType = (fileUri: string) => {
            // Simple MIME type determination based on extension
            // Expand this function as needed
            const extension = fileUri.split('.').pop()?.toLowerCase();
            switch (extension) {
                case 'pdf': return 'application/pdf';
                case 'jpg': case 'jpeg': return 'image/jpeg';
                default: return 'application/octet-stream';
            }
        };


        // Process each attachment
        attachments.forEach(file => {
            formData.append("AttachmentFiles", {
                uri: file.uri,
                type: getMimeType(file.uri),
                name: file.name
            } as any);

        });
        try {
            console.log(formData)
            if (screen == 'student') {
                await axiosContext?.authAxios
                    .put(LOCAL_BASE_URL + ApiURL.UPDATE_ANNOUNCEMENT, formData, {
                        timeout: 30000,
                        headers: {
                            'Content-Type': 'multipart/form-data' // This line is often unnecessary as mentioned
                        }
                    })
                    .then((res) => {
                        Alert.alert('Success', 'Announcement edited successfully');
                    })
            } else {
                await axiosContext?.authAxios
                    .put(LOCAL_BASE_URL + ApiURL.UPDATE_ANNOUNCEMENT, formData, {
                        timeout: 30000,
                        headers: {
                            'Content-Type': 'multipart/form-data' // This line is often unnecessary as mentioned
                        }
                    })
                    .then((res) => {
                        Alert.alert('Success', 'Announcement edited successfully');
                    })
            }
        } catch (error: any) {
            Alert.alert('Failed', 'Couldnot edit a announcement');
            if (error.response) {
                // The request was made and the server responded with a status code
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        }
    }
    const postAnnouncement = async () => {
        const formData = new FormData();
        if (screen == "student") {
            selectedStudents?.forEach((student) => {
                formData.append('ReceiverUsername', student);
            })
        } else {
            selectedCourse?.forEach((course) => {
                formData.append('SectionId', course);
            })
        }
        formData.append('Title', title);
        formData.append('PosterUsername', currentUser.name);
        formData.append('Detail', description);
        formData.append('Date', new Date().toISOString());

        // Function to infer the MIME type from the file extension
        const getMimeType = (fileUri: string) => {
            // Simple MIME type determination based on extension
            // Expand this function as needed
            const extension = fileUri.split('.').pop()?.toLowerCase();
            switch (extension) {
                case 'pdf': return 'application/pdf';
                case 'jpg': case 'jpeg': return 'image/jpeg';
                default: return 'application/octet-stream';
            }
        };


        // Process each attachment
        attachments.forEach(file => {
            formData.append("AttachmentFiles", {
                uri: file.uri,
                type: getMimeType(file.uri),
                name: file.name
            } as any);

        });
        console.log(formData)
        try {
            console.log(screen)
            if (screen == 'student') {
                console.log(formData)
                await axiosContext?.authAxios
                    .post(LOCAL_BASE_URL + ApiURL.ADD_ANNOUNCEMENT, formData, {
                        timeout: 30000,
                        headers: {
                            'Content-Type': 'multipart/form-data' // This line is often unnecessary as mentioned
                        }
                    })
                    .then((res) => {
                        console.log(res);
                        Alert.alert('Success', 'Announcement added successfully');
                    })
            } else {
                await axiosContext?.authAxios
                    .post(LOCAL_BASE_URL + ApiURL.ADD_ANNOUNCEMENT, formData, {
                        timeout: 30000,
                        headers: {
                            'Content-Type': 'multipart/form-data' // This line is often unnecessary as mentioned
                        }
                    })
                    .then((res) => {
                        console.log(res);
                        Alert.alert('Success', 'Announcement added successfully');
                    })
            }
        } catch (error: any) {
            Alert.alert('Failed', 'Couldnot add a announcement');
            if (error.response) {
                // The request was made and the server responded with a status code
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        }
    }

    const getStudentsBySection = async (section: GetStudentSectionDTO) => {
        axiosContext?.authAxios
            .post(LOCAL_BASE_URL + ApiURL.GET_STUDENTS_BY_SECTION, section)
            .then((res) => {
                setStudentsList(res.data);
            }).catch((err) => {
                console.log(err);
            });
    }

    const handleAttachment = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({});
            if (result.type === 'success') {
                setAttachments([...attachments, { name: result.name, uri: result.uri }]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handlePost = () => {
        if (operation == "edit") {
            editPostAnnouncement();
        } else {
            postAnnouncement().then(() => {
                onClose(true);
            })
        }
    };

    const deletedUploadedDocument = (documentsList: string[], item: string) => {
        axiosContext?.authAxios
            .patch(LOCAL_BASE_URL + ApiURL.REMOVE_ATTACHEMENT_FROM_ANNOUNCEMENT + id + `&filename=${item}`)
            .then((res) => {
                setEditDocuments(documentsList);
            }).catch((err) => {
                console.log(err);
                Alert.alert('Failed', 'Could not remove the attachment announcement');
            });
    }

    const changeCourse = (value: string) => {
        setSelectedCourseForStudent(value);
        const course = courses.find((course) => course.section.id.toString() === value);
        if (course) {
            const section = {
                SectionName: course.section.name,
                StreamName: course.grade.stream,
                GradeName: course.grade.name,
                BranchName: course.grade.branchName
            }
            getStudentsBySection(section);
        }
    }

    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header>{capitalizeFirstLetter(operation) + " Announcement"}</Modal.Header>
                <Modal.Body>
                    <VStack space={4}>
                        {
                            screen == "student" ?
                                <>
                                    <FormControl>
                                        <FormControl.Label>Section</FormControl.Label>
                                        <Select
                                            placeholder="Select section"
                                            onValueChange={(value) => changeCourse(value)}
                                            selectedValue={selectedCourseStudent}
                                        >
                                            {courses.map((course) => (
                                                <Select.Item key={course.id} label={course.section.name + "  " + course.name} value={course.section.id.toString()} />
                                            ))}
                                        </Select>
                                    </FormControl>
                                    {
                                        selectedCourseStudent != "" ? <FormControl>
                                            <FormControl.Label>Students</FormControl.Label>
                                            <CustomMultiSelect
                                                options={studentList.map((student) => ({ id: student.studentId, name: student.studentId + "  " + student.firstName + "  " + student.middleName }))}
                                                selectedValues={selectedStudents}
                                                onSelectionDone={setSelectedStudents}
                                                placeholder="Select Options"
                                            />
                                        </FormControl> : <></>
                                    }
                                </>
                                : <FormControl>
                                    <FormControl.Label>Section</FormControl.Label>
                                    <CustomMultiSelect
                                        options={getUniqueSections(courses).map((course) => ({ id: course.value, name: course.label }))}
                                        selectedValues={selectedCourse}
                                        onSelectionDone={setSelectedCourse}
                                        placeholder="Select Options"
                                    />
                                </FormControl>
                        }
                        <FormControl>
                            <FormControl.Label>Title</FormControl.Label>
                            <Input placeholder="New Book 2" value={title} onChangeText={(text) => setTitle(text)} />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Description</FormControl.Label>
                            <TextArea
                                h={20}
                                placeholder="This is the description of the shared announcement..."
                                value={description}
                                onChangeText={(text) => setDescription(text)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Attachments</FormControl.Label>
                            <Button onPress={handleAttachment} leftIcon={<Icon as={MaterialIcons} name="attach-file" size="sm" />}>
                                Choose file
                            </Button>
                            <VStack>
                                {
                                    editDocuments.map((item) => (
                                        <HStack alignItems="center" space={2} key={item}>
                                            <Text flex={1} isTruncated>{item}</Text>
                                            <IconButton
                                                icon={<Icon as={MaterialIcons} name="delete" />}
                                                size="sm"
                                                onPress={() => deletedUploadedDocument(documents.filter(attachment => attachment !== item), item)}
                                            />
                                        </HStack>
                                    ))
                                }
                                {attachments.map((item) => (
                                    <HStack alignItems="center" space={2} key={item.uri}>
                                        <Text flex={1} isTruncated>{item.name}</Text>
                                        <IconButton
                                            icon={<Icon as={MaterialIcons} name="delete" />}
                                            size="sm"
                                            onPress={() => setAttachments(attachments.filter(attachment => attachment.uri !== item.uri))}
                                        />
                                    </HStack>
                                ))}
                            </VStack>
                        </FormControl>
                    </VStack>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button variant="ghost" colorScheme="coolGray" onPress={() => onClose(false)}>
                            Cancel
                        </Button>
                        <Button onPress={handlePost}>{capitalizeFirstLetter(operation)}</Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    );
};
interface Student {
    id: string;
    name: string;
}

interface MultiSelectModalProps {
    visible: boolean;
    onClose: () => void;
    onSelectionDone: (selected: string[]) => void;
    selectedItems: string[];
}



export default EditAnnouncement;