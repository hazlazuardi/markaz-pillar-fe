import NavbarDesktop from './modules/navbarDesktop';
import { useRouter } from 'next/router'
import { Snackbar } from '@mui/material';
import { useAppContext } from '../context/AppContext';
import { dispatchTypes } from '../context/AppReducer';
import { useEffect, useState } from 'react';

export default function Layout({ children }) {
    const router = useRouter();
    const showHeader = router.pathname !== '/login' && router.pathname !== '/registration'

    const { state, dispatch } = useAppContext();
    const { snackbarStatus, snackbarMessage } = state;

    useEffect(() => {

    },[snackbarStatus])
    return (
        <>
            {showHeader && <NavbarDesktop />}
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={snackbarStatus}
                onClose={() => dispatch({type: dispatchTypes.SNACKBAR_CLOSE})}
                message={snackbarMessage}
                key={"bottom" + "center"}
            />
            {children}
        </>
    )
}