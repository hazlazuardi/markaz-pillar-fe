import React from 'react'
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

function AdminCreateOrEditDonasi(props) {
    const {
        form,
        handleSubmit,
        createOrEdit,
        markazOrSantri,
        donasi,
        handleChange,
        handleChangeDonasi,
        handleIsActive,
        names,
        label,
        showCategory,
        displayTotal
    } = props;

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
                                    <Typography variant="h5" color="initial">{createOrEdit} {markazOrSantri} Donation Detail</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="name"
                                        label="Nama donasi"
                                        placeholder="Donasi 1"
                                        fullWidth
                                        onChange={handleChangeDonasi}
                                    />
                                </Grid>
                                <Grid item xs={12} display={showCategory}>
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
                                <Grid item xs={12}>
                                    <TextField
                                        name="description"
                                        label={label}
                                        fullWidth
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
                                        onChange={handleChangeDonasi}
                                    />
                                </Grid>
                                <Grid item xs={12} display={displayTotal}>
                                    <TextField
                                        disabled
                                        name="donated"
                                        label="Jumlah donasi saat ini"
                                        placeholder="500000"
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
