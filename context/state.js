import { createContext, useContext, useMemo, useReducer, useState } from 'react';
import { AppReducer, initialState } from './reducer';

const AppContext = createContext();

export function AppStore({ children }) {
    // Initiate state and dispatch using useReducer
    const { state, dispatch } = useReducer(AppReducer, initialState);

    // useMemo the value to be passed to the app
    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}

// custom hook to use the context
export function useAppContext() {
    return useContext(AppContext);
}