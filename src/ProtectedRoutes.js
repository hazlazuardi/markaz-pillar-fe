import { useAppContext } from "./context/AppContext";
import {  enumRoutes, enumProtectedRoutes, roleType } from "./context/AppReducer";


//check if you are on the client (browser) or server
const isBrowser = () => typeof window !== "undefined";

export default function ProtectedRoute({ router, children }) {
    //Identify authenticated user
    const { state } = useAppContext();
    const { currentUserRole } = state;
    const isAdmin = currentUserRole === roleType.ROLE_SUPERUSER

    /**
     * @var pathIsProtected Checks if path exists in the unprotectedRoutes routes array
     */
    let pathIsNotProtected = enumProtectedRoutes.indexOf(router.pathname) === -1;

    if (isBrowser() && !isAdmin && !pathIsNotProtected) {
        router.push(enumRoutes.LANDING);
    }

    return children;
};