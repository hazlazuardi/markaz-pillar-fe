import { useEffect } from "react";
import { useAppContext } from "./context/AppContext";
import { enumRoutes, enumProtectedRoutes, roleType } from "./context/AppReducer";


//check if you are on the client (browser) or server
const isBrowser = () => typeof window !== "undefined";

export default function ProtectedRoute({ router, children }) {
    //Identify authenticated user
    const { state } = useAppContext();
    const { currentUserRole, stateLoaded } = state;
    const isAdmin = currentUserRole === roleType.ROLE_SUPERUSER

    /**
     * @var pathIsNotProtected Checks if path exists in the unprotectedRoutes routes array
     */
    let pathIsNotProtected = enumProtectedRoutes.indexOf(router.pathname) === -1;

    useEffect(() => {
        if (isBrowser() && stateLoaded && localStorage.getItem('currentUserRole') && !isAdmin && !pathIsNotProtected) {
            router.push(enumRoutes.LANDING);
        }
    }, [currentUserRole, isAdmin, pathIsNotProtected, router, stateLoaded])

    return children;

};