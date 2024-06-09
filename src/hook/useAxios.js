/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-catch */
import { useEffect } from "react";
import { api } from "../Api";
import { useAuth } from "./useAuth";
import axios from "axios";

const useAxios = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    // add request interceptors
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        const authToken = auth?.authToken;
        // console.log(authToken, "authtoken");
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    //add response intersceptors

    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        // console.log(originalRequest, "original request");
        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = auth?.refreshToken;
            const response = await axios.post(
              `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
              { refreshToken }
            );

            const { token } = response.data;
            // console.log(`New token ${token}`);
            setAuth({ ...auth, authToken: token });

            //retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          } catch (error) {
            throw error;
          }
        }

        // Do something with request error
        return Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [auth.authToken]);
  return { api };
};
export default useAxios;
