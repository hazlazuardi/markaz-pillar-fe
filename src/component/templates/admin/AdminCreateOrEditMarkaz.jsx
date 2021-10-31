import React from 'react'
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Dropzone from '../../modules/Dropzone';
import Typography from '@mui/material/Typography'
import { FormControl } from "@mui/material";
import { Select } from "@mui/material";
import { InputLabel } from "@mui/material";
import { MenuItem } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton'
import { useRouter } from 'next/router';

function AdminCreateOrEditMarkaz(props) {
    const {
        form,
        loading,
        handleSubmit,
        setThumbnail,
        thumbnail,
        markaz,
        handleChangeMarkaz,

    } = props;

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
                                    <Typography variant="h5" color="initial">{pathname.includes('create') ? 'Create New Markaz' : `Edit ${markaz.name} Information`}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id='markazNameAtComponentAdminCreateOrEditMarkaz'
                                        name="name"
                                        label="Markaz Name"
                                        fullWidth
                                        onChange={handleChangeMarkaz}
                                        value={markaz.name}

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                    id='markazBackgroundAtComponentAdminCreateOrEditMarkaz'
                                        name="background"
                                        label="Background"
                                        fullWidth
                                        value={markaz.background}
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
                                            value={markaz.category}
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
                                        value={markaz.address}

                                    />
                                </Grid>
                                <Grid item xs={12}>
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
