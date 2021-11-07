import React, { useState } from 'react'
import AdminOrUserTemplate from '../../../component/templates/admin/AdminOrUserTemplate'
import Typography from '@mui/material/Typography';
import useSWR from "swr";
import { axiosMain } from '../../../axiosInstances';

const fetcher = url => axiosMain.get(url).then(res => res.data)
export default function AdminUsers() {
    const [page, setPage] = useState(1);
    const [entries, setEntries] = useState(10);
    const { data: responsePengguna, error, mutate } = useSWR(`/admin/user?page=${page - 1}&n=${entries}`, fetcher)

    console.log(responsePengguna)

    return (
        <>
            <AdminOrUserTemplate
                variant='pengguna'
                data={responsePengguna}
                page={page}
                setPage={setPage}
                entries={entries}
                setEntries={setEntries}

            >
                <Typography variant="body1" color="initial">
                    List of Users
                </Typography>
                {!!responsePengguna && responsePengguna.result.map((pengguna) =>
                (<Typography key={pengguna.id} variant="body1" color="initial">
                    — {pengguna.fullName}
                </Typography>)
                )}
            </AdminOrUserTemplate>
        </>
    )
}
