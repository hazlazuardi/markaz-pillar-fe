import { useEffect } from "react";
import { useAppContext } from "./context/AppContext";
import { enumRoutes, enumProtectedRoutes, roleType } from "./context/AppReducer";


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

    useEffect(() => {
        if (isBrowser() && stateLoaded && localStorage.getItem('currentUserRole') && !isAdmin && pathIsProtected) {
            router.push(enumRoutes.LANDING);
        }
    }, [currentUserRole, isAdmin, pathIsProtected, router, stateLoaded])

    return children;

}