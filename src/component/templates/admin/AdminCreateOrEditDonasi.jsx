import React, {useCallback, useRef, useState} from 'react'
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography'
import { FormControl } from "@mui/material";
import  Select  from "@mui/material/Select";
import  InputLabel  from "@mui/material/InputLabel";
import  MenuItem  from "@mui/material/MenuItem";
import OutlinedInput from '@mui/material/OutlinedInput';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from "@mui/material/Button";
import {useAppContext} from "../../../context/AppContext";
import {dispatchTypes} from "../../../context/AppReducer";
import {useRouter} from "next/router";

function AdminCreateOrEditDonasi(props) {
    const router = useRouter();
    const {
        createOrEdit,
        markazOrSantri,
        donasi,
        label,
        displayTotal,
        setData,
        apiCall,
        redirectID
    } = props;

    const form = useRef(null);
    const { dispatch } = useAppContext();
    const [loading, setLoading] = useState(false)
    const [isActive, setIsActive] = useState();

    const handleIsActive = (event) => {
        const {
            target: { value },
        } = event;
        setIsActive(event.target.isActive);
        setData((prev) => ({
            ...prev,
            isActive: event.target.value
        }));
    };

    const names = [
        'RENOVASI',
        'PEMBANGUNAN_MARKAZ'
    ];

    const [category, setCategory] = useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setCategory(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        setData((prev) => ({
            ...prev,
            categories: category,
        }));
    };

    const handleChangeDonasi = ({ target }) => {
        const { name, value } = target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const [success, setSuccess] = useState(false)

    const handleSubmit = useCallback(async (event) => {
        setLoading(true)
        event.preventDefault();

        await apiCall(donasi)
            .then(response => {
                setLoading(false)

                dispatch({
                    type: dispatchTypes.SNACKBAR_CUSTOM,
                    payload: {
                        severity: 'success',
                        message: createOrEdit === 'create' ? "Donasi Created" : "Donasi Edited"
                    }
                })
                setSuccess(true)
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

    }, [apiCall, dispatch, donasi, createOrEdit])

    if (success) {
        router.push(`/admin/${markazOrSantri}/${redirectID}`)
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
                                    <Typography sx={{textTransform: "capitalize"}} variant="h5" color="initial">{createOrEdit} {markazOrSantri} Donation Detail</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="name"
                                        label="Nama donasi"
                                        placeholder="Donasi 1"
                                        fullWidth
                                        value={donasi.name}
                                        onChange={handleChangeDonasi}
                                    />
                                </Grid>
                                { markazOrSantri === "markaz" ?
                                    <Grid item xs={12}>
                                      <FormControl sx= {{width: '100%'}}>
                                        <InputLabel id="demo-multiple-name-label">Kategori</InputLabel>
                                        <Select
                                          labelId="demo-multiple-name-label"
                                          id="demo-multiple-name"
                                          multiple
                                          value={donasi.categories}
                                          onChange={handleChange}
                                          input={<OutlinedInput label="Categories" />}
                                        >
                                          {names.map((category) => (
                                            <MenuItem
                                              key={category}
                                              value={category}
                                            >
                                              {category}
                                            </MenuItem>
                                          ))}
                                        </Select>
                                      </FormControl>
                                    </Grid>
                                    : <></> }
                                <Grid item xs={12}>
                                    <TextField
                                        name="description"
                                        label={label}
                                        fullWidth
                                        value={donasi.description}
                                        onChange={handleChangeDonasi}
                                        placeholder="Membutuhkan donasi untuk memenuhi kebutuhan"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="nominal"
                                        label="Nominal yang dibutuhkan"
                                        placeholder="1000000"
                                        fullWidth
                                        value={donasi.nominal}
                                        onChange={handleChangeDonasi}
                                    />
                                </Grid>
                                <Grid item xs={12} display={displayTotal}>
                                    <TextField
                                        disabled
                                        name="donated"
                                        label="Jumlah donasi saat ini"
                                        placeholder="500000"
                                        value={donasi.donated}
                                        fullWidth
                                        onChange={handleChangeDonasi}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                        <FormControl component="fieldset">
                                        <FormLabel><Typography><p>Tampilkan di halaman detail {markazOrSantri}?</p></Typography></FormLabel>
                                          <RadioGroup
                                            aria-label="displayOnMarkazDetail"
                                            defaultValue={false}
                                            name="radio-buttons-group"
                                            value={donasi.isActive}
                                            onChange={handleIsActive}
                                          >
                                            <FormControlLabel value={true} control={<Radio />} label="Ya" />
                                            <FormControlLabel value={false} control={<Radio />} label="Tidak" />
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

export default AdminCreateOrEditDonasi
