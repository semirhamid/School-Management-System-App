import {
  Input,
  Center,
  Box,
  Heading,
  Image,
  VStack,
  FormControl,
  Button,
  Text,
  Icon,
  ScrollView,
} from "native-base";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../utils/auth/auth-context";
import { AxiosContext } from "../../../utils/auth/axios-context";
import axios from "axios";
import TokenInfo from "../../../utils/auth/tokenInfo";
import { ApiURL } from "../../../utils/url.global";
import { LOCAL_BASE_URL } from "../../../utils/url.global";
import { MaterialIcons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LoginType, MainStackParamList } from "../../../navigation/types/types";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
  CurrentUser,
  SAVE_CREDENTIALS,
  SET_ALL_CHILDREN,
  SET_CURRENT_CHILD,
  SET_USER,
} from "../../../store/actions";
import jwt_decode from "jwt-decode";
import * as EmailValidator from "email-validator";
import { getNetworkStateAsync } from "expo-network";
import i18next, { languageResources } from '../../../services/i18next';
import { useTranslation } from 'react-i18next';
import languagesList from '../../../services/languagesList.json';

interface LoginResponse {
  errors: null | string[];
  isTemporaryPassword: boolean;
  permissions: string[];
  refreshToken: string;
  result: boolean;
  roles: string[];
  success: boolean;
  token: string;
}

