import React from 'react'
import useSWR from 'swr'
import { axiosMain } from '../axiosInstances';


const fetcher = (url) => axiosMain.get(url).then((res) => res.data);
export default function Profile() {

    const { data: responseActivity, error, mutate } = useSWR(`/user/activity`, fetcher)

    
    
    return (
        <>
            Hello
        </>
    )
}
