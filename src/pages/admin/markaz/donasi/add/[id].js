import { useCallback, useState, useRef } from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography'
import { useAppContext } from "../../../../../context/AppContext";
import { FormControl } from "@mui/material";
import { Select } from "@mui/material";
import { InputLabel } from "@mui/material";
import { MenuItem } from "@mui/material";
import { dispatchTypes } from "../../../../../context/AppReducer";
import { useRouter } from "next/router";
<<<<<<< HEAD
import { axiosMain } from "../../../../../axiosInstances";
import AdminCreateOrEditDonasi from "../../../../../component/templates/admin/AdminCreateOrEditDonasi";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOST;

function AdminMarkazDonasiCreate(props) {
=======
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { axiosMain } from "../../../../../axiosInstances";
import OutlinedInput from '@mui/material/OutlinedInput';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOST;

function AdminDonasiCreate(props) {
>>>>>>> 5361b7e (feat: finished feature add donasi markaz)
    const { responseMarkaz } = props
    const { dispatch } = useAppContext();
    const [data, setData] = useState({
        name: "",
        categories: [],
        description: "",
        nominal: "",
        isActive: null
    });
    const form = useRef(null);

    const handleChangeDonasi = ({ target }) => {
        const { name, value } = target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const router = useRouter()
    const {id} = router.query
    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        console.log("data", data)
        await axiosMain
            .post(`/admin/donation/markaz?id=${id}`, data)
            .then(response => {
                setLoading(false)
                console.log(response)
                dispatch({
                    type: dispatchTypes.SNACKBAR_CUSTOM,
                    payload: {
                        severity: 'success',
                        message: "Donasi Markaz Created"
                    }
                })
            })
            .catch(error => {
                setLoading(false)
                console.log(error.response)
                // Check & Handle if error.response is defined
                if (!!error.response) {
                    if (error.response.status === 400) {
                    console.log(error.response)
                        // Check & Handle if bad request (empty fields, etc)
                        dispatch({
                            type: dispatchTypes.SNACKBAR_CUSTOM,
                            payload: {
                                severity: 'error',
                                message: 'Incorrect information'
                            }
                        });
                    } else {
                        // Check & Handle if other error code
                        dispatch({
                            type: dispatchTypes.SERVER_ERROR
                        });
                    }
                } else {
                    // Check & Handle if error.response is undefined
                    dispatch({
                        type: dispatchTypes.SERVER_ERROR
                    });
                }
            })
    };

    const [loading, setLoading] = useState(false)

    const [isActive, setIsActive] = useState();

//      const handleIsActive = (event) => {
//        setIsActive(event.target.isActive);
//      };

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

    console.log(category)

    return (
<<<<<<< HEAD
        <AdminCreateOrEditDonasi
            form={form}
            handleSubmit={handleSubmit}
            donasi={data}
            createOrEdit="Create"
            markazOrSantri="Markaz"
            handleChange={handleChange}
            handleChangeDonasi={handleChangeDonasi}
            handleIsActive={handleIsActive}
            names={names}
            label="Facility Requirements"
        />
=======
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
                                  <FormControl sx= {{width: '100%'}}>
                                    <InputLabel id="demo-multiple-name-label">Category</InputLabel>
                                    <Select
                                      labelId="demo-multiple-name-label"
                                      id="demo-multiple-name"
                                      multiple
                                      value={category}
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
                                        label="Facility Requirement"
                                        fullWidth
                                        onChange={handleChangeDonasi}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="nominal"
                                        label="Goal"
                                        fullWidth
                                        onChange={handleChangeDonasi}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        disabled
                                        name="donated"
                                        label="Current Progress"
                                        fullWidth
                                        onChange={handleChangeDonasi}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                        <FormControl component="fieldset">
                                        <FormLabel><Typography><p>Display on Markaz detail page?</p></Typography></FormLabel>
                                          <RadioGroup
                                            aria-label="displayOnMarkazDetail"
                                            defaultValue={false}
                                            name="radio-buttons-group"
                                            value={isActive}
                                            onChange={handleIsActive}
                                          >
                                            <FormControlLabel value={true} control={<Radio />} label="Yes" />
                                            <FormControlLabel value={false} control={<Radio />} label="No" />
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
>>>>>>> 5361b7e (feat: finished feature add donasi markaz)
    );
}

export default AdminMarkazDonasiCreate;
