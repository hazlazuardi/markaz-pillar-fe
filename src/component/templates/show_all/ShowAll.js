import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import styles from "../../../styles/Home.module.css";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";


const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOST;

export default function ShowAll(props) {
  const {
    children,
    searchBarName,
    markazOrSantri,
    value,
    setValue,
    searchTerm,
    setSearchTerm,
    page,
    setPage,
    isAdmin,
    setGridView,
  } = props;

  return (
    <Container maxWidth="lg" className={styles.container}>
      <Grid
        container
        spacing={3}
        // className={styles.containergrid}
        sx={{ display: "flex", justifyContent: "center", ml: -1.5 }}
      >
        <Grid container sx={{ mt: "50px" }}>
          <Grid item xs={12}>
            <Typography variant="h6" component="h2">
              Daftar {markazOrSantri} <FilterAltOutlinedIcon />
            </Typography>
          </Grid>
          <Grid
            container
            spacing={3}
            margin={0}
            //   direction="column-reverse"
            display="flex"
            className={styles.gridheader}
            wrap="reverse"
            //   sx={{ alignItems: "center" }}
            //   md={{alignItems: ""}}
          >
            <Grid item lg={6} sm={6}>
              <Typography variant="subtitle1" component="subtitle1">
                Show
                <FormControl sx={{ mx: 1 }}>
                  <Select
                    value={value}
                    onChange={(e) => {
                      setSearchTerm("");
                      setValue(e.target.value);
                    }}
                    displayEmpty
                    name="numOfEntries"
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                  </Select>
                </FormControl>
                Entries
              </Typography>
            </Grid>
            <Grid
              item
              lg={6}
              sm={6}
              //   className={styles.flexEnd}
              pr={3}
              sx={{ m: "auto", p: "auto" }}
            >
              <form action="/" method="get">
                <label htmlFor="header-search">
                  <span className="visually-hidden"></span>
                </label>
                <TextField
                  variant="outlined"
                  fullwidth
                  type="text"
                  id="header-search"
                  placeholder={searchBarName}
                  name="s"
                  className="search"
                  value={searchTerm}
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                  }}
                />
                {/* <button type="submit" className={styles.btn2}>
                Cari
              </button> */}
              </form>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {isAdmin && (
              <>
                <Button
                  style={{
                    color: "#004f5d",
                    backgroundColor: "#ffffff",
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                  onClick={() => setGridView(true)}
                >
                  Grid View
                </Button>
                <Button
                  style={{
                    color: "#004f5d",
                    backgroundColor: "#ffffff",
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                  onClick={() => setGridView(false)}
                >
                  Table View
                </Button>
              </>
            )}
          </Grid>
        </Grid>
        {children}
        <Grid item xs={12} mt={5} className={styles.flexEnd}>
          <Pagination
            count={5}
            page={page + 1}
            onChange={(event, valuee) => {
              setSearchTerm("");
              setPage(valuee - 1);
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
