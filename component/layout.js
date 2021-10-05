import NavbarDesktop from './modules/navbarDesktop';
import { useRouter } from 'next/dist/client/router';

export default function Layout({ children }) {
    const router = useRouter();
    const showHeader = router.pathname !== '/login' || router.pathname !== '/registration'
    return (
        <>
            {showHeader && <NavbarDesktop />}
            {children}
        </>
    )
}