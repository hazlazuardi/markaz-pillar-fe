import React from 'react';
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router';
import Dropzone from "../../modules/Dropzone";
import LoadingButton from "@mui/lab/LoadingButton";

function AdminCreateOrEditProgres(props) {
    const {
        form,
        handleSubmit,
        thumbnail,
        setThumbnail,
        loading,
        createOrEdit,
        progres,
        handleChangeProgres,
        markazOrSantri
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
                                        accept={"image/*"} />
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
                                    <Typography variant="h5" color="initial">{createOrEdit} Progres Donasi {markazOrSantri}</Typography>
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

export default AdminCreateOrEditProgres;
