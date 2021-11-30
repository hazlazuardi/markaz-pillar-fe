import React, {useCallback, useRef, useState} from 'react';
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router';
import Dropzone from "../../modules/Dropzone";
import LoadingButton from "@mui/lab/LoadingButton";
import {useAppContext} from "../../../context/AppContext";
import {dispatchTypes} from "../../../context/AppReducer";

function AdminCreateOrEditTestimoni(props) {
    const {
        testi,
        createOrEdit,
        setTesti,
        apiCall
    } = props;

    const form = useRef(null);
    const { dispatch } = useAppContext();
    const [loading, setLoading] = useState(false)
    const [thumbnail, setThumbnail] = useState({});

    const handleChangeTestimoni = ({ target }) => {
        const { name, value } = target;
        setTesti((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = useCallback(async (event) => {
        setLoading(true)
        event.preventDefault();
        const data = new FormData();
        const testimoniBlob = new Blob([JSON.stringify(testi)], {
            type: "application/json",
        });
        data.append("thumbnail", thumbnail);
        data.append("detail", testimoniBlob);

        await apiCall(data)
            .then(response => {
                setLoading(false)

                dispatch({
                    type: dispatchTypes.SNACKBAR_CUSTOM,
                    payload: {
                        severity: 'success',
                        message: createOrEdit === 'create' ? "Testimoni Created" : "Testimoni Edited"
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

    }, [apiCall, dispatch, testi, thumbnail, createOrEdit])

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
                                        fileSize={1048576}
                                    />
                                </Grid>
                                {thumbnail.name &&
                                <Grid item xs={12}>
                                    <Typography id='dropzone-uploaded' variant="body1" color="initial">Uploaded: {thumbnail.name}</Typography>
                                </Grid>
                                }
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography sx={{textTransform: "capitalize"}} variant="h5" color="initial">{createOrEdit} Volunteer Testimoni</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id='testimoniNameAtComponentAdminCreateOrEditTestimoni'
                                        name="name"
                                        label="Nama"
                                        fullWidth
                                        onChange={handleChangeTestimoni}
                                        value={testi.name}
                                        placeholder="Muhammad Adam"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id='testimoniDescriptionAtComponentAdminCreateOrEditTestimoni'
                                        name="description"
                                        label="Dekripsi"
                                        fullWidth
                                        value={testi.description}
                                        onChange={handleChangeTestimoni}
                                        placeholder="Saya sangat menyukai kegiatan ini"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <LoadingButton id='testimoniSubmitAtComponentAdminCreateOrEditTestimon' fullWidth type='submit' loading={loading} loadingIndicator="Menyimpan..." variant="contained">
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

export default AdminCreateOrEditTestimoni
