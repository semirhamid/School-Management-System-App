//AuthContext.js
import { AxiosInstance } from "axios";
import React, { createContext, ReactNode, useState } from "react";
import * as Keychain from "react-native-keychain";
import TokenInfo from "./tokenInfo";

// const AuthContext = createContext(null);
// const { Provider } = AuthContext;

export type Props = {
  children: ReactNode;
  // axiosInstance: AxiosInstance;
};

export type AuthProviderType = {
  tokenInfo: TokenInfo;
  logout: () => void;
  getAccessToken: () => string | undefined;
  setAuthState: (info: TokenInfo) => void;
};

const AuthContext = React.createContext<AuthProviderType | null>(null);

const AuthProvider = (props: Props) => {
  const { children } = props;

  const [tokenInfo, setTokenInfo] = useState({} as TokenInfo);

  const logout = async () => {
    await Keychain.resetGenericPassword();
    setTokenInfo({} as TokenInfo);
  };

  const getAccessToken = (): string | undefined => {
    return tokenInfo.accessToken;
  };

  return (
    <AuthContext.Provider
      value={{
        tokenInfo: tokenInfo,
        getAccessToken: () => getAccessToken(),
        setAuthState: (info) => setTokenInfo(info),
        logout: () => logout(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
