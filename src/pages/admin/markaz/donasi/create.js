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
import { dispatchTypes } from "../../../../context/AppReducer";
import router from "next/router";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOST;

function AdminDonasiCreate() {
    const { state, dispatch } = useAppContext();
    const { currentAccessToken } = state;
    const [thumbnail, setThumbnail] = useState({});
    const [donasi, setDonasi] = useState({
        name: "",
        background: "",
        category: "",
        address: "",
    });
    const form = useRef(null);

    const handleChangeDonasi = ({ target }) => {
        const { name, value } = target;
        setDonasi((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // API Route usage
        const data = new FormData();
        const donasiBlob = new Blob([JSON.stringify(donasi)], {
            type: "application/json",
        });
        data.append("thumbnail", thumbnail);
        data.append("donasi", donasiBlob);
        // Display the key/value pairs
        for (var pair of data.entries()) {

        }


        await fetch(`${BASE_URL}/admin/donasi`, {
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
                        if (preResponse.status === 201) {

                            dispatch({
                                type: dispatchTypes.SNACKBAR_CUSTOM,
                                payload: {
                                    message: "Donasi Created"
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
                                    <Typography variant="h5" color="initial">Add Donasi Detail</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="name"
                                        label="Donasi Name"
                                        fullWidth
                                        onChange={handleChangeDonasi}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="category"
                                        label="Category"
                                        fullWidth
                                        onChange={handleChangeDonasi}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="facility"
                                        label="Facility Requirement"
                                        fullWidth
                                        onChange={handleChangeDonasi}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="goal"
                                        label="Goal"
                                        fullWidth
                                        onChange={handleChangeDonasi}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        disabled
                                        name="progress"
                                        label="Current Progress"
                                        fullWidth
                                        onChange={handleChangeDonasi}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                <Typography><p>Display on Markaz detail page?</p></Typography>
                                        <FormControl component="fieldset">
                                          <RadioGroup
                                            aria-label="displayOnMarkazDetail"
                                            defaultValue="yes"
                                            name="radio-buttons-group"
                                          >
                                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="no" control={<Radio />} label="No" />
                                          </RadioGroup>
                                        </FormControl>
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

export default AdminDonasiCreate;
