import { createContext, useContext, useMemo, useReducer, useEffect } from "react";

import { AppReducer, initialState, initialFunction, dispatchTypes } from "./AppReducer";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState, initialFunction);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  useEffect(() => {
    // Get user and tokens from localStorage
    const parsedLoggedUsername = JSON.parse(localStorage.getItem("currentUser"));
    const parsedAccessToken = JSON.parse(localStorage.getItem("currentAccessToken"));
    const parsedRefreshToken = JSON.parse(localStorage.getItem("currentRefreshToken"));
    
    // Check if those exist
    if (parsedLoggedUsername) {
      // Put them in their state
      dispatch({
        type: dispatchTypes.AUTHENTICATED,
        payload: {
          currentUser: parsedLoggedUsername,
          currentAccessToken: parsedAccessToken,
          currentRefreshToken: parsedRefreshToken
        }
      })
    }
  }, []);

  useEffect(() => {
    // If there's an update in the state, update the localStorage
    if(state !== initialState) {
      localStorage.setItem("currentUser", JSON.stringify(state.currentUser))
      localStorage.setItem("currentAccessToken", JSON.stringify(state.currentAccessToken))
      localStorage.setItem("currentRefreshToken", JSON.stringify(state.currentRefreshToken))
    }
  }, [state]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}