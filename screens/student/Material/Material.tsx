import { Alert, Dimensions, RefreshControl, ScrollView, StatusBar, StyleSheet } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Box, Center, Divider, FlatList, HStack, Icon, IconButton, Input, Menu, NativeBaseProvider, Pressable, Text, VStack, ZStack, useColorModeValue, } from "native-base";
import { AuthContext } from "../../../utils/auth/auth-context";
import { AxiosContext } from "../../../utils/auth/axios-context";
import { ApiURL, LOCAL_BASE_URL } from "../../../utils/url.global";
import { useNavigation } from "@react-navigation/native";
import { BottomTabParamList } from "../../../navigation/types/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { TabView, NavigationState, SceneRendererProps, Route } from 'react-native-tab-view';
import { useTranslation } from "react-i18next";
import BackgroundTheme from "../../../assets/theme_bg"
import { MaterialIcons } from "@expo/vector-icons";
import Animated, { set } from "react-native-reanimated";
import EditMaterialModal from "./EditMaterial";
import { MaterialStudent, MaterialType } from "./types";

interface Book {
  id: number;
  title: string;
  description: string;
}

export default function Material() {
  const { t } = useTranslation()
  const authContext = useContext(AuthContext);
  const axiosContext = useContext(AxiosContext);
  const [materials, setMaterials] = useState<MaterialType[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<MaterialType[]>([]);
  const [materialList, setMaterialList] = useState<MaterialStudent[]>([])
  const dispatch = useDispatch();
  const [currentScreen, setCurrentScreenTab] = useState<string>("student");
  const [searchTerm, setSearchQueryTerm] = useState('');
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);
  const [editMaterial, setEditMaterial] = useState<MaterialType | null>(null);

  const setSearchTerm = (searchTerm: string) => {
    setSearchQueryTerm(searchTerm);
    if (searchTerm.trim() === '') {
      setFilteredMaterials(materials);
    } else {
      setFilteredMaterials(filteredMaterials.filter((material) => material.title.toLowerCase().includes(searchTerm.toLowerCase())));
    }
  }

  const getMaterials = async () => {
    axiosContext?.authAxios
      .get(LOCAL_BASE_URL + ApiURL.GET_MATERIAL_BY_ADDEDUSER)
      .then((res) => {
        setMaterials(res.data);;
        setCurrentScreen(currentScreen)
        if (currentScreen == 'student') {
          setFilteredMaterials((res.data as MaterialType[]).filter((material) => material.students.length > 0 && material.students[0] != null));
        } else {
          setFilteredMaterials((res.data as MaterialType[]).filter((material) => material.sections.length > 0 && material.sections[0] != null));
        }
      }).catch((err) => {
        console.log(err);
      });
  }

  const setCurrentScreen = (screen: string) => {
    if (screen.trim() === "student") {
      setFilteredMaterials(materials.filter((material) => material.students.length > 0 && material.students[0] != null));
    } else {
      setFilteredMaterials(materials.filter((material) => material.sections.length > 0 && material.sections[0] != null));
    }
    setCurrentScreenTab(screen);
  }

  useEffect(() => {
    getMaterials()
  }, [isModalOpen]);

  const handleClose = (isSuccess: boolean) => {
    setModalOpen(false);
    getMaterials();

  }
  const handleEdit = (material: MaterialType) => {
    setEditMaterial(material);
    setModalOpen(true);
  };
  const deleteMaterial = async (material: MaterialType) => {
    try {
      axiosContext?.authAxios
        .delete(LOCAL_BASE_URL + ApiURL.DELETE_MATERIAL + material.uniqueKey)
        .then((res) => {
          Alert.alert("Sucess", "Material deleted successfully");
          getMaterials()
        }).catch((err) => {
          Alert.alert("Failed", "Could not remove the material");
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (material: MaterialType) => {
    Alert.alert(
      "Confirm Delete",
      `Are you sure you want to delete "${material.title}"?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => deleteMaterial(material),
          style: "destructive"
        }
      ]
    );
  };
  const renderMaterial = ({ item }: { item: MaterialType }) => {
    return (
      <HStack
        key={item.uniqueKey}
        borderWidth="1"
        borderColor="coolGray.300"
        px="4"
        py={2}
        borderRadius="10"
        justifyContent="space-between"
        alignItems="center"
        backgroundColor="white"
        mb={3}
      >
        <IconButton
          icon={<Icon as={MaterialIcons} name="book" size="5xl" color={currentScreen == "student" ? "blue.700" : "orange.700"} />}
          borderRadius="full"
          mr="2"
        />
        <VStack flex={1} justifyContent="center">
          <Text bold>{item.title}</Text>
          <Text fontSize="xs" color="coolGray.600">{item.description}</Text>
        </VStack>
        <Menu
          trigger={(triggerProps) => (
            <Pressable {...triggerProps}>
              <Icon as={MaterialIcons} name="more-vert" size="lg" />
            </Pressable>
          )}
        >
          <Menu.Item onPress={() => handleEdit(item)}>Edit</Menu.Item>
          <Divider my="1" />
          <Menu.Item onPress={() => handleDelete(item)}>Delete</Menu.Item>
        </Menu>
      </HStack>
    );
  };
  return (
    <VStack flex={1} backgroundColor={'white'} >
      <VStack height={150}>
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
      </VStack>
      <VStack
        p={5}
        flex={10}
      >
        <VStack minHeight={120}>
          <MaterialTab setCurrentScreen={setCurrentScreen} setSearchTerm={setSearchTerm} setModalOpen={setModalOpen} setEditMaterial={setEditMaterial} />
        </VStack>
        <FlatList data={filteredMaterials} renderItem={renderMaterial} keyExtractor={(item) => item.uniqueKey} />
        <EditMaterialModal
          isOpen={isModalOpen}
          onClose={handleClose}
          documents={editMaterial?.filePath || []}
          editDescription={editMaterial?.description || ''}
          editTitle={editMaterial?.title || ''}
          id={editMaterial?.uniqueKey || ''}
          operation={editMaterial ? "edit" : "add"}
          sectionsId={
            editMaterial?.sections
              .map((section) => section && section.id) // This will map sections to their ids or undefined if section is null
              .filter((id): id is number => id !== null && id !== undefined) || [] // This will filter out null and undefined
          }
          studentsId={
            editMaterial?.students
              .map((student) => student && student.userName) // Assuming students have an id
              .filter((id): id is string => id !== null && id !== undefined) || [] // Adjust accordingly for students
          }
          screen={currentScreen}
        />


      </VStack>
    </VStack>
  );
}

const StudentRoute = ({ setSearchTerm, setModalOpen, setEditMaterial }: { setSearchTerm: (searchTerm: string) => void, setModalOpen: (searchTerm: boolean) => void, setEditMaterial: (material: null) => void }) => {
  return (
    <VStack space={4} mt={2} mb={4} flex={9}>
      <HStack justifyContent="space-between" alignItems="center">
        <Input placeholder="Search..." width="85%" borderRadius="10" px="2" autoCorrect={false}
          onChangeText={(text) => setSearchTerm(text)} />
        <IconButton
          icon={<Icon as={MaterialIcons} name="add" size="md" color={'red.50'} />}
          borderRadius="full" backgroundColor={'green.300'} colorScheme="green"
          onPress={() => {
            setEditMaterial(null);
            setModalOpen(true)
          }}
        />
      </HStack>
    </VStack>
  )
};

const SectionRoute = ({ setSearchTerm, setModalOpen, setEditMaterial }: { setSearchTerm: (searchTerm: string) => void, setModalOpen: (searchTerm: boolean) => void, setEditMaterial: (material: null) => void }) => {
  return (
    <VStack space={4} mt={2} mb={4} flex={9}>
      <HStack justifyContent="space-between" alignItems="center">
        <Input placeholder="Search..." width="85%" borderRadius="10" px="2" autoCorrect={false}
          onChangeText={(text) => setSearchTerm(text)} />
        <IconButton
          icon={<Icon as={MaterialIcons} name="add" size="md" color={'red.50'} />}
          borderRadius="full" backgroundColor={'green.300'} colorScheme="green"
          onPress={() => {
            setEditMaterial(null);
            setModalOpen(true)
          }}
        />
      </HStack>
    </VStack>
  )
};

interface MaterialTabRoute extends Route {
  key: string;
  title: string;
}

const initialLayout = {
  width: Dimensions.get('window').width
};

const StudentRouteMemoized = React.memo(StudentRoute);
const SectionRouteMemoized = React.memo(SectionRoute);

function MaterialTab({ setCurrentScreen, setSearchTerm, setModalOpen, setEditMaterial }: { setCurrentScreen: (screen: string) => void, setSearchTerm: (searchTerm: string) => void, setModalOpen: (searchTerm: boolean) => void, setEditMaterial: (material: null) => void }) {
  const [index, setIndex] = React.useState<number>(0);
  const [routes] = React.useState<MaterialTabRoute[]>([
    { key: 'student', title: 'Share for student' },
    { key: 'section', title: 'Share for section' },
  ]);
  const renderScene = ({ route }: SceneRendererProps & { route: MaterialTabRoute }) => {
    switch (route.key) {
      case 'student':
        return <StudentRouteMemoized setSearchTerm={setSearchTerm} setModalOpen={setModalOpen} setEditMaterial={setEditMaterial} />;
      case 'section':
        return <SectionRouteMemoized setSearchTerm={setSearchTerm} setModalOpen={setModalOpen} setEditMaterial={setEditMaterial} />;
      default:
        return null;
    }
  };
  const setTabIndex = (idx: number) => {
    setIndex(idx);
    setCurrentScreen(routes[idx].key);
  }

  const renderTabBar = (props: SceneRendererProps & { navigationState: NavigationState<MaterialTabRoute> }) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    const preDefinedHandlePress = (ind: number) => {
      setTabIndex(ind);
    }
    return <Box flexDirection="row" w={'full'}>
      {props.navigationState.routes.map((route, i) => {
        const opacity = props.position.interpolate({
          inputRange,
          outputRange: inputRange.map(inputIndex => inputIndex === i ? 1 : 0.5)
        });
        const color = index === i ? useColorModeValue('#000', '#e5e5e5') : useColorModeValue('#1f2937', '#a1a1aa');
        const borderColor = index === i ? 'cyan.500' : useColorModeValue('coolGray.200', 'gray.400');
        return <Box borderBottomWidth="3" borderColor={borderColor} flex={1} alignItems="center" p="3" >
          <Pressable onPress={() => preDefinedHandlePress}>
            <Animated.Text style={{
              color
            }}>{route.title}</Animated.Text>
          </Pressable>
        </Box>;
      })}
    </Box>;
  };

  return <TabView navigationState={{
    index,
    routes
  }} renderScene={renderScene} renderTabBar={renderTabBar} onIndexChange={setTabIndex} initialLayout={initialLayout} lazy />;
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

