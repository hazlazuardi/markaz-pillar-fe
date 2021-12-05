import { Button } from '@mui/material'
import React from 'react'
import Cookies from 'universal-cookie';
import { axiosMain } from '../../axiosInstances';
import { useRouter } from 'next/router'


export default function OAuthButton(props) {
    const frontendURL = 'http://localhost:3000/';
    const cookies = new Cookies();
    const router = useRouter();

    const handleOAuth = async (event) => {
        cookies.remove('state')
        await axiosMain
            .post("/oauth/state")
            .then(response => {
                cookies.set('state', response.data.result.state);
                router.replace(`https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?redirect_uri=${frontendURL}oauth/google/callback&prompt=consent&response_type=code&client_id=620820262877-85f9anugmu77f59ibtu3qfbf2nmat00j.apps.googleusercontent.com&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20openid&access_type=offline&flowName=GeneralOAuthFlow&state=${response.data.result.state}`)
            })
    }
    return (
        <>
            <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleOAuth}
            >
                {props.text}
            </Button>

        </>
    )
}
