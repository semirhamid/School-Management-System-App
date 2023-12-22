import { useContext, useState } from "react";
import { AuthContext } from "../../../utils/auth/auth-context";
import { AxiosContext } from "../../../utils/auth/axios-context";
import { Alert } from "react-native";
import axios from "axios";
import TokenInfo from "../../../utils/auth/tokenInfo";
import { ApiURL } from "../../../utils/url.global";
import { LOCAL_BASE_URL } from "../../../utils/url.global";
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

export const LoginUtil = () => {
  const axiosContext = useContext(AxiosContext);
  const authContext = useContext(AuthContext);
  const isAuthenticated = !!authContext?.getAccessToken();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");

  const onLogin = async (input: string, password: string) => {
    try {
      let response: any;
      if (EmailValidator.validate(input)) {
        response = await axiosContext?.publicAxios
          .post(LOCAL_BASE_URL + ApiURL.USER_LOGIN, {
            email: input,
            password: password,
          })
          .catch((error) => {
            throw new Error(error.response.data.message);
          });
      } else {
        response = await axiosContext?.publicAxios
          .post(LOCAL_BASE_URL + ApiURL.USER_LOGIN, {
            password: password,
            username: input,
          })
          .catch((error) => {
            console.log(error);
            throw new Error(error.response.data.message);
          });
      }

      const { token, refreshToken, roles } = response;
      let info = {} as TokenInfo;
      info.accessToken = token;
      info.refreshToken = refreshToken;
      info.authenticated = true;

      let decoded_token: CurrentUser = jwt_decode(token);
      let returnedUsername = decoded_token.name;

      dispatch({
        type: SET_USER,
        payload: {
          email: decoded_token.email,
          id: decoded_token.Id,
          role: decoded_token.role,
          name: decoded_token.name,
        },
      });

      authContext?.setAuthState(info);
      dispatch({
        type: SAVE_CREDENTIALS,
        payload: {
          username: input,
          password: password,
        },
      });

      if (roles.includes("parent")) {
        const userResponse = await axios.get(
          LOCAL_BASE_URL + ApiURL.GET_CHILDREN + returnedUsername,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authContext?.getAccessToken()}`,
            },
          },
        );

        dispatch({
          type: SET_ALL_CHILDREN,
          payload: userResponse.data,
        });
      } else if (roles.includes("student")) {
        const userResponse = await axios.get(
          LOCAL_BASE_URL + ApiURL.USER_PROFILE_BY_USERNAME,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authContext?.getAccessToken()}`,
            },
          },
        );

        dispatch({
          type: SET_CURRENT_CHILD,
          payload: userResponse.data,
        });
      }
    } catch (error: any) {
      console.log("error occured", error);
      if (error.message) {
        Alert.alert("Login Failed", error.message);
        console.log("login error", error.message);
        console.log(error.message.statusCode);
      } else {
        Alert.alert("Login Failed", error.response.data.message);
      }
    }
  };

  return {
    onLogin,
  };
};
