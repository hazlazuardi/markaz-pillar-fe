import React, { useState, useEffect } from 'react'
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import Dropzone from "../../../../component/modules/Dropzone";
import { useRouter } from 'next/router'
import { axiosFormData } from "../../../../axiosInstances";
import { useAppContext } from "../../../../context/AppContext";
import { dispatchTypes, enumRoutes } from "../../../../context/AppReducer";
import ArrowBack from '../../../../component/modules/ArrowBack';

export default function RegisterVolunteer() {
    const { dispatch } = useAppContext();
    const router = useRouter();
    const { kegiatan_id } = router.query

    const [volunteer, setVolunteer] = useState({
        name: "",
        ktp: "",
        phoneNum: "",
        address: "",
        email: "",
    });

    const [programId, setProgramId] = useState("")

    const [profPic, setProfPic] = useState({});
    const [essay, setEssay] = useState({});
    const [cv, setCV] = useState({});

    const handleChangeVolunteer = ({ target }) => {
        const { name, value } = target;
        setVolunteer((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrorMessage((prev => ({
            ...prev,
            [name]: ""
        })))
    };

    const [errorMessage, setErrorMessage] = useState({
        name: "",
        ktp: "",
        phoneNum: "",
        address: "",
        email: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData();
        const detailBlob = new Blob([JSON.stringify(volunteer)], {
            type: "application/json",
        });
        data.append("picture", profPic);
        data.append("essay", essay);
        data.append("cv", cv);
        data.append("detail", detailBlob);

        await axiosFormData
            .post(`volunteer/registration?program_id=${kegiatan_id}`, data)
            .then(() => {

                dispatch({
                    type: dispatchTypes.SNACKBAR_CUSTOM,
                    payload: {
                        severity: 'success',
                        message: "Data Uploaded"
                    }
                })

                // Redirection here
                router.push(`${enumRoutes.MEMBER_KEGIATAN}/${kegiatan_id}`)
            })
            .catch(error => {
                // Check & Handle if error.response is defined
                if (!!error.response) {
                    if (error.response.status === 400) {
                        // Check & Handle if bad request (empty fields, etc)
                        dispatch({
                            type: dispatchTypes.SNACKBAR_CUSTOM,
                            payload: {
                                severity: 'error',
                                message: 'Please fill out the form'
                            }
                        });
                        if (!!error.response.data.message && error.response.data.message.includes("picture")) {
                            dispatch({
                                type: dispatchTypes.SNACKBAR_CUSTOM,
                                payload: {
                                    severity: 'error',
                                    message: 'Please upload the profile picture'
                                }
                            });
                        }
                        else if (!!error.response.data.message && error.response.data.message.includes("essay")) {
                            dispatch({
                                type: dispatchTypes.SNACKBAR_CUSTOM,
                                payload: {
                                    severity: 'error',
                                    message: 'Please upload the essay'
                                }
                            });
                        }
                        else if (!!error.response.data.message && error.response.data.message.includes("cv")) {
                            dispatch({
                                type: dispatchTypes.SNACKBAR_CUSTOM,
                                payload: {
                                    severity: 'error',
                                    message: 'Please upload the Curriculum Vitae'
                                }
                            });
                        }
                        setErrorMessage(prev => ({
                            ...prev,
                            ...error.response.data.result
                        }))
                    }             
                    else if (error.response.status === 413) {
                        // Check & Handle if image file is too large (> 1MB)
                        dispatch({
                            type: dispatchTypes.SNACKBAR_CUSTOM,
                            payload: {
                                severity: 'error',
                                message: 'One of the files is too large, PDF <= 10MB & Images <= 1MB'
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
    }
    return (
        <div>
            <ArrowBack href={enumRoutes.MEMBER_KEGIATAN} />
            <Container>
                <form style={{ marginTop: "5%" }} onSubmit={handleSubmit}>
                    <Grid
                        container
                        direction="column"
                        justifyContent="space-between"
                        alignItems="stretch"
                        spacing={5}
                    >
                        <Grid item>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h5" color="initial">Profile Picture</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Dropzone
                                        name="profPic"
                                        setFile={setProfPic}
                                        accept='image/*'
                                        fileSize={1048576}
                                    />
                                </Grid>
                                {profPic.name &&
                                    <Grid item xs={12}>
                                        <Typography data-testid='dropzone-uploaded' variant="body1" color="initial">Uploaded: {profPic.name}</Typography>
                                    </Grid>
                                }
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h5" color="initial">Essay (PDF)</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Dropzone
                                        name="essay"
                                        setFile={setEssay}
                                        accept={"application/pdf"}
                                        fileSize={10485760}
                                    />
                                </Grid>
                                {essay.name &&
                                    <Grid item xs={12}>
                                        <Typography data-testid='dropzone-uploaded' variant="body1" color="initial">Uploaded: {essay.name}</Typography>
                                    </Grid>
                                }
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h5" color="initial">Curriculum Vitae (PDF)</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Dropzone
                                        name="cv"
                                        setFile={setCV}
                                        accept={"application/pdf"}
                                        fileSize={10485760}
                                    />
                                </Grid>
                                {cv.name &&
                                    <Grid item xs={12}>
                                        <Typography data-testid='dropzone-uploaded' variant="body1" color="initial">Uploaded: {cv.name}</Typography>
                                    </Grid>
                                }
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h5" color="initial">Add Volunteer Information</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        data-testid='volunteer-name-at-volunteer-register-page'
                                        name="name"
                                        label="Nama Volunteer"
                                        value={volunteer.name}
                                        onChange={handleChangeVolunteer}
                                        error={!!errorMessage.name}
                                        helperText={!!errorMessage.name && `Harap isi nama volunteer.`}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        data-testid='volunteer-ktp-at-volunteer-register-page'
                                        name="ktp"
                                        label="No. KTP"
                                        value={volunteer.ktp}
                                        onChange={handleChangeVolunteer}
                                        error={!!errorMessage.ktp}
                                        helperText={!!errorMessage.ktp && `Harap isi No. KTP dengan benar.`}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        data-testid='volunteer-phoneNum-at-volunteer-register-page'
                                        name="phoneNum"
                                        label="No. Telp/HP"
                                        value={volunteer.phoneNum}
                                        onChange={handleChangeVolunteer}
                                        error={!!errorMessage.phoneNum}
                                        helperText={!!errorMessage.phoneNum && `Harap isi No. Telp/HP dengan benar.`}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        data-testid='volunteer-email-at-volunteer-register-page'
                                        name="email"
                                        label="Email"
                                        value={volunteer.email}
                                        onChange={handleChangeVolunteer}
                                        error={!!errorMessage.email}
                                        helperText={!!errorMessage.email && `Harap isi email dengan benar.`}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        data-testid='volunteer-address-at-volunteer-register-page'
                                        name="address"
                                        label="Alamat"
                                        value={volunteer.address}
                                        onChange={handleChangeVolunteer}
                                        error={!!errorMessage.address}
                                        helperText={!!errorMessage.address && `Harap isi alamat dengan benar.`}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        data-testid='santri-submit-button-at-AdminCreateOrEditSantri-module'
                                        type="submit" variant="contained" color="primary" fullWidth>
                                        Simpan
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Container>

        </div>
    )
}
