import { useCallback, useState, useRef } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography'
import Dropzone from "../../../../component/modules/Dropzone";
import { useAppContext } from "../../../../context/AppContext";
import { FormControl } from "@mui/material";
import { Select } from "@mui/material";
import { InputLabel } from "@mui/material";
import { MenuItem } from "@mui/material";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOST;

function AdminSantriCreate(props) {
    const { responseSantri } = props
    {
        const notFound = false;
        try {
            notFound = props.notFound;
        } catch {

        }

        const { state, dispatch } = useAppContext();
        const { currentAccessToken } = state;
        const [thumbnail, setThumbnail] = useState({});
        const [santri, setSantri] = useState({
            name: responseSantri.name,
            background: responseSantri.background,
            gender: responseSantri.gender,
            address: responseSantri.address,
            category: responseSantri.category,
            birthDate: responseSantri.birthDate,
            birthPlace: responseSantri.birthPlace,
        });
        const form = useRef(null);

        const handleChangeSantri = ({ target }) => {
            const { name, value } = target;
            setSantri((prev) => ({
                ...prev,
                [name]: value,
            }));
        };

        const handleSubmit = async (event) => {
            event.preventDefault();

            // API Route usage
            const data = new FormData();
            const santriBlob = new Blob([JSON.stringify(santri)], {
                type: "application/json",
            });
            data.append("thumbnail", thumbnail);
            data.append("santri", santriBlob);
            // Display the key/value pairs
            for (var pair of data.entries()) {

            }


            await fetch(`${BASE_URL}/admin/santri/edit?id=${responseSantri.markaz.id}`, {
                body: data,
                headers: {
                    Accept: "application/json, text/plain, */*",
                    Authorization: `Bearer ${currentAccessToken}`,
                },
                method: "POST",
            })
                .then((preResponse) => {
                    preResponse.json()
                        .then((response) => {
                            if (preResponse.status === 200) {

                                dispatch({
                                    type: dispatchTypes.SNACKBAR_CUSTOM,
                                    payload: {
                                        message: "Santri Edited"
                                    }
                                })
                            } else if (preResponse.status === 400) {

                                dispatch({
                                    type: dispatchTypes.SNACKBAR_CUSTOM,
                                    payload: {
                                        message: "Incorrect information"
                                    }
                                })
                            } else if (preResponse.status === 413) {

                                dispatch({
                                    type: dispatchTypes.SNACKBAR_CUSTOM,
                                    payload: {
                                        message: "File is too large"
                                    }
                                })
                            }
                        })
                        .catch(e => {

                        })
                }).catch(e => {

                })
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
                                            accept={"application/pdf"}
                                        />
                                    </Grid>
                                    {thumbnail.name &&
                                        <Grid item xs={12}>
                                            <Typography variant="body1" color="initial">Uploaded: {thumbnail.name}</Typography>
                                        </Grid>
                                    }
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography variant="h5" color="initial">Edit Santri {responseSantri.name}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="name"
                                            label="Nama Santri"
                                            fullWidth
                                            onChange={handleChangeSantri}
                                            value={santri.name}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="background"
                                            label="Background"
                                            fullWidth
                                            onChange={handleChangeSantri}
                                            value={santri.background}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="gender-label">Jenis Kelamin</InputLabel>
                                            <Select
                                                labelId="gender-label"
                                                id="gender-select"
                                                name='gender'
                                                value={santri.gender}
                                                label="Jenis Kelamin"
                                                onChange={handleChangeSantri}
                                            >
                                                <MenuItem value={"LAKI_LAKI"}>Laki-laki</MenuItem>
                                                <MenuItem value={"PEREMPUAN"}>Perempuan</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="address"
                                            label="Domisili Asal"
                                            fullWidth
                                            onChange={handleChangeSantri}
                                            value={santri.address}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="birthPlace"
                                            label="Tempat Lahir"
                                            fullWidth
                                            onChange={handleChangeSantri}
                                            value={santri.birthPlace}

                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="birthDate"
                                            label="Tanggal Lahir"
                                            fullWidth
                                            onChange={handleChangeSantri}
                                            placeholder="YYYY-MM-DD"
                                            value={santri.birthDate}

                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button type="submit" variant="contained" color="primary" fullWidth>
                                            Save
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </div>
        );
    }
}

export default AdminSantriCreate;


export async function getStaticProps(context) {
    const id = context.params.id;
    const response = await fetch(`${BASE_URL}/santri?id=` + id);
    const data = await response.json();
    const santri = data.result;

    return {
        props: {
            responseSantri: santri,
        },
    };
}

export async function getStaticPaths() {
    const response = await fetch(`${BASE_URL}/santri/search?n=1000`);
    const data = await response.json();
    const santri = data.result;

    const paths = santri.map((santri) => ({
        params: { id: santri.id.toString() },
    }));

    return {
        paths: paths,
        fallback: false,
    };
}
