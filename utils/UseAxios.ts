import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

import { useContext } from "react";
import { AuthContext } from "./auth/auth-context";
import { AxiosContext } from "./auth/axios-context";

export const useAxios = <T>(
  config: AxiosRequestConfig<any>,
  loadOnStart: boolean = true,
): [boolean, T | undefined, string, () => void] => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T>();
  const [error, setError] = useState("");
  const authContext = useContext(AuthContext);
  const axiosContext = useContext(AxiosContext);

  useEffect(() => {
    if (loadOnStart) sendRequest();
    else setLoading(false);
  }, []);

  const request = () => {
    sendRequest();
  };

  const sendRequest = () => {
    setLoading(true);

    axiosContext
      ?.publicAxios(config)
      .then((response) => {
        setError("");
        setData(response.data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  return [loading, data, error, request];
};
