import { useEffect } from "react";
import { useAppContext } from "./context/AppContext";
import { enumRoutes, enumProtectedRoutes, enumAuthenticatedRoutes, roleType, dispatchTypes } from "./context/AppReducer";
import Cookies from 'universal-cookie';

//check if you are on the client (browser) or server
const isBrowser = () => typeof window !== "undefined";

export default function ProtectedRoutes({ router, children }) {
    //Identify authenticated user
    const { state, dispatch } = useAppContext();
    const { currentUserRole, stateLoaded } = state;
    const isAdmin = currentUserRole === roleType.ROLE_SUPERUSER
    const cookies = new Cookies()

    /**
     * @var pathIsProtected Checks if path exists in the unprotectedRoutes routes array
     */
    let pathIsProtected = enumProtectedRoutes.includes(router.pathname);
    let pathNeedsAuthentication = enumAuthenticatedRoutes.includes(router.pathname);


    useEffect(() => {
        // This needs to get from localStorage in case after logout
        if (isBrowser() && stateLoaded && cookies.get('currentUserRole') && !isAdmin && pathIsProtected) {
            router.push({ pathname: enumRoutes.ERROR, query: { statusCode: 401, title: "Maaf, anda tidak memiliki akses ke halaman ini" } });
        }
        // This needs to get from state since it's checking the initial state (Everyone start without logged in)
        if (isBrowser() && stateLoaded && !cookies.get('currentUserRole') && !currentUserRole && pathNeedsAuthentication) {
            router.push({ pathname: enumRoutes.ERROR, query: { statusCode: 401, title: "Harap login sebelum akses halaman ini" } });
        }
    }, [currentUserRole, dispatch, isAdmin, pathIsProtected, pathNeedsAuthentication, router, stateLoaded])

    return children;

}