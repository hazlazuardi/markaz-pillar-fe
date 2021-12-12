import React, { useRef, useState } from 'react';
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router';
import Dropzone from "../../modules/Dropzone";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAppContext } from "../../../context/AppContext";
import { dispatchTypes } from "../../../context/AppReducer";

function AdminCreateOrEditProgres(props) {
    const {
        progres,
        setProgres,
        createOrEdit,
        markazOrSantri,
        apiCall,
        redirectID
    } = props;

    const isCreate = createOrEdit === 'create'
    const form = useRef(null);
    const { dispatch } = useAppContext();
    const [loading, setLoading] = useState(false)
    const [thumbnail, setThumbnail] = useState({});

    const handleChangeProgres = ({ target }) => {
        const { name, value } = target;
        setProgres((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrorMessage((prev => ({
            ...prev,
            [name]: ""
        })))
    };

    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        const data = new FormData();
        const progresBlob = new Blob([JSON.stringify(progres)], {
            type: "application/json",
        });
        data.append("thumbnail", thumbnail);
        data.append("detail", progresBlob);

        await apiCall(data)
            .then(response => {
                setLoading(false)

                dispatch({
                    type: dispatchTypes.SNACKBAR_CUSTOM,
                    payload: {
                        severity: 'success',
                        message: createOrEdit === 'create' ? "Progres Donasi Created" : "Progres Donasi Edited"
                    }
                })
                router.push(`/admin/${markazOrSantri}/${redirectID}`)
            })
            .catch(error => {
                setLoading(false)
                // Check & Handle if error.response is undefined
                if (!!error.response && error.response.status === 400) {
                    console.log(error.response.data)
                    if (!!error.response.data.message && error.response.data.message.includes("thumbnail")) {
                        dispatch({
                            type: dispatchTypes.SNACKBAR_CUSTOM,
                            payload: {
                                severity: 'error',
                                message: 'Please insert the thumbnail'
                            }
                        });
                    }
                    setErrorMessage(prev => ({
                        ...prev,
                        ...error.response.data.result
                    }))
                }
            })
    }

    const [errorMessage, setErrorMessage] = useState({
        progressDate: "",
        description: ""
    })
    console.log(errorMessage)

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
                                    <Typography sx={{ textTransform: "capitalize" }} variant="h5" color="initial">{createOrEdit} Progres Donasi {markazOrSantri}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id='progresNameAtComponentAdminCreateOrEditProgres'
                                        name="progressDate"
                                        label="Tanggal"
                                        fullWidth
                                        type="date"
                                        onChange={handleChangeProgres}
                                        value={progres.progressDate}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        required={isCreate}
                                        error={!!errorMessage.progressDate}
                                        helperText={!!errorMessage.progressDate && "Harap masukkan tanggal yang benar."}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id='progresDescriptionAtComponentAdminCreateOrEditProgres'
                                        name="description"
                                        label="Deskripsi"
                                        fullWidth
                                        value={progres.description}
                                        onChange={handleChangeProgres}
                                        error={!!errorMessage.description}
                                        required={isCreate}
                                        helperText={!!errorMessage.description && "Harap masukkan deskripsi."}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <LoadingButton
                                        id='progresSubmitAtComponentAdminCreateOrEditProgres'
                                        fullWidth
                                        type='submit'
                                        loading={loading}
                                        loadingIndicator="Menyimpan..."
                                        variant="contained"
                                        disabled={isCreate && !(
                                            !!thumbnail.name &&
                                            !!progres.progressDate &&
                                            !!progres.description
                                        )}>
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

export default AdminCreateOrEditProgres;
