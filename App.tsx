Object.defineProperty(Blob, Symbol.toStringTag, { value: 'Blob' });
Object.defineProperty(File.prototype, Symbol.toStringTag, { value: 'File' });
import { NativeBaseProvider } from "native-base";
import { Provider, useSelector } from "react-redux";
import { AuthProvider } from "./utils/auth/auth-context";
import { AxiosProvider } from "./utils/auth/axios-context";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./utils/auth/auth-context";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./navigation/student/AuthNavigator";
import ErrorBoundary from "./ErrorBoundary";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import SplashScreen from "./screens/shared/splash/SplashScreen";

export default function App() {
  const [isAppLoading, setIsAppLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsAppLoading(false);
    }, 3000);
  });
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <AxiosProvider>
              <NavigationContainer>
                <NativeBaseProvider>
                  {isAppLoading ? <SplashScreen /> : <AuthNavigator />}
                </NativeBaseProvider>
              </NavigationContainer>
            </AxiosProvider>
          </AuthProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}
