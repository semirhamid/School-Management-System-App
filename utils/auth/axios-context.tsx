import React, { createContext, ReactNode, useContext } from "react";
import axios, { AxiosInstance } from "axios";
import { AuthContext } from "./auth-context";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import * as Keychain from "react-native-keychain";
import TokenInfo from "./tokenInfo";
import { ApiURL, LOCAL_BASE_URL } from "../url.global";

// const AxiosContext = createContext(null);
// const { Provider } = AxiosContext;
export type AxiosProps = {
  children: ReactNode;
  // axiosInstance: AxiosInstance;
};

export type AxiosProviderType = {
  authAxios: AxiosInstance;
  publicAxios: AxiosInstance;
};
const AxiosContext = React.createContext<AxiosProviderType | null>(null);

const AxiosProvider = (props: AxiosProps) => {
  const { children } = props;
  const authContext = useContext(AuthContext);

  const authAxios = axios.create({
    baseURL: LOCAL_BASE_URL,
  });

  const publicAxios = axios.create({
    baseURL: LOCAL_BASE_URL,
  });

  authAxios.interceptors.request.use(
    (config) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${authContext?.getAccessToken()}`;
      }

      return config;
    },
    (error) => {
      console.error("Server Error:", error.response);
      return Promise.reject(error);
    },
  );

  const refreshAuthLogic = (failedRequest: any) => {
    const data = {
      refreshToken: authContext?.tokenInfo.refreshToken,
    };

    const options = {
      method: "POST",
      data,
      url: LOCAL_BASE_URL,
    };

    return axios(options)
      .then(async (tokenRefreshResponse) => {
        failedRequest.response.config.headers.Authorization =
          "Bearer " + tokenRefreshResponse.data.accessToken;

        authContext?.setAuthState({
          ...authContext?.tokenInfo,
          accessToken: tokenRefreshResponse.data.accessToken,
        });

        await Keychain.setGenericPassword(
          "token",
          JSON.stringify({
            accessToken: tokenRefreshResponse.data.accessToken,
            refreshToken: authContext?.tokenInfo.refreshToken,
          }),
        );

        return Promise.resolve();
      })
      .catch((e) => {
        authContext?.setAuthState({} as TokenInfo);
      });
  };

  createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {});

  return (
    <AxiosContext.Provider
      value={{
        authAxios,
        publicAxios,
      }}
    >
      {children}
    </AxiosContext.Provider>
  );
};

export { AxiosContext, AxiosProvider };
