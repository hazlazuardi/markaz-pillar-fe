import NavbarDesktop from './modules/NavbarDesktop';
import { useRouter } from 'next/router'
import { Snackbar } from '@mui/material';
import { useAppContext } from '../context/AppContext';
import { dispatchTypes } from '../context/AppReducer';
import { useEffect } from 'react';
import { Box } from '@mui/system';

export default function Layout({ children }) {
    const router = useRouter();
    const showHeader = router.pathname !== '/login' && router.pathname !== '/registration'

    const { state, dispatch } = useAppContext();
    const { snackbarStatus, snackbarMessage } = state;

    useEffect(() => {

    }, [snackbarStatus])
    return (
        <>
            {showHeader && <NavbarDesktop />}
            <Snackbar
                id='snackbarAtLayout'
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={snackbarStatus}
                onClose={() => dispatch({ type: dispatchTypes.SNACKBAR_CLOSE })}
                message={snackbarMessage}
                key={"bottom" + "center"}
            />
            {showHeader && <Box sx={{ height: '3em' }} />}
            {children}
            {showHeader && <Box sx={{ height: '6em' }}></Box>}
        </>
    )
}