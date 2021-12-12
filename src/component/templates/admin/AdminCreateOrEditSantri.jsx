import { useRef, useState, useEffect } from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography'
import Dropzone from "../../../component/modules/Dropzone";
import { FormControl } from "@mui/material";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useAppContext } from "../../../context/AppContext";
import { dispatchTypes, enumRoutes } from "../../../context/AppReducer";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";


function AdminCreateOrEditSantri(props) {
    const {
        variant,
        santri_id,
        santri,
        setSantri,
        originalSantri,
        allMarkaz,
        apiCall,
    } = props;

    const isCreate = variant === 'create'
    const originalSantriResult = !!originalSantri ? originalSantri.result : null

    const { dispatch } = useAppContext();
    const form = useRef(null);

    const [disableSubmit, setDisableSubmit] = useState(true)
    const handleChangeSantri = ({ target }) => {
        const { name, value } = target;
        setSantri((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrorMessage((prev => ({
            ...prev,
            [name]: ""
        })))
    };

    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [thumbnail, setThumbnail] = useState({});
    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        const formData = buildSantriFormData(santri, thumbnail)

        await apiCall(formData)
            .then(response => {
                setLoading(false)
                dispatch({
                    type: dispatchTypes.SNACKBAR_CUSTOM,
                    payload: {
                        severity: 'success',
                        message: variant === 'create' ? "Santri Created" : "Santri Edited"
                    }
                })
                if (isCreate) {
                    router.push(`${enumRoutes.ADMIN_SANTRI}`)
                    return;
                }
                router.push(`${enumRoutes.ADMIN_SANTRI}/${santri_id}`)
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
                    console.log(error.response.data)
                    if (!!error.response.data.message && error.response.data.message.includes("exists")) {
                        dispatch({
                            type: dispatchTypes.SNACKBAR_CUSTOM,
                            payload: {
                                severity: 'error',
                                message: 'Santri dengan nama tersebut sudah ada'
                            }
                        });
                        setErrorMessage(prev => ({
                            ...prev,
                            name: 'Santri dengan nama tersebut sudah ada'
                        }))
                        // Check & Handle if bad request (empty fields, etc)
                    }
                    if (!!error.response.data.message && error.response.data.message.includes("parse")) {
                        setErrorMessage(prev => ({
                            ...prev,
                            birthDate: 'Harap masukkan tanggal lahir yang benar.'
                        }))
                        // Check & Handle if bad request (empty fields, etc)
                    }
                    setErrorMessage(prev => ({
                        ...prev,
                        ...error.response.data.result
                    }))
                }
            })
    };

    console.log(errorMessage)
    const [errorMessage, setErrorMessage] = useState({
        name: "",
        background: "",
        markaz: "",
        gender: "",
        address: "",
        birthPlace: "",
        birthDate: "",
    })

    // useEffect(() => {
    //     if (!isCreate || (
    //         !!santri.name &&
    //         !!santri.background &&
    //         (!!santri.markazId || originalSantriResult.markaz.id) &&
    //         !!santri.gender &&
    //         !!santri.address &&
    //         !!santri.birthPlace &&
    //         !!santri.birthDate
    //     )
    //     ) {
    //         console.log('false', santri)
    //         setDisableSubmit(false)
    //     } else {
    //         console.log('true', santri)
    //         setDisableSubmit(true)
    //     }
    // }, [isCreate, santri]);

    const buildSantriFormData = (santriJson, thumbnailFile) => {
        const data = new FormData();
        const santriBlob = new Blob([JSON.stringify(santriJson)], {
            type: "application/json",
        });
        data.append("thumbnail", thumbnailFile);
        data.append("santri", santriBlob);
        return data;
    }


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
                                    <Typography variant="h5" color="initial">Upload an Image</Typography>
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
                                        <Typography data-testid='dropzone-uploaded' variant="body1" color="initial">Uploaded: {thumbnail.name}</Typography>
                                    </Grid>
                                }
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h5" color="initial">Add Santri Detail</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        data-testid='santri-name-at-AdminCreateOrEditSantri-module'
                                        name="name"
                                        value={santri || isCreate ? santri.name : originalSantriResult.name}
                                        label="Nama Santri"
                                        fullWidth
                                        onChange={handleChangeSantri}
                                        required={isCreate}
                                        error={!!errorMessage.name}
                                        helperText={!!errorMessage.name && `Nama Santri ${santri.name} sudah ada.`}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        data-testid='santri-background-at-AdminCreateOrEditSantri-module'
                                        name="background"
                                        value={santri || isCreate ? santri.background : originalSantriResult.background}
                                        label="Background"
                                        fullWidth
                                        onChange={handleChangeSantri}
                                        required={isCreate}
                                        error={!!errorMessage.background}
                                        helperText={!!errorMessage.background && "Harap isi background Santri dengan benar."}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="gender-label">Jenis Kelamin</InputLabel>
                                        <Select
                                            labelId="gender-label"
                                            data-testid='santri-gender-at-AdminCreateOrEditSantri-module'
                                            id="gender-select"
                                            name='gender'
                                            value={santri.gender || isCreate ? santri.gender : originalSantriResult.gender}
                                            label="Jenis Kelamin"
                                            onChange={handleChangeSantri}
                                            required={isCreate}
                                            error={!!errorMessage.gender}
                                            helperText={!!errorMessage.gender && "Harap pilih salah satu jenis kelamin."}
                                        >
                                            <MenuItem value={"LAKI_LAKI"}>Laki-laki</MenuItem>
                                            <MenuItem value={"PEREMPUAN"}>Perempuan</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="santri-label">Tempat Markaz</InputLabel>
                                        <Select
                                            labelId="santri-label"
                                            data-testid='santri-markaz-at-AdminCreateOrEditSantri-module'
                                            id="santri-select"
                                            name='markazId'
                                            value={santri || isCreate ? santri.markazId : originalSantriResult.markaz.id}
                                            label="Tempat Markaz"
                                            onChange={handleChangeSantri}
                                            error={!!errorMessage.markaz}
                                            required={isCreate}
                                            helperText={!!errorMessage.markaz && "Harap pilih salah satu markaz."}
                                        >
                                            {!!allMarkaz && allMarkaz.map(markaz => (
                                                <MenuItem key={markaz.id} value={markaz.id}>{markaz.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        data-testid='santri-address-at-AdminCreateOrEditSantri-module'
                                        name="address"
                                        value={santri || isCreate ? santri.address : originalSantriResult.address}
                                        label="Domisili Asal"
                                        fullWidth
                                        onChange={handleChangeSantri}
                                        required={isCreate}
                                        error={!!errorMessage.address}
                                        helperText={!!errorMessage.address && "Harap isi domisili Santri dengan benar."}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        data-testid='santri-birthPlace-at-AdminCreateOrEditSantri-module'
                                        name="birthPlace"
                                        value={santri || isCreate ? santri.birthPlace : originalSantriResult.birthPlace}
                                        label="Tempat Lahir"
                                        fullWidth
                                        onChange={handleChangeSantri}
                                        required={isCreate}
                                        error={!!errorMessage.birthPlace}
                                        helperText={!!errorMessage.birthPlace && "Harap isi tempat lahir Santri dengan benar."}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        data-testid='santri-birthDate-at-AdminCreateOrEditSantri-module'
                                        name="birthDate"
                                        value={santri || isCreate ? santri.birthDate : originalSantriResult.birthDate}
                                        label="Tanggal Lahir"
                                        type="date"
                                        fullWidth
                                        onChange={handleChangeSantri}
                                        required={isCreate}
                                        error={!!errorMessage.birthDate}
                                        helperText={!!errorMessage.birthDate && "Harap isi tanggal lahir Santri dengan benar."}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <LoadingButton
                                        data-testid='santri-submit-button-at-AdminCreateOrEditSantri-module'
                                        fullWidth type='submit'
                                        loading={loading}
                                        loadingIndicator="Menyimpan..."
                                        variant="contained"
                                        disabled={isCreate && !(
                                            !!santri.name &&
                                            !!santri.background &&
                                            !!santri.markazId &&
                                            !!santri.gender &&
                                            !!santri.address &&
                                            !!santri.birthPlace &&
                                            !!santri.birthDate
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
    )
}

export default AdminCreateOrEditSantri
