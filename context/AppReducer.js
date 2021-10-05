
// Enums for dispatch types
export const dispatchTypes = {
    LOGIN_SUCCEED: "login_succeed",
    LOGIN_FAIL: "login_fail",
    REGISTRATION_SUCCEED: "registration_succeed",
    REGISTRATION_FAIL: "registration_fail",
    AUTHENTICATED: "authenticated"
}

// Initialize variables
export const initialFunction = initialState => {
    let {
        currentUser,
        currentAccessToken,
        currentRefreshToken
    } = initialState;
    return {
        currentUser,
        currentAccessToken,
        currentRefreshToken

    }
}

// Initialize the initial state
export const initialState = {
    currentUser: "",
    currentAccessToken: "",
    currentRefreshToken: ""
}


export const AppReducer = (state, action) => {

    switch (action.type) {
        case dispatchTypes.LOGIN_SUCCEED: {
            return {
                ...state,
                currentUser: action.payload.currentUser,
                currentAccessToken: action.payload.currentAccessToken,
                currentRefreshToken: action.payload.currentRefreshToken
            }
        }
        case dispatchTypes.AUTHENTICATED: {
            return {
                ...state,
                currentUser: action.payload.currentUser,
                currentAccessToken: action.payload.currentAccessToken,
                currentRefreshToken: action.payload.currentRefreshToken
            }
        }
        default:
            return {
                ...state
            }
    }
}