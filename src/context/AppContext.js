import { createContext, useContext, useMemo, useReducer, useEffect } from "react";

import { AppReducer, initialState, initialFunction, dispatchTypes } from "./AppReducer";
import { axiosFormData, axiosMain } from "../axiosInstances";
import axios from "axios";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState, initialFunction);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);



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
      },
        function (error) {
          console.log('refresh')
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
                    console.log('changed')
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('currentAccessToken');
                    // 3) return originalRequest object with Axios.
                    return axios(originalRequest);
                  }
                })
            }
            dispatch({
              type: dispatchTypes.SESSION_EXPIRED
            })
          }
          console.log('didnt change')
          return Promise.reject(error);
        })

    }
  }, [state]);

  // useState(() => {
  //   console.log(path)
  //   if (state.stateLoaded) {
  //     console.log('check JWT', checkJWTExpiration(state.currentExpirationDate))
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