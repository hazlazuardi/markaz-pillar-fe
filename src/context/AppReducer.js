
// Enums for dispatch types
export const dispatchTypes = {
    LOGOUT: "logout",
    LOGIN_SUCCEED: "login_succeed",
    LOGIN_FAIL: "login_fail",
    REGISTRATION_SUCCEED: "registration_succeed",
    REGISTRATION_FAIL: "registration_fail",
    AUTHENTICATED: "authenticated",
    SNACKBAR_CLOSE: "snackbar_close",
    SNACKBAR_CUSTOM: "snackbar_custom",
    STATE_LOADED: "state_loaded",
    SERVER_ERROR: "server_error",
    LOGIN_NEEDED: 'login_needed'
}

export const roleType = {
    ROLE_SUPERUSER: "ROLE_SUPERUSER",
    ROLE_MEMBER: "ROLE_MEMBER"
}

export const markazCategory = {
    MARKAZ_UMUM: "Markaz Umum",
    MARKAZ_AKHWAT: "Markaz Akhwat",
    MARKAZ_IKHWAN: "Markaz Ikhwan"
}

export const enumRoutes = {
    LOGIN: "/login",
    PROFILE: "/profile",
    REGISTRATION: "/registration",

    MEMBER_MARKAZ: "/markaz",
    MEMBER_SANTRI: "/santri",

    ADMIN_MARKAZ: "/admin/markaz",
    ADMIN_MARKAZ_DETAIL: "/admin/markaz/[markaz_id]",
    ADMIN_MARKAZ_CREATE: "/admin/markaz/create",
    ADMIN_MARKAZ_EDIT: "/admin/markaz/[markaz_id]/edit",
    ADMIN_MARKAZ_DONASI: "/admin/markaz/[markaz_id]/donasi",
    ADMIN_MARKAZ_DONASI_CREATE: "/admin/markaz/[markaz_id]/donasi/create",
    ADMIN_MARKAZ_DONASI_EDIT: "/admin/markaz/[markaz_id]/donasi/[donasi_id]/edit",
    ADMIN_MARKAZ_TRANSAKSI: "/admin/markaz/[markaz_id]/donasi/[donasi_id]/transaksi",
    ADMIN_MARKAZ_PROGRESS_DONASI_CREATE: "/admin/markaz/[markaz_id]/donasi/[donasi_id]/progres/create",
    ADMIN_MARKAZ_PROGRESS_DONASI_EDIT: "/admin/markaz/[markaz_id]/donasi/[donasi_id]/progres/[progres_id]/edit",


    ADMIN_SANTRI: "/admin/santri",
    ADMIN_SANTRI_DETAIL: "/admin/santri/[id]",
    ADMIN_SANTRI_CREATE: "/admin/santri/create",
    ADMIN_SANTRI_EDIT: "/admin/santri/[progresid]/[id]",
    ADMIN_SANTRI_DONASI: "/admin/santri/donasi/[id]",
    ADMIN_SANTRI_DONASI_CREATE: "/admin/santri/donasi/create/[id]",
    ADMIN_SANTRI_DONASI_EDIT: "/admin/santri/donasi/[progresid]/[id]",
    ADMIN_SANTRI_TRANSAKSI: "/admin/santri/donasi/[id]/transaksi/[transid]",


    ADMIN_KEGIATAN: "/admin/kegiatan",
    ADMIN_KEGIATAN_CREATE: "/admin/kegiatan/create",
    ADMIN_KEGIATAN_EDIT: "/admin/kegiatan/[kegiatan_id]/edit",
    ADMIN_KEGIATAN_DETAIL: "/admin/kegiatan/[kegiatan_id]",
    ADMIN_KEGIATAN_DAFTAR: "/admin/kegiatan/[kegiatan_id]/relawan",
    ADMIN_KEGIATAN_TESTIMONI_CREATE: "/admin/kegiatan/[kegiatan_id]/testimoni/create",
    ADMIN_KEGIATAN_TESTIMONI_EDIT: "/admin/kegiatan/[kegiatan_id]/testimoni/[testimoni_id]/edit",


    ADMIN_PROGRAM_VOLUNTEER: "/admin/kegiatan",
    ADMIN_PESERTA_VOLUNTEER: "/admin/kegiatan/[id]",

    ADMIN_DATA_PENGGUNA: "/admin/data-pengguna",

    LANDING: "/",

};

