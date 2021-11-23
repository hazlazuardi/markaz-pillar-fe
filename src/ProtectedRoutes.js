import { useEffect } from "react";
import { useAppContext } from "./context/AppContext";
import { enumRoutes, enumProtectedRoutes, enumAuthenticatedRoutes, roleType } from "./context/AppReducer";


//check if you are on the client (browser) or server
const isBrowser = () => typeof window !== "undefined";

export default function ProtectedRoutes({ router, children }) {
    //Identify authenticated user
    const { state } = useAppContext();
    const { currentUserRole, stateLoaded } = state;
    const isAdmin = currentUserRole === roleType.ROLE_SUPERUSER

    /**
     * @var pathIsProtected Checks if path exists in the unprotectedRoutes routes array
     */
    let pathIsProtected = enumProtectedRoutes.includes(router.pathname);
    let pathNeedsAuthentication = enumAuthenticatedRoutes.includes(router.pathname);


    useEffect(() => {
        // This needs to get from localStorage in case after logout
        if (isBrowser() && stateLoaded && localStorage.getItem('currentUserRole') && !isAdmin && pathIsProtected) {
            router.push(enumRoutes.LANDING);
        }
        // This needs to get from state since it's checking the initial state (Everyone start without logged in)
        if (isBrowser() && stateLoaded && localStorage.getItem('currentUserRole') && !!currentUserRole && pathNeedsAuthentication) {
            router.push(enumRoutes.LANDING);
        }
    }, [currentUserRole, isAdmin, pathIsProtected, pathNeedsAuthentication, router, stateLoaded])

    return children;

}