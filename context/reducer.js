
export const dispatchTypes = {
    LOGIN_SUCCEED: "login_succeed",
    LOGIN_FAIL: "login_fail",
    REGISTRATION_SUCCEED: "registration_succeed",
    REGISTRATION_FAIL: "registration_fail",
}

export const initialState = {
    user: ""
}

export const AppReducer = (state, action) => {

    switch(action.type) {
        case dispatchTypes.LOGIN_SUCCEED: {
            return {
                ...state,
                user: "Admin"
            }
        }
    }
}