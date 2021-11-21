import React, { useState, useEffect } from 'react'
import DonationForm from '../../../component/templates/form/DonationForm'
import { useRouter } from 'next/router'
import { axiosFormData } from "../../../axiosInstances";
import { useAppContext } from "../../../context/AppContext";
import { dispatchTypes } from "../../../context/AppReducer";
import useSWR from "swr";
import Typography from "@mui/material/Typography";

const fetcher = url => axiosMain.get(url).then(res => res.data)

export default function DonasiSantri() {
    const { dispatch} = useAppContext();
    const router = useRouter()
    const [image, setImage] = useState();
    const [details, setDetails] = useState({
        amount: 0,
        santri: null,
    });
    const [open, setOpen] = useState(false);

    const { data: responseSantri, error } = useSWR(router.isReady ? `/santri?id=${router.query.id}` : null, fetcher)

    const handleError = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleChangeDetails = ({ target }) => {
        const { name, value } = target;
        setDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const [loading, setLoading] = useState(false);
    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        const data = new FormData();
        const detailBlob = new Blob([JSON.stringify(details)], {
            type: "application/json",
        });
        data.append("payment", image);
        data.append("detail", detailBlob);

        await axiosFormData
            .post("/transaction", data)
            .then(response => {
                setLoading(false)

                dispatch({
                    type: dispatchTypes.SNACKBAR_CUSTOM,
                    payload: {
                        severity: 'success',
                        message: "Data Uploaded"
                    }
                })

                router.replace(`/santri/${details.santri}`)
            })
            .catch(error => {
                setLoading(false)

                // Check & Handle if error.response is defined
                if (!!error.response) {
                    if (error.response.status === 400) {
                        // Check & Handle if bad request (empty fields, etc)
                        dispatch({
                            type: dispatchTypes.SNACKBAR_CUSTOM,
                            payload: {
                                severity: 'error',
                                message: 'Upload Failed'
                            }
                        });
                    } else if (error.response.status === 413) {
                        // Check & Handle if image file is too large (> 1MB)
                        dispatch({
                            type: dispatchTypes.SNACKBAR_CUSTOM,
                            payload: {
                                severity: 'error',
                                message: 'The image size is too large'
                            }
                        });
                    } else {
                        // Check & Handle if other error code
                        dispatch({
                            type: dispatchTypes.SERVER_ERROR
                        });
                    }
                } else {
                    // Check & Handle if error.response is undefined
                    dispatch({
                        type: dispatchTypes.SERVER_ERROR
                    });
                }
            })
    };

    useEffect(() => {
        setDetails((prev) => ({
            ...prev,
            santri : router.query.id
        }))   
    }, [responseSantri, router.query.id])

    
    if(responseSantri != null) {
        const {name} = responseSantri.result
        return (
            <DonationForm 
            markazOrSantri={"santri"} 
            recipient={name} 
            setImage = {setImage}
            image = {!!image && image}
            handleChangeDetails = {handleChangeDetails}
            details = {details}
            handleClose = {handleClose}
            open = {open}
            setOpen = {setOpen}
            handleError = {handleError}
            handleSubmit = {handleSubmit}
            setDetails = {setDetails}
            router = {router}
            />
        )
    } else {
        return (
            <Typography>Loading...</Typography>
        )
    }
}
