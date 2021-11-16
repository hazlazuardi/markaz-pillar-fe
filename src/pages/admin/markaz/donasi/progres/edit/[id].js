import { useState, useRef } from "react";
import { useAppContext } from "../../../../../../context/AppContext";
import { dispatchTypes } from "../../../../../../context/AppReducer";
import { axiosFormData } from "../../../../../../axiosInstances";
import { useRouter } from 'next/router';
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Dropzone from '../../../../../../component/modules/Dropzone'
import Typography from '@mui/material/Typography'
import { FormControl } from "@mui/material";
import { Select } from "@mui/material";
import { InputLabel } from "@mui/material";
import { MenuItem } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton'

function AdminEditMarkazProgressDonasi(props) {
    const { dispatch } = useAppContext();
    const [thumbnail, setThumbnail] = useState({});
    const { responseMarkaz } = props
    const [editedProgres, setEditedProgres] = useState({
        progressDate: responseMarkaz.progressDate,
        description: responseMarkaz.description,
    });
    const form = useRef(null);

    const handleChangeProgres = ({ target }) => {
        const { name, value } = target;
        setEditedProgres((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        const data = new FormData();
        const progresBlob = new Blob([JSON.stringify(editedProgres)], {
            type: "application/json",
        });
        data.append("thumbnail", thumbnail);
        data.append("progres", progresBlob);

        await axiosFormData
            .post("/admin/markaz", data)
            .then(response => {
                setLoading(false)

                dispatch({
                    type: dispatchTypes.SNACKBAR_CUSTOM,
                    payload: {
                        severity: 'success',
                        message: "Progres Edited"
                    }
                })
            })
            .catch(error => {
                setLoading(false)

                // Check & Handle if error.response is undefined
                if (!!error.response) {
                    if (error.response.status === 400) {

                        dispatch({
                            type: dispatchTypes.SNACKBAR_CUSTOM,
                            payload: {
                                severity: 'error',
                                message: 'Incorrect information'
                            }
                        });
                    } else if (error.response.status === 413) {

                        dispatch({
                            type: dispatchTypes.SNACKBAR_CUSTOM,
                            payload: {
                                severity: 'error',
                                message: 'The image size is too large'
                            }
                        });
                    } else {

                        dispatch({
                            type: dispatchTypes.SERVER_ERROR
                        });
                    }
                } else {
                    dispatch({
                        type: dispatchTypes.SERVER_ERROR
                    });
                }
            })
    };

    const router = useRouter()
    const pathname = router.pathname;
    const [loading, setLoading] = useState(false)
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
                                        accept={"application/pdf"}
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
                                    <Typography variant="h5" color="initial">Edit Progres Donasi Markaz</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id='progresNameAtComponentAdminCreateOrEditProgres'
                                        name="progressDate"
                                        label="Date (YYYY-MM-DD)"
                                        fullWidth
                                        onChange={handleChangeProgres}
                                        value={progres.progressDate}

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id='progresDescriptionAtComponentAdminCreateOrEditProgres'
                                        name="description"
                                        label="Descripton"
                                        fullWidth
                                        value={progres.description}
                                        onChange={handleChangeProgres}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <LoadingButton id='progresSubmitAtComponentAdminCreateOrEditProgres' fullWidth type='submit' loading={loading} loadingIndicator="Menyimpan..." variant="contained">
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

export default AdminEditMarkazProgressDonasi;