export default function Login(props: LoginType) {
  const { t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18next.changeLanguage(lng);;
  };
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const [email, setEmail] = useState("mym768y23");
  const [userPassword, setPassword] = useState("Simreteab@123");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const authContext = useContext(AuthContext);
  const axiosContext = useContext(AxiosContext);
  const dispatch = useDispatch();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    changeLanguage('am')
    navigation.navigate("DRAWER");
  }, [])
  async function Login() {
    navigation.navigate("DRAWER");
    if (email.trim() == "" || userPassword.trim() == "") {
      setError(t('login.error.provide-credential'));
      return;
    }
    const network = await getNetworkStateAsync();
    if (!network.isConnected) {
      navigation.navigate("NoInternet");
      return;
    }
    setIsLoading(true);
    if (EmailValidator.validate(email)) {
      await axios
        .post(LOCAL_BASE_URL + ApiURL.USER_LOGIN, {
          email: email,
          password: userPassword,
        })
        .then((res) => {
          const { token, refreshToken, roles } = res.data;
          let info = {} as TokenInfo;
          info.accessToken = token;
          info.refreshToken = refreshToken;
          info.authenticated = true;
          let decoded_token: CurrentUser = jwt_decode(res.data.token);
          let returnedUsername = decoded_token.name;
          if (info.accessToken !== "") {
            authContext?.setAuthState(info);
          }
          try {
            dispatch({
              type: SET_USER,
              payload: {
                email: decoded_token.email,
                id: decoded_token.Id,
                role: decoded_token.role,
                name: decoded_token.name,
              },
            });
            dispatch({
              type: SAVE_CREDENTIALS,
              payload: {
                username: email,
                password: userPassword,
              },
            });
          } catch (error: any) {
            console.log(error.response.data);
            setIsLoading(false);
          }
          try {
            if (roles.includes("student")) {
              axiosContext?.authAxios
                .get(
                  LOCAL_BASE_URL +
                  ApiURL.USER_PROFILE_BY_USERNAME +
                  returnedUsername,
                )
                .then((res) => {
                  dispatch({
                    type: SET_CURRENT_CHILD,
                    payload: res.data,
                  });
                  navigation.navigate("DRAWER");
                })
                .catch((error) => {
                  setError(error.response.data);
                  setIsLoading(false);
                });
            }
          } catch (e: any) {
            console.log(e.response.data);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setError(t("login.error.invalid-password"));
          setIsLoading(false);
        });
    } else {
      await axios
        .post(LOCAL_BASE_URL + ApiURL.USER_LOGIN, {
          password: userPassword,
          username: email,
        })
        .then((res) => {
          const { token, refreshToken, roles } = res.data;
          let info = {} as TokenInfo;
          info.accessToken = token;
          info.refreshToken = refreshToken;
          info.authenticated = true;
          let decoded_token: CurrentUser = jwt_decode(token);
          let returnedUsername = decoded_token.name;
          if (info.accessToken !== "") {
            authContext?.setAuthState(info);
          }
          try {
            dispatch({
              type: SET_USER,
              payload: {
                email: decoded_token.email,
                id: decoded_token.Id,
                role: decoded_token.role,
                name: decoded_token.name,
              },
            });
            dispatch({
              type: SAVE_CREDENTIALS,
              payload: {
                username: email,
                password: userPassword,
              },
            });
          } catch (error: any) {
            setIsLoading(false);
          }
          try {
            if (roles.includes("student")) {
              axiosContext?.publicAxios
                .get(
                  LOCAL_BASE_URL +
                  ApiURL.USER_PROFILE_BY_USERNAME +
                  returnedUsername,
                )
                .then((res) => {
                  dispatch({
                    type: SET_CURRENT_CHILD,
                    payload: res.data,
                  });
                  navigation.navigate("DRAWER");
                })
                .catch((error) => {
                  setError(error.response.data);
                  setIsLoading(false);
                });
            }
          } catch (e: any) {
            console.log(e.response.data);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          setError(error.response.data);
          setIsLoading(false);
        });
    }
  }

  return (
    <ScrollView bgColor={"white"}>
      <Center px={4} flex={1}>
        <VStack safeArea p="2" py="1" justifyContent={"center"}>
          <VStack
            width={400}
            height={200}
            mb={-10}
            justifyContent={"flex-start"}
            mt={60}
          >
            <Center px={5} justifyContent={"center"} alignSelf={"center"}>
              <Image
                alt="bgis"
                source={require("../../../assets/images/bgLogox200.png")}
                style={{ padding: 20, height: 200 }}
              />
            </Center>
          </VStack>
          <VStack flex={4} mt={9} mb={0} justifyContent={"flex-start"}>
            <Heading
              width="300"
              textAlign={"center"}
              size="lg"
              fontWeight="600"
              color="coolGray.800"
              my={2}
              _dark={{ color: "warmGray.50" }}
              alignSelf={"center"}
            >
              {t('login.welcome')}
            </Heading>
            <Heading
              width="300"
              textAlign={"center"}
              mt="1"
              _dark={{ color: "warmGray.200" }}
              color="coolGray.600"
              fontWeight="medium"
              size="md"
              alignSelf={"center"}
            >
              {t('global.school-name')}
            </Heading>
          </VStack>
          <VStack width="300" space={3} my={4} flex={7} mx={"auto"}>
            <FormControl alignSelf={"flex-start"}>
              <FormControl.Label fontWeight={"100"}>
                {t('login.email')}
              </FormControl.Label>
              <Box bgColor={"white"}>
                <Input
                  w={{ base: "100%", md: "25%" }}
                  fontSize={14}
                  InputLeftElement={
                    <Box
                      py={3}
                      pl={1}
                      pr={2}
                      justifyContent={"center"}
                      bgColor={"muted.100"}
                    >
                      <Icon
                        as={<MaterialIcons name="person" />}
                        size={5}
                        ml="2"
                        color="muted.800"
                      />
                    </Box>
                  }
                  placeholder="example@abc.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCompleteType="email"
                  borderRadius={5}
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  bgColor={"white"}
                />
              </Box>
            </FormControl>
            <FormControl alignSelf={"center"}>
              <FormControl.Label>{t('login.password')}</FormControl.Label>
              <Input
                variant="rounded"
                bgColor={"white"}
                w={{ base: "100%", md: "25%" }}
                borderRadius={5}
                fontSize={14}
                InputLeftElement={
                  <Box
                    py={3}
                    pl={1}
                    pr={2}
                    justifyContent={"center"}
                    bgColor={"muted.100"}
                  >
                    <Icon
                      as={<MaterialIcons name="lock" />}
                      size={5}
                      ml="2"
                      color="muted.800"
                    />
                  </Box>
                }
                InputRightElement={
                  <Button
                    bg="transparent"
                    _pressed={{ opacity: 0.5 }}
                    onPress={handleTogglePassword}
                    px={2}
                    py={2}
                  >
                    <Icon
                      as={
                        <MaterialIcons
                          name={showPassword ? "visibility-off" : "visibility"}
                        />
                      }
                      size={5}
                      color="muted.800"
                    />
                  </Button>
                }
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                value={userPassword}
                secureTextEntry={!showPassword}
              />
            </FormControl>
            {/* this is to display login error */}
            <Text color={"red.500"} fontSize={12} fontWeight={"600"}>
              {typeof error == "object" ? (error as any)?.errors[0] : error}
            </Text>
            <Button
              isLoading={isLoading}
              isLoadingText="Signing in"
              onPress={() => {
                try {
                  Login();
                } catch (e) {
                  setError(t('login.error.network-error'));
                  setIsLoading(false);
                }
              }}
              borderWidth={1}
              borderColor={"tertiary.400"}
              variant={"subtle"}
              colorScheme="tertiary"
              rounded={25}
              mt="2"
            >
              {t('login.signin')}
            </Button>
          </VStack>
        </VStack>
      </Center>
    </ScrollView>
  );
}
