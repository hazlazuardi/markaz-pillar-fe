import { forwardRef } from 'react';
import Navbar from './modules/NavBar';
import { useRouter } from 'next/router'
import { Snackbar } from '@mui/material';
import { useAppContext } from '../context/AppContext';
import { dispatchTypes } from '../context/AppReducer';
import { useEffect } from 'react';
import { Box } from '@mui/system';
import MuiAlert from '@mui/material/Alert';

export default function Layout({ children }) {
    const router = useRouter();
    const showHeader = router.pathname !== '/login' && router.pathname !== '/registration'

    const { state, dispatch } = useAppContext();
    const { snackbarStatus, snackbarSeverity, snackbarMessage } = state;

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={2} ref={ref} variant="filled" {...props} />;
    });
    useEffect(() => {

    }, [snackbarStatus])
    return (
        <>
            {showHeader && <Navbar />}
            <Snackbar
                id='snackbarAtLayout'
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={snackbarStatus}
                onClose={() => dispatch({ type: dispatchTypes.SNACKBAR_CLOSE })}
                key={"bottom" + "center"}
                autoHideDuration={4000}
            >
                <Alert onClose={() => dispatch({ type: dispatchTypes.SNACKBAR_CLOSE })} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            {showHeader && <Box sx={{ height: '4em' }} />}
            {children}
            {showHeader && <Box sx={{ height: '6em' }} />}
        </>
    )
}