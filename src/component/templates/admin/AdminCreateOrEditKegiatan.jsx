import React, { useCallback, useEffect, useRef, useState } from 'react';
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router';
import Dropzone from "../../modules/Dropzone";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAppContext } from "../../../context/AppContext";
import { dispatchTypes, enumRoutes } from "../../../context/AppReducer";
import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function AdminCreateOrEditKegiatan(props) {
    const {
        variant,
        kegiatan,
        setKegiatan,
        apiCall,
        allMarkaz,
        originalKegiatan,
        setError,
        error
    } = props;

    const isCreate = variant === 'create'
    const form = useRef(null);
    const { dispatch } = useAppContext();
    const [loading, setLoading] = useState(false)
    const [thumbnail, setThumbnail] = useState({});

    const originalKegiatanResult = !!originalKegiatan ? originalKegiatan.result : null

    const [errorMessage, setErrorMessage] = useState({
        name: "",
        background: "",
        category: "",
        address: "",
        contactName: "",
        contactInfo: "",
        benefit: ""
    })

    console.log(kegiatan)
    const [disableSubmit, setDisableSubmit] = useState(true)
    const handleChangeKegiatan = ({ target }) => {
        const { name, value } = target;
        setKegiatan((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrorMessage((prev => ({
            ...prev,
            [name]: ""
        })))
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
                router.push(`/admin/kegiatan/`)
            })
            .catch(error => {
                setLoading(false)
                console.log(error.response)
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
                    console.log(error.response.data.result)
                    setErrorMessage(prev => ({
                        ...prev,
                        ...error.response.data.result
                    }))
                }
            })

    }, [apiCall, dispatch, kegiatan, thumbnail, variant])

    // useEffect(() => {
    //     if (!isCreate || (
    //         !!kegiatan.status &&
    //         !!kegiatan.name &&
    //         !!kegiatan.description &&
    //         !!kegiatan.volunteerNeeded &&
    //         !!kegiatan.location &&
    //         !!kegiatan.schedule &&
    //         !!kegiatan.markazId
    //     )
    //     ) {
    //         console.log('false', kegiatan)
    //         setDisableSubmit(false)
    //     } else {
    //         console.log('true', kegiatan)
    //         setDisableSubmit(true)
    //     }
    // }, [isCreate, kegiatan]);


    function isDisabled() {
        if (isCreate) {
            if (kegiatan.status === 'SUDAH_DILAKSANAKAN') {
                if (!(
                    !!kegiatan.name &&
                    !!kegiatan.description &&
                    !!kegiatan.location &&
                    !!kegiatan.markazId &&
                    !!kegiatan.programCompleted
                )) {
                    return true;
                }
                return false;
            } else {
                if (!(
                    !!kegiatan.status &&
                    !!kegiatan.name &&
                    !!kegiatan.description &&
                    !!kegiatan.volunteerNeeded &&
                    !!kegiatan.location &&
                    !!kegiatan.schedule &&
                    !!kegiatan.markazId)
                ) {
                    return true;
                }
                return false;
            }
        }
        return false;
    }

    console.log(isDisabled())
    const router = useRouter()
    const pathname = router.pathname;
    return (
        <>
            {
                kegiatan.status === "SUDAH_DILAKSANAKAN" ? (
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
                                                <Typography variant="h5"
                                                    color="initial">{pathname.includes('create') ? 'Upload New Thumbnail' : 'Edit Thumbnail'}</Typography>
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
                                                    <Typography data-testid='dropzone-uploaded' id='dropzone-uploaded'
                                                        variant="body1"
                                                        color="initial">Uploaded: {thumbnail.name}</Typography>
                                                </Grid>
                                            }
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Typography sx={{ textTransform: "capitalize" }} variant="h5"
                                                    color="initial">{variant} Kegiatan</Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                {variant == "create" ? (
                                                    <FormControl fullWidth>
                                                        <InputLabel id="status-label">Status</InputLabel>
                                                        <Select
                                                            labelId="gender-label"
                                                            data-testid='kegiatan-status-at-AdminCreateOrEditKegiatan-module'
                                                            id="status-select"
                                                            name='status'
                                                            value={!!kegiatan.status || isCreate ? kegiatan.status : originalKegiatanResult.status}
                                                            label="Status"
                                                            onChange={handleChangeKegiatan}
                                                        >
                                                            <MenuItem value={"MEMBUKA_PENDAFTARAN"}>Membuka
                                                                pendaftaran</MenuItem>
                                                            <MenuItem value={"MENUTUP_PENDAFTARAN"}>Menutup
                                                                pendaftaran</MenuItem>
                                                            <MenuItem value={"SUDAH_DILAKSANAKAN"}>Sudah
                                                                diselenggarakan</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                ) : (
                                                    <TextField
                                                        labelId="gender-label"
                                                        data-testid='kegiatan-status-at-AdminCreateOrEditKegiatan-module'
                                                        id="status-select"
                                                        name='status'
                                                        value="Sudah diselenggarakan"
                                                        disabled
                                                        fullWidth
                                                        label="Status"
                                                        onChange={handleChangeKegiatan}
                                                    />
                                                )
                                                }

                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="kegiatan-label">Tempat Markaz</InputLabel>
                                                    {pathname.includes('create') ?
                                                        <Select
                                                            labelId="kegiatan-label"
                                                            data-testid='kegiatan-markaz-at-AdminCreateOrEditKegiatan-module'
                                                            id="kegiatan-select"
                                                            name='markazId'
                                                            value={kegiatan || isCreate ? kegiatan.markazId : originalKegiatanResult.markaz.id}
                                                            label="Tempat Markaz"
                                                            onChange={handleChangeKegiatan}
                                                        >
                                                            {!!allMarkaz && allMarkaz.map(markaz => (
                                                                <MenuItem key={markaz.id}
                                                                    value={markaz.id}>{markaz.name}</MenuItem>
                                                            ))}
                                                        </Select>
                                                        :
                                                        <Select
                                                            labelId="kegiatan-label"
                                                            data-testid='kegiatan-markaz-at-AdminCreateOrEditKegiatan-module'
                                                            id="kegiatan-select"
                                                            name='markazId'
                                                            value={!!kegiatan || isCreate ? kegiatan.markazId : originalKegiatanResult.markaz.id}
                                                            label="Tempat Markaz"
                                                            disabled
                                                            onChange={handleChangeKegiatan}
                                                        >
                                                            {!!allMarkaz && allMarkaz.map(markaz => (
                                                                <MenuItem key={markaz.id}
                                                                    value={markaz.id}>{markaz.name}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    }
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id='kegiatanNameAtComponentAdminCreateOrEditKegiatan'
                                                    data-testid='kegiatan-name-at-AdminCreateOrEditKegiatan-module'
                                                    name="name"
                                                    label="Nama kegiatan"
                                                    fullWidth
                                                    onChange={handleChangeKegiatan}
                                                    value={kegiatan.name}
                                                    placeholder="Bercocok tanam"
                                                    error={!!errorMessage.name}
                                                    helperText={!!errorMessage.name && "Harap isi nama kegiatan dengan benar."}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id='kegiatanDescriptionAtComponentAdminCreateOrEditKegiatan'
                                                    data-testid='kegiatan-description-at-AdminCreateOrEditKegiatan-module'
                                                    name="description"
                                                    label="Deskripsi kegiatan"
                                                    fullWidth
                                                    value={kegiatan.description}
                                                    onChange={handleChangeKegiatan}
                                                    placeholder="Kegiatan bercocok tanam di taman kota"
                                                    error={!!errorMessage.background}
                                                    helperText={!!errorMessage.background && "Harap isi background kegiatan dengan benar."}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id='kegiatanDescriptionAtComponentAdminCreateOrEditKegiatan'
                                                    data-testid='kegiatan-location-at-AdminCreateOrEditKegiatan-module'
                                                    name="location"
                                                    label="Lokasi"
                                                    fullWidth
                                                    value={kegiatan.location}
                                                    onChange={handleChangeKegiatan}
                                                    placeholder="Taman Kota"
                                                    error={!!errorMessage.location}
                                                    helperText={!!errorMessage.location && "Harap isi lokasi kegiatan dengan benar."}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id='kegiatanNameAtComponentAdminCreateOrEditKegiatan'
                                                    data-testid='kegiatan-schedule-at-AdminCreateOrEditKegiatan-module'
                                                    name="programCompleted"
                                                    label="Tanggal selesai"
                                                    fullWidth
                                                    onChange={handleChangeKegiatan}
                                                    value={kegiatan.programCompleted}
                                                    type="datetime-local"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}

                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <LoadingButton
                                                    data-testid='kegiatan-submit-button-at-AdminCreateOrEditKegiatan-module'
                                                    id='kegiatanSubmitAtComponentAdminCreateOrEditKegiatan' fullWidth
                                                    type='submit' loading={loading} loadingIndicator="Menyimpan..."
                                                    variant="contained"
                                                    disabled={isDisabled()}>
                                                    Simpan
                                                </LoadingButton>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </form>
                        </Container>
                    </div>
                ) 
                
                : 
                
                // BUKA / TUTUP
                (
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
                                                <Typography variant="h5"
                                                    color="initial">{pathname.includes('create') ? 'Upload New Thumbnail' : 'Edit Thumbnail'}</Typography>
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
                                                    <Typography data-testid='dropzone-uploaded' id='dropzone-uploaded'
                                                        variant="body1"
                                                        color="initial">Uploaded: {thumbnail.name}</Typography>
                                                </Grid>
                                            }
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Typography sx={{ textTransform: "capitalize" }} variant="h5"
                                                    color="initial">{variant} Kegiatan</Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="status-label">Status</InputLabel>
                                                    <Select
                                                        labelId="gender-label"
                                                        data-testid='kegiatan-status-at-AdminCreateOrEditKegiatan-module'
                                                        id="status-select"
                                                        name='status'
                                                        value={!!kegiatan.status || isCreate ? kegiatan.status : originalKegiatanResult.status}
                                                        label="Status"
                                                        onChange={handleChangeKegiatan}
                                                    >
                                                        <MenuItem value={"MEMBUKA_PENDAFTARAN"}>Membuka
                                                            pendaftaran</MenuItem>
                                                        <MenuItem value={"MENUTUP_PENDAFTARAN"}>Menutup
                                                            pendaftaran</MenuItem>
                                                        <MenuItem value={"SUDAH_DILAKSANAKAN"}>Sudah
                                                            diselenggarakan</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="kegiatan-label">Tempat Markaz</InputLabel>
                                                    <Select
                                                        labelId="kegiatan-label"
                                                        data-testid='kegiatan-markaz-at-AdminCreateOrEditKegiatan-module'
                                                        id="kegiatan-select"
                                                        name='markazId'
                                                        value={kegiatan.markazId}
                                                        label="Tempat Markaz"
                                                        onChange={handleChangeKegiatan}
                                                    >
                                                        {!!allMarkaz && allMarkaz.map(markaz => (
                                                            <MenuItem key={markaz.id}
                                                                value={markaz.id}>{markaz.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id='kegiatanNameAtComponentAdminCreateOrEditKegiatan'
                                                    data-testid='kegiatan-name-at-AdminCreateOrEditKegiatan-module'
                                                    name="name"
                                                    label="Nama kegiatan"
                                                    fullWidth
                                                    onChange={handleChangeKegiatan}
                                                    value={kegiatan.name}
                                                    placeholder="Bercocok tanam"
                                                    error={!!errorMessage.name}
                                                    helperText={!!errorMessage.name && "Harap isi nama kegiatan dengan benar."}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id='kegiatanOpenAtComponentAdminCreateOrEditKegiatan'
                                                    name="programOpened"
                                                    label="Tanggal buka pendaftaran"
                                                    fullWidth
                                                    onChange={handleChangeKegiatan}
                                                    value={kegiatan.programOpened}
                                                    type="datetime-local"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    error={!!errorMessage.programOpened}
                                                    helperText={!!errorMessage.programOpened && "Harap isi tanggal buka kegiatan dengan benar."}

                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id='kegiatanCloseAtComponentAdminCreateOrEditKegiatan'
                                                    name="programClosed"
                                                    label="Tanggal tutup pendaftaran"
                                                    fullWidth
                                                    onChange={handleChangeKegiatan}
                                                    value={kegiatan.programClosed}
                                                    type="datetime-local"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    error={!!errorMessage.programClosed}
                                                    helperText={!!errorMessage.programClosed && "Harap isi tanggal tutup kegiatan dengan benar."}

                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id='kegiatanDescriptionAtComponentAdminCreateOrEditKegiatan'
                                                    data-testid='kegiatan-description-at-AdminCreateOrEditKegiatan-module'
                                                    name="description"
                                                    label="Deskripsi kegiatan"
                                                    fullWidth
                                                    value={kegiatan.description}
                                                    onChange={handleChangeKegiatan}
                                                    placeholder="Kegiatan bercocok tanam di taman kota"
                                                    error={!!errorMessage.description}
                                                    helperText={!!errorMessage.description && "Harap isi deskripsi kegiatan dengan benar."}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id='kegiatanNameAtComponentAdminCreateOrEditKegiatan'
                                                    data-testid='kegiatan-term-at-AdminCreateOrEditKegiatan-module'
                                                    name="term"
                                                    label="Syarat"
                                                    fullWidth
                                                    onChange={handleChangeKegiatan}
                                                    value={kegiatan.term}
                                                    placeholder="Lulus SLTA/sederajat"
                                                    error={!!errorMessage.term}
                                                    helperText={!!errorMessage.term && "Harap isi syarat kegiatan dengan benar."}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id='kegiatanBenefitAtComponentAdminCreateOrEditKegiatan'
                                                    data-testid='kegiatan-benefit-at-AdminCreateOrEditKegiatan-module'
                                                    name="benefit"
                                                    label="Manfaat"
                                                    fullWidth
                                                    value={kegiatan.benefit}
                                                    onChange={handleChangeKegiatan}
                                                    placeholder="Go green"
                                                    error={!!errorMessage.benefit}
                                                    helperText={!!errorMessage.benefit && "Harap isi manfaat kegiatan dengan benar."}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id='kegiatanVolunteerNeededAtComponentAdminCreateOrEditKegiatan'
                                                    data-testid='kegiatan-volunteerNeeded-at-AdminCreateOrEditKegiatan-module'
                                                    name="volunteerNeeded"
                                                    label="Jumlah volunteer dibutuhkan"
                                                    fullWidth
                                                    onChange={handleChangeKegiatan}
                                                    value={kegiatan.volunteerNeeded}
                                                    placeholder="5"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id='kegiatanDescriptionAtComponentAdminCreateOrEditKegiatan'
                                                    data-testid='kegiatan-location-at-AdminCreateOrEditKegiatan-module'
                                                    name="location"
                                                    label="Lokasi"
                                                    fullWidth
                                                    value={kegiatan.location}
                                                    onChange={handleChangeKegiatan}
                                                    placeholder="Taman Kota"
                                                    error={!!errorMessage.location}
                                                    helperText={!!errorMessage.location && "Harap isi lokasi kegiatan dengan benar."}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id='kegiatanNameAtComponentAdminCreateOrEditKegiatan'
                                                    data-testid='kegiatan-schedule-at-AdminCreateOrEditKegiatan-module'
                                                    name="schedule"
                                                    label="Jadwal"
                                                    fullWidth
                                                    onChange={handleChangeKegiatan}
                                                    value={kegiatan.schedule}
                                                    type="datetime-local"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <LoadingButton
                                                    data-testid='kegiatan-submit-button-at-AdminCreateOrEditKegiatan-module'
                                                    id='kegiatanSubmitAtComponentAdminCreateOrEditKegiatan' fullWidth
                                                    type='submit' loading={loading} loadingIndicator="Menyimpan..."
                                                    variant="contained"
                                                    disabled={isDisabled()}>
                                                    Simpan
                                                </LoadingButton>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </form>
                        </Container>
                    </div>
                )
            }
        </>
    );
}

export default AdminCreateOrEditKegiatan