export const enumProtectedRoutes = [
    enumRoutes.ADMIN_MARKAZ,
    enumRoutes.ADMIN_MARKAZ_DETAIL,
    enumRoutes.ADMIN_MARKAZ_CREATE,
    enumRoutes.ADMIN_MARKAZ_EDIT,
    enumRoutes.ADMIN_MARKAZ_DONASI,
    enumRoutes.ADMIN_MARKAZ_DONASI_CREATE,
    enumRoutes.ADMIN_MARKAZ_DONASI_EDIT,
    enumRoutes.ADMIN_MARKAZ_TRANSAKSI,

    enumRoutes.ADMIN_SANTRI,
    enumRoutes.ADMIN_SANTRI_DETAIL,
    enumRoutes.ADMIN_SANTRI_CREATE,
    enumRoutes.ADMIN_SANTRI_EDIT,
    enumRoutes.ADMIN_SANTRI_DONASI,
    enumRoutes.ADMIN_SANTRI_DONASI_CREATE,
    enumRoutes.ADMIN_SANTRI_DONASI_EDIT,
    enumRoutes.ADMIN_SANTRI_TRANSAKSI,

    enumRoutes.ADMIN_PROGRAM_VOLUNTEER,
    enumRoutes.ADMIN_PESERTA_VOLUNTEER,

    enumRoutes.ADMIN_DATA_PENGGUNA,
]

export const enumAuthenticatedRoutes = [
    enumRoutes.PROFILE,

]

// Initialize variables
export const initialFunction = initial => {
    let {
        currentUser,
        currentUserRole,
        currentAccessToken,
        currentRefreshToken,
        snackbarStatus,
        snackbarSeverity,
        snackbarMessage,
        stateLoaded
    } = initial;
    return {
        currentUser,
        currentUserRole,
        currentAccessToken,
        currentRefreshToken,
        snackbarStatus,
        snackbarSeverity,
        snackbarMessage,
        stateLoaded
    }
}

// Initialize the initial state
export const initialState = {
    currentUser: "",
    currentUserRole: "",
    currentAccessToken: "",
    currentRefreshToken: "",
    snackbarStatus: false,
    snackbarSeverity: "secondary",
    snackbarMessage: "",
    stateLoaded: false
}


export const AppReducer = (state, action) => {

    switch (action.type) {
        case dispatchTypes.LOGIN_NEEDED: {
            return {
                ...state,
                snackbarStatus: true,
                snackbarSeverity: 'secondary',
                snackbarMessage: "Harap login sebelum berdonasi"

            }
        }

        case dispatchTypes.LOGIN_SUCCEED: {
            return {
                ...state,
                currentUser: action.payload.currentUser,
                currentUserRole: action.payload.currentUserRole,
                currentAccessToken: action.payload.currentAccessToken,
                currentRefreshToken: action.payload.currentRefreshToken,
                snackbarStatus: true,
                snackbarSeverity: 'success',
                snackbarMessage: `Welcome back, ${action.payload.currentUser}`
            }
        }
        case dispatchTypes.LOGIN_FAIL: {
            return {
                ...state,
                snackbarStatus: true,
                snackbarSeverity: 'error',
                snackbarMessage: `Alamat email atau password salah`
            }
        }
        case dispatchTypes.REGISTRATION_SUCCEED: {
            return {
                ...state,
                currentUser: action.payload.currentUser,
                currentUserRole: action.payload.currentUserRole,
                currentAccessToken: action.payload.currentAccessToken,
                currentRefreshToken: action.payload.currentRefreshToken,
                snackbarStatus: true,
                snackbarSeverity: 'success',
                snackbarMessage: `Welcome, ${action.payload.currentUser}`
            }
        }

        case dispatchTypes.REGISTRATION_FAIL: {
            return {
                ...state,
                currentUser: "",
                currentUserRole: "",
                currentAccessToken: "",
                currentRefreshToken: "",
                snackbarStatus: true,
                snackbarSeverity: 'error',
                snackbarMessage: action.payload.message
            }
        }
        case dispatchTypes.AUTHENTICATED: {
            return {
                ...state,
                currentUser: action.payload.currentUser,
                currentUserRole: action.payload.currentUserRole,
                currentAccessToken: action.payload.currentAccessToken,
                currentRefreshToken: action.payload.currentRefreshToken,
                snackbarStatus: false,
                snackbarMessage: ``
            }
        }
        case dispatchTypes.SNACKBAR_CLOSE: {
            return {
                ...state,
                snackbarStatus: false
            }
        }
        case dispatchTypes.LOGOUT: {
            localStorage.clear()
            return {
                ...state,
                currentUser: "",
                currentUserRole: "",
                currentAccessToken: "",
                currentRefreshToken: "",
                snackbarStatus: true,
                snackbarSeverity: 'secondary',
                snackbarMessage: `Good bye`
            }
        }
        case dispatchTypes.SNACKBAR_CUSTOM: {
            return {
                ...state,
                snackbarStatus: true,
                snackbarSeverity: action.payload.severity || 'secondary',
                snackbarMessage: action.payload.message
            }
        }
        // To make sure state is loaded & updated from localStorage
        case dispatchTypes.STATE_LOADED: {
            return {
                ...state,
                stateLoaded: true
            }
        }
        case dispatchTypes.SERVER_ERROR: {
            return {
                ...state,
                snackbarStatus: true,
                snackbarSeverity: 'error',
                snackbarMessage: "Sorry, Server Error"
            }
        }

        default:
            return {
                ...state
            }
    }
}