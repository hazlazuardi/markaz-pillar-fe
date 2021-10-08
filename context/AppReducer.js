
// Enums for dispatch types
export const dispatchTypes = {
    LOGIN_SUCCEED: "login_succeed",
    LOGIN_FAIL: "login_fail",
    REGISTRATION_SUCCEED: "registration_succeed",
    REGISTRATION_FAIL: "registration_fail",
    AUTHENTICATED: "authenticated",
    SNACKBAR_CLOSE: "snackbar_close"
}

export const roleType = {
    ROLE_SUPERUSER: "ROLE_SUPERUSER",
    ROLE_MEMBER: "ROLE_MEMBER"
}

// Initialize variables
export const initialFunction = initialState => {
    let {
        currentUser,
        currentUserRole,
        currentAccessToken,
        currentRefreshToken,
        snackbarStatus,
        snackbarMessage
    } = initialState;
    return {
        currentUser,
        currentUserRole,
        currentAccessToken,
        currentRefreshToken,
        snackbarStatus,
        snackbarMessage

    }
}

// Initialize the initial state
export const initialState = {
    currentUser: "",
    currentUserRole: "",
    currentAccessToken: "",
    currentRefreshToken: "",
    snackbarStatus: false,
    snackbarMessage: ""

}


export const AppReducer = (state, action) => {

    switch (action.type) {
        case dispatchTypes.LOGIN_SUCCEED: {
            return {
                ...state,
                currentUser: action.payload.currentUser,
                currentUserRole: action.payload.currentUserRole,
                currentAccessToken: action.payload.currentAccessToken,
                currentRefreshToken: action.payload.currentRefreshToken,
                snackbarStatus: true,
                snackbarMessage: `Welcome back, ${action.payload.currentUser}`
            }
        }
        case dispatchTypes.AUTHENTICATED: {
            return {
                ...state,
                currentUser: action.payload.currentUser,
                currentUserRole: action.payload.currentUserRole,
                currentAccessToken: action.payload.currentAccessToken,
                currentRefreshToken: action.payload.currentRefreshToken,
                snackbarStatus: true,
                snackbarMessage: `Welcome back, ${action.payload.currentUser}`
            }
        }
        case dispatchTypes.SNACKBAR_CLOSE: {
            return {
                ...state,
                snackbarStatus: false
            }
        }
        default:
            return {
                ...state
            }
    }
}