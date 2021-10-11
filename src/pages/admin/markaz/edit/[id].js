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

const BASE_URL = process.env.BACKEND_HOST;

function AdminMarkazEdit(props) {
  const { responseMarkaz } = props
  const { state, dispatch } = useAppContext();
  const { currentAccessToken } = state;
  const [thumbnail, setThumbnail] = useState({});
  const [markaz, setMarkaz] = useState({
    name: responseMarkaz.name,
    background: responseMarkaz.background,
    category: responseMarkaz.category,
    address: responseMarkaz.address,
  });
  const form = useRef(null);

  const onDrop = useCallback((acceptedFiles) => {
    console.log("acceptedFiles", acceptedFiles[0]);
    const reader = new FileReader();
    reader.onload = function (e) {
      setThumbnail(acceptedFiles[0]);
    };
    reader.readAsDataURL(acceptedFiles[0]);
    console.log("file", acceptedFiles[0]);
    return acceptedFiles[0];
  }, []);

  const handleChangeMarkaz = ({ target }) => {
    const { name, value } = target;
    setMarkaz((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // API Route usage
    const data = new FormData();
    const markazBlob = new Blob([JSON.stringify(markaz)], {
      type: "application/json",
    });
    data.append("thumbnail", thumbnail);
    data.append("markaz", markazBlob);
    // Display the key/value pairs
    for (var pair of data.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    console.log(BASE_URL);
    await fetch(`${BASE_URL}/admin/markaz?id=${responseMarkaz.id}`, {
      body: data,
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${currentAccessToken}`,
      },
      method: "PUT",
    }).then((preResponse) => {
      preResponse.json().then((response) => {
        if (preResponse.status === 201) {
          console.log(response);
        } else if (preResponse.status === 400) {
          console.log("kl 400", response)
          dispatch({
            type: dispatchTypes.SNACKBAR_CUSTOM,
            payload: {
              message: "Please upload a correct information"
            }
          })
        } else {
          dispatch({
            type: dispatchTypes.LOGOUT
          })
          router.push("/login")
        }
      })
        .catch(e => {
          { console.log(e) }
        })
    }).catch(e => {
      { console.log(e) }
    })
  };

  console.log("image", thumbnail);
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
                    onDrop={onDrop}
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
                  <Typography variant="h5" color="initial">Edit Markaz {markaz.name}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    label="Markaz Name"
                    fullWidth
                    onChange={handleChangeMarkaz}
                    value={markaz.name}

                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
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
                    name="address"
                    label="Markaz Address"
                    fullWidth
                    onChange={handleChangeMarkaz}
                    value={markaz.address}

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

export default AdminMarkazEdit;

export async function getStaticProps(context) {
  const id = context.params.id;
  const response = await fetch(`${BASE_URL}/markaz?id=` + id);
  const data = await response.json();
  const markaz = data.result;

  return {
    props: {
      responseMarkaz: markaz,
    },
  };
}

export async function getStaticPaths() {
  const response = await fetch(`${BASE_URL}/markaz/search`);
  const data = await response.json();
  const markaz = data.result;

  const paths = markaz.map((markaz) => ({
    params: { id: markaz.id.toString() },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}

