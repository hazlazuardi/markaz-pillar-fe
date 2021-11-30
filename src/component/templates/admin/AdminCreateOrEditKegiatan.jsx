import React, { useCallback, useRef, useState } from 'react';
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router';
import Dropzone from "../../modules/Dropzone";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAppContext } from "../../../context/AppContext";
import { dispatchTypes } from "../../../context/AppReducer";

function AdminCreateOrEditKegiatan(props) {
    const {
        variant,
        kegiatan,
        setKegiatan,
        apiCall
    } = props;
    const form = useRef(null);
    const { dispatch } = useAppContext();
    const [loading, setLoading] = useState(false)
    const [thumbnail, setThumbnail] = useState({});

    const handleChangeKegiatan = ({ target }) => {
        const { name, value } = target;
        setKegiatan((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = useCallback(async (event) => {
        setLoading(true)
        event.preventDefault();
        const data = new FormData();
        const kegiatanBlob = new Blob([JSON.stringify(kegiatan)], {
            type: "application/json",
        });
        data.append("thumbnail", thumbnail);
        data.append("detail", kegiatanBlob);



        await apiCall(data)
            .then(response => {
                setLoading(false)

                dispatch({
                    type: dispatchTypes.SNACKBAR_CUSTOM,
                    payload: {
                        severity: 'success',
                        message: variant === 'create' ? "Kegiatan Created" : "Kegiatan Edited"
                    }
                })

            })
            .catch(error => {
                setLoading(false)
                // Check & Handle if error.response is undefined
                if (!!error.response && error.response.status === 400) {
                    dispatch({
                        type: dispatchTypes.SNACKBAR_CUSTOM,
                        payload: {
                            severity: 'error',
                            message: 'Incorrect information'
                        }
                    });
                }
            })

    }, [apiCall, dispatch, kegiatan, thumbnail, variant])

    const router = useRouter()
    const pathname = router.pathname;
    return (
        <div>
            <Container>
                <form ref={form} onSubmit={handleSubmit} style={{ marginTop: "5%" }}>
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
                                    <Typography variant="h5" color="initial">{pathname.includes('create') ? 'Upload New Thumbnail' : 'Edit Thumbnail'}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Dropzone
                                        name="thumbnail"
                                        setFile={setThumbnail}
                                        accept={"image/*"}
                                    />
                                </Grid>
                                {thumbnail.name &&
                                    <Grid item xs={12}>
                                        <Typography data-testid='dropzone-uploaded' id='dropzone-uploaded' variant="body1" color="initial">Uploaded: {thumbnail.name}</Typography>
                                    </Grid>
                                }
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h5" color="initial">{variant} Kegiatan</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id='kegiatanNameAtComponentAdminCreateOrEditKegiatan'
                                        data-testid='kegiatan-name-at-AdminCreateOrEditKegiatan-module'
                                        name="name"
                                        label="Name"
                                        fullWidth
                                        onChange={handleChangeKegiatan}
                                        value={kegiatan.name}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id='kegiatanDescriptionAtComponentAdminCreateOrEditKegiatan'
                                        data-testid='kegiatan-description-at-AdminCreateOrEditKegiatan-module'
                                        name="description"
                                        label="Descripton"
                                        fullWidth
                                        value={kegiatan.description}
                                        onChange={handleChangeKegiatan}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id='kegiatanNameAtComponentAdminCreateOrEditKegiatan'
                                        data-testid='kegiatan-term-at-AdminCreateOrEditKegiatan-module'
                                        name="term"
                                        label="Term"
                                        fullWidth
                                        onChange={handleChangeKegiatan}
                                        value={kegiatan.term}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id='kegiatanBenefitAtComponentAdminCreateOrEditKegiatan'
                                        data-testid='kegiatan-benefit-at-AdminCreateOrEditKegiatan-module'
                                        name="benefit"
                                        label="Benefit"
                                        fullWidth
                                        value={kegiatan.benefit}
                                        onChange={handleChangeKegiatan}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id='kegiatanVolunteerNeededAtComponentAdminCreateOrEditKegiatan'
                                        data-testid='kegiatan-volunteerNeeded-at-AdminCreateOrEditKegiatan-module'
                                        name="volunteerNeeded"
                                        label="Volunteer Needed"
                                        fullWidth
                                        onChange={handleChangeKegiatan}
                                        value={kegiatan.volunteerNeeded}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id='kegiatanDescriptionAtComponentAdminCreateOrEditKegiatan'
                                        data-testid='kegiatan-location-at-AdminCreateOrEditKegiatan-module'
                                        name="location"
                                        label="Location"
                                        fullWidth
                                        value={kegiatan.location}
                                        onChange={handleChangeKegiatan}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id='kegiatanNameAtComponentAdminCreateOrEditKegiatan'
                                        data-testid='kegiatan-schedule-at-AdminCreateOrEditKegiatan-module'
                                        name="schedule"
                                        label="Schedule"
                                        fullWidth
                                        onChange={handleChangeKegiatan}
                                        value={kegiatan.schedule}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <LoadingButton
                                        data-testid='kegiatan-submit-button-at-AdminCreateOrEditKegiatan-module'
                                        id='kegiatanSubmitAtComponentAdminCreateOrEditKegiatan' fullWidth type='submit' loading={loading} loadingIndicator="Menyimpan..." variant="contained">
                                        Simpan
                                    </LoadingButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </div>
    );
}

export default AdminCreateOrEditKegiatan
