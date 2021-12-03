import { createContext, useContext, useMemo, useReducer, useEffect, useCallback } from "react";

import { AppReducer, initialState, initialFunction, dispatchTypes, roleType } from "./AppReducer";
import { axiosFormData, axiosMain } from "../axiosInstances";
import axios from "axios";

import Error from 'next/error'

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState, initialFunction);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  const handleRefresh = useCallback((error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (JSON.parse(localStorage.getItem('currentRefreshToken')) != "") {
        return axios.post('/authenticate/refresh', {
          refreshToken: JSON.parse(localStorage.getItem('currentRefreshToken')),
          accessToken: JSON.parse(localStorage.getItem('currentAccessToken'))
        })
          .then(res => {

            if (res.status === 200) {
              // 1) put token to LocalStorage
              localStorage.setItem("currentAccessToken", res.data.accessToken);
              localStorage.setItem("currentRefreshToken", res.data.refreshToken);
              // 2) Change Authorization header

              axiosFormData.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('currentAccessToken');
              axiosMain.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('currentAccessToken');

              // 3) return originalRequest object with Axios.
              return axios(originalRequest);
            }
          })
          .catch(err => {

            if (err.response.status === 400) {
              // Then it's expired
              dispatch({
                type: dispatchTypes.SESSION_EXPIRED
              })
            }

          })
      }
      if (state.currentUserRole === roleType.ROLE_SUPERUSER) {
        dispatch({
          type: dispatchTypes.SESSION_EXPIRED
        })
        return (<Error statusCode={401} title='Sesi anda telah habis' />)
      }
      if (state.currentUserRole === roleType.ROLE_MEMBER) {
        dispatch({
          type: dispatchTypes.UNAUTHORIZED_ADMIN
        })
        return (<Error statusCode={401} title='Harap Login sebagai Admin' />)

      }
    }
    if (error.response.status === 500 && !originalRequest._retry) {
      return (<Error statusCode={500} title='Harap Login kembali' />)

    }
    return Promise.reject(error);
  }, [state.currentUserRole])


  useEffect(() => {
    // Get user and tokens from localStorage
    const parsedLoggedUsername = JSON.parse(localStorage.getItem("currentUser"));
    const parsedLoggedUserRole = JSON.parse(localStorage.getItem("currentUserRole"));
    const parsedExpirationDate = JSON.parse(localStorage.getItem("currentExpirationDate"));
    const parsedAccessToken = JSON.parse(localStorage.getItem("currentAccessToken"));
    const parsedRefreshToken = JSON.parse(localStorage.getItem("currentRefreshToken"));

    // Check if those exist
    if (parsedLoggedUsername) {
      // Put them in their state
      dispatch({
        type: dispatchTypes.AUTHENTICATED,
        payload: {
          currentUser: parsedLoggedUsername,
          currentUserRole: parsedLoggedUserRole,
          currentExpirationDate: parsedExpirationDate,
          currentAccessToken: parsedAccessToken,
          currentRefreshToken: parsedRefreshToken
        }
      })
    }

    // a "gate" to tell that the state has been loaded
    dispatch({
      type: dispatchTypes.STATE_LOADED
    })

  }, []);

  useEffect(() => {
    // If there's an update in the state, update the localStorage
    if (state !== initialState) {
      localStorage.setItem("currentUser", JSON.stringify(state.currentUser))
      localStorage.setItem("currentUserRole", JSON.stringify(state.currentUserRole))
      localStorage.setItem("currentExpirationDate", JSON.stringify(state.currentExpirationDate))
      localStorage.setItem("currentAccessToken", JSON.stringify(state.currentAccessToken))
      localStorage.setItem("currentRefreshToken", JSON.stringify(state.currentRefreshToken))
      axiosMain.defaults.headers.common["Authorization"] = `Bearer ${state.currentAccessToken}`
      axiosFormData.defaults.headers.common["Authorization"] = `Bearer ${state.currentAccessToken}`
      axiosMain.interceptors.response.use((response) => {
        return response
      }, (error) => handleRefresh(error))
      axiosFormData.interceptors.response.use((response) => {
        return response
      }, (error) => handleRefresh(error))
    }
  }, [handleRefresh, state]);


  // useState(() => {
  //   
  //   if (state.stateLoaded) {
  //     
  //   }
  // }, [path])

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}