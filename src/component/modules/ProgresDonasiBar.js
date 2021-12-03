import React from 'react'
import { Button, Container, LinearProgress, Typography } from '@mui/material'
import { Box } from '@mui/system';
import { useAppContext } from '../../context/AppContext';
import { useRouter } from 'next/router';
import { dispatchTypes, enumRoutes } from '../../context/AppReducer';


// Create our number formatter.
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'IDR',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

export default function ProgresDonasiBar(props) {
    const { isAdmin, donated, nominal, hrefDonasi } = props
    const { state, dispatch } = useAppContext()
    const { currentUser, stateLoaded } = state;

    const router = useRouter()
    const handleDonasi = (href) => {
        if (stateLoaded && currentUser) {
            router.push({ pathname: href, query: { ...router.query } })
        } else {
            dispatch({ type: dispatchTypes.UNAUTHORIZED_DONASI })
            router.push(enumRoutes.LOGIN)
        }
    }

    return (
        <>
            <Container disableGutters sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 2, mb: 2, p: 2 }} >
                <Box sx={{ width: '100%', mb: 2 }}>
                    <LinearProgressWithLabel value={(donated / nominal) * 100} />
                </Box>
                <Typography mb={2} sx={{ fontWeight: 600 }} color={(donated / nominal) * 100 < 100 ? 'primary' : 'secondary'} > {formatter.format(donated)} / {formatter.format(nominal)}</Typography>
                {!!isAdmin ? (
                    <Button variant='contained' onClick={() => handleDonasi(hrefDonasi)} >Kelola Donasi</Button>
                ) : (
                    <Button variant='contained' color={(donated / nominal) * 100 < 100 ? 'primary' : 'secondary'} onClick={() => handleDonasi(hrefDonasi)} >Donasi</Button>
                )}
            </Container>
        </>
    )
}
