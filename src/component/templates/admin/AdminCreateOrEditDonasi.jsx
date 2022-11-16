import React, { useCallback, useRef, useState } from 'react'
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography'
import { Chip, FormControl, FormHelperText } from "@mui/material";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from '@mui/material/OutlinedInput';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from "@mui/material/Button";
import { useAppContext } from "../../../context/AppContext";
import { dispatchTypes } from "../../../context/AppReducer";
import { useRouter } from "next/router";
import { LoadingButton } from '@mui/lab';
import { Box } from "@mui/material";

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

    const isCreate = createOrEdit === 'create'
    const form = useRef(null);
    const { dispatch } = useAppContext();
    const [loading, setLoading] = useState(false)
    const [isActive, setIsActive] = useState();

    const [errorMessage, setErrorMessage] = useState({
        name: "",
        description: "",
        categories: "",
        nominal: "",
        contactName: "",
        contactInfo: "",

    })


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

    const handleChange = ({ target }) => {
        const { name, value } = target;
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
        setErrorMessage((prev => ({
            ...prev,
            [name]: ""
        })))
    };

    const handleSubmit = async (event) => {
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
                router.push(`/admin/${markazOrSantri}/${redirectID}`)
            })
            .catch(error => {
                setLoading(false)
                // Check & Handle if error.response is undefined
                if (!!error.response && error.response.status === 400) {
                    setErrorMessage(prev => ({
                        ...prev,
                        ...error.response.data.result
                    }))
                }
            })

    }


    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    console.log(donasi)
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
                                    <Typography sx={{ textTransform: "capitalize" }} variant="h5" component="h5" color="initial">{createOrEdit} {markazOrSantri} Donation Detail</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="name"
                                        label="Nama donasi"
                                        placeholder="Donasi 1"
                                        fullWidth
                                        value={donasi.name}
                                        onChange={handleChangeDonasi}
                                        required={isCreate}
                                        error={!!errorMessage.name}
                                        helperText={!!errorMessage.name && "Harap isi nama donasi dengan benar."}
                                    />
                                </Grid>
                                {markazOrSantri === "markaz" ?
                                    <Grid item xs={12}>
                                        <FormControl fullWidth error={!!errorMessage.categories}>
                                            <InputLabel id="demo-multiple-name-label">Kategori</InputLabel>
                                            <Select
                                                labelId="demo-multiple-name-label"
                                                id="demo-multiple-name"
                                                multiple
                                                name='categories'
                                                value={donasi.categories}
                                                onChange={handleChangeDonasi}
                                                required={isCreate}
                                                input={<OutlinedInput label="Categories" />}
                                                renderValue={(selected) => (
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                        {selected.map((value) => (
                                                            <Chip key={value} label={value} />
                                                        ))}
                                                    </Box>
                                                )}
                                                MenuProps={MenuProps}

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
                                            {!!errorMessage.categories && (
                                                <FormHelperText>
                                                    Harap pilih kategori donasi.
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    : <></>}
                                <Grid item xs={12}>
                                    <TextField
                                        name="description"
                                        label={label}
                                        fullWidth
                                        value={donasi.description}
                                        onChange={handleChangeDonasi}
                                        required={isCreate}
                                        placeholder="Membutuhkan donasi untuk memenuhi kebutuhan"
                                        error={!!errorMessage.description}
                                        helperText={!!errorMessage.description && "Harap isi kebutuhan fasilitas donasi dengan benar."}
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
                                        required={isCreate}
                                        error={!!errorMessage.nominal}
                                        helperText={!!errorMessage.nominal && "Harap isi nominal donasi dengan benar."}
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
                                        required={isCreate}
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
                                            required={isCreate}
                                        >
                                            <FormControlLabel value={true} control={<Radio />} label="Ya" />
                                            <FormControlLabel value={false} control={<Radio />} label="Tidak" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <LoadingButton
                                        id='markazSubmitAtComponentAdminCreateOrEditMarkaz'
                                        fullWidth
                                        type='submit'
                                        loading={loading}
                                        loadingIndicator="Menyimpan..."
                                        variant="contained"
                                        disabled={isCreate && !(
                                            !!donasi.name &&
                                            !!donasi.description &&
                                            !!donasi.categories &&
                                            !!donasi.nominal &&
                                            !!donasi.isActive
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

export default AdminCreateOrEditDonasi
