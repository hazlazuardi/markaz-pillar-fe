import React from 'react'
import Button from '@mui/material/Button'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useAppContext } from '../context/AppContext'
import { dispatchTypes } from '../context/AppReducer'

export default function Profile() {
    const { dispatch } = useAppContext();
    const router = useRouter();
    const handleLogout = () => {
        localStorage.clear();
        dispatch({
            type: dispatchTypes.LOGOUT
        })
        router.push("/login")
    }

    return (
        <div>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}
            >

                <Grid item xs={3}>
                    <Button onClick={handleLogout} variant="contained" color="primary">
                        Logout
                    </Button>
                </Grid>

            </Grid>
        </div>
    )
}

