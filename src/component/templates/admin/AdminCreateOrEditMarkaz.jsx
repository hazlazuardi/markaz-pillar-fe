import React, { useRef, useState } from 'react'
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Dropzone from '../../modules/Dropzone';
import Typography from '@mui/material/Typography'
import { FormControl } from "@mui/material";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import LoadingButton from '@mui/lab/LoadingButton'
import { useRouter } from 'next/router';
import { useAppContext } from "../../../context/AppContext";
import { dispatchTypes, enumRoutes } from "../../../context/AppReducer";


function AdminCreateOrEditMarkaz(props) {
    const {
        variant,
        data,
        markaz,
        setMarkaz,
        apiCall,
    } = props;

    const result = !!data ? data.result : null

    const { dispatch } = useAppContext();
    const [thumbnail, setThumbnail] = useState({});
    const form = useRef(null);
    const router = useRouter()
    const pathname = router.pathname;


    const handleChangeMarkaz = ({ target }) => {
        const { name, value } = target;
        setMarkaz((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const [loading, setLoading] = useState(false)
    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        const formData = new FormData();
        const markazBlob = new Blob([JSON.stringify(markaz)], {
            type: "application/json",
        });
        formData.append("thumbnail", thumbnail);
        formData.append("markaz", markazBlob);


        await apiCall(formData)
            .then(response => {
                setLoading(false)

                dispatch({
                    type: dispatchTypes.SNACKBAR_CUSTOM,
                    payload: {
                        severity: 'success',
                        message: variant === 'create' ? "Markaz Created" : "Markaz Edited"
                    }
                })
                router.push(enumRoutes.ADMIN_MARKAZ)
            })
            .catch(error => {
                setLoading(false)
                if (!!error.response && error.response.status === 400) {

                    // Check & Handle if bad request (empty fields, etc)
                    dispatch({
                        type: dispatchTypes.SNACKBAR_CUSTOM,
                        payload: {
                            severity: 'error',
                            message: 'Incorrect information'
                        }
                    });
                }
            })
    };

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
                                    <Typography variant="h5" color="initial">{pathname.includes('create') ? 'Create New Markaz' : `Edit ${markaz.name} Information`}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id='markazNameAtComponentAdminCreateOrEditMarkaz'
                                        name="name"
                                        label="Markaz Name"
                                        fullWidth
                                        onChange={handleChangeMarkaz}
                                        value={markaz ? markaz.name : result.name}

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id='markazBackgroundAtComponentAdminCreateOrEditMarkaz'
                                        name="background"
                                        label="Background"
                                        fullWidth
                                        value={markaz ? markaz.background : result.background}
                                        onChange={handleChangeMarkaz}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="category-label">Kategori</InputLabel>
                                        <Select
                                            labelId="category-label"
                                            id="category-select"
                                            name='category'
                                            defaultValue={markaz.category}
                                            value={markaz ? markaz.category : result.category}
                                            label="Kategori"
                                            onChange={handleChangeMarkaz}
                                        >
                                            <MenuItem value={"MARKAZ_UMUM"}>Markaz Umum</MenuItem>
                                            <MenuItem value={"MARKAZ_IKHWAN"}>Markaz Ikhwan</MenuItem>
                                            <MenuItem value={"MARKAZ_AKHWAT"}>Markaz Akhwat</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id='markazAddressAtComponentAdminCreateOrEditMarkaz'
                                        name="address"
                                        label="Markaz Address"
                                        fullWidth
                                        onChange={handleChangeMarkaz}
                                        value={markaz ? markaz.address : result.address}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id='markazContactNameAtComponentAdminCreateOrEditMarkaz'
                                        name="contactName"
                                        label="Contact Name"
                                        fullWidth
                                        onChange={handleChangeMarkaz}
                                        value={markaz ? markaz.contactName : result.contactName}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id='markazContactInfoAtComponentAdminCreateOrEditMarkaz'
                                        name="contactInfo"
                                        label="Contact Info"
                                        fullWidth
                                        onChange={handleChangeMarkaz}
                                        value={markaz ? markaz.contactInfo : result.contactInfo}

                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <LoadingButton id='markazSubmitAtComponentAdminCreateOrEditMarkaz' fullWidth type='submit' loading={loading} loadingIndicator="Menyimpan..." variant="contained">
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

export default AdminCreateOrEditMarkaz
