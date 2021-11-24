import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router'
import { axiosMain } from "../../../axiosInstances";
import Cookies from 'universal-cookie';
import { useAppContext } from '../../../context/AppContext';
import { dispatchTypes } from '../../../context/AppReducer';
import jwtDecode from 'jwt-decode';

const Callback = () => {
    const router = useRouter()
    const cookies = useMemo(() => new Cookies(), []);
    const { dispatch } = useAppContext();

    useEffect(() => {
        if (router.isReady) {
            axiosMain.post(`/oauth/token?state=${cookies.get("state")}`, {
                code: router.query.code
            }).then(response => {
                if (response.data.result.token == null) {
                    cookies.remove('fullName')
                    cookies.remove('email')
                    cookies.remove('state')
                    cookies.set('fullName', `${response.data.result.credential.name}`)
                    cookies.set('email', `${response.data.result.credential.email}`)
                    router.replace("/googleRegister")
                } else {
                    const decodedJWT = jwtDecode(response.data.result.token.accessToken)
                    dispatch({
                        type: dispatchTypes.REGISTRATION_SUCCEED,
                        payload: {
                            currentUser: decodedJWT.sub,
                            currentUserRole: decodedJWT.role,
                            currentAccessToken: response.data.result.token.accessToken,
                            currentRefreshToken: response.data.result.token.refreshToken
                        }
                    });
                    router.replace("/")
                }
            })
        }
    }, [cookies, dispatch, router])

    return (
        <div>
            Loading
        </div>
    );
}

export default Callback;
