import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Grid from "@mui/material/Grid";
import * as React from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import { FormControl, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { Responsive } from "./Responsive";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import RadioGroup from "@mui/material/RadioGroup";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light" ? grey[0] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

export default function FilterMarkazMobile(props) {
  const { setSort, filter } = props;

  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(true);
  const anchorRef = React.useRef(null);
  const [value, setValue] = React.useState();

  const { window } = props;
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleChangeSort = (event) => {
    setChecked(event.target.checked);
    setValue(event.target.value);
    if (value === "desc") {
      setSort(filter.sort[0]);
    } else if (value === "asc") {
      setSort(filter.sort[1]);
    }
  };

  const handleChangeLocation = (event) => {
    setChecked(event.target.checked);
    setValue(event.target.value);
    if (value === "false") {
      setSort(filter.location[0]);
    } else if (value === "true") {
      setSort(filter.location[1]);
    }
  };

  const handleChangeCategory = (event) => {
    setChecked(event.target.checked);
    if (event.target.id === "pembangunan") {
      setSort(filter.category[0]);
    } else if (event.target.id === "renovasi") {
      setSort(filter.category[1]);
    } else if (event.target.id === "penambahan") {
      setSort(filter.category[2]);
    } else if (
      event.target.id === "pembangunan" &&
      event.target.id === "renovasi"
    ) {
      setSort(filter.category[3]);
    } else if (
      event.target.id === "pembangunan" &&
      event.target.id === "penambahan"
    ) {
      setSort(filter.category[4]);
    } else if (
      event.target.id === "renovasi" &&
      event.target.id === "penambahan"
    ) {
      setSort(filter.category[5]);
    } else if (
      event.target.id === "pembangunan" &&
      event.target.id === "renovasi" &&
      event.target.id === "penambahan"
    ) {
      setSort(filter.category[6]);
    }
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Button
        variant="text"
        href
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <FilterAltOutlinedIcon />
      </Button>
      <Root>
        <CssBaseline />
        <Global
          styles={{
            ".MuiDrawer-root > .MuiPaper-root": {
              height: `calc(75% - ${drawerBleeding}px)`,
              overflow: "visible",
            },
          }}
        />

        <ClickAwayListener onClickAway={handleClose}>
          <SwipeableDrawer
            container={container}
            anchor="bottom"
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            swipeAreaWidth={drawerBleeding}
            disableSwipeToOpen={false}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <StyledBox
              sx={{
                position: "absolute",
                top: -drawerBleeding,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                visibility: "visible",
                right: 0,
                left: 0,
                display: open ? "block" : "none",
                height: "100%",
              }}
            >
              <Typography variant="h6" ml={2}>
                Filter
              </Typography>
              <Puller
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
              />

              <ClickAwayListener onClickAway={handleClose}>
                <Box
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                  sx={{
                    overflow: "scroll",
                    height: "100%",
                  }}
                >
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Lokasi</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <FormControl component="fieldset">
                        <RadioGroup
                          value={value}
                          onChange={handleChangeLocation}
                        >
                          <FormControlLabel
                            control={<Radio />}
                            value="true"
                            label="Luar Jabodetabek"
                          />
                          <FormControlLabel
                            control={<Radio />}
                            value="false"
                            label="Jabodetabek"
                          />
                        </RadioGroup>
                      </FormControl>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Urutkan</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <FormControl component="fieldset">
                      <RadioGroup value={value} onChange={handleChangeSort}>
                        <FormControlLabel
                          control={<Radio />}
                          value="desc"
                          label="A-Z"
                        />
                        <FormControlLabel
                          control={<Radio />}
                          value="asc"
                          label="Z-A"
                        />
                      </RadioGroup>
                      </FormControl>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Kategori</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <FormControl component="fieldset">
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={handleChangeCategory}
                              id="pembangunan"
                            />
                          }
                          label="Pembangunan Markaz"
                        />

                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={handleChangeCategory}
                              id="renovasi"
                            />
                          }
                          label="Renovasi"
                        />

                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={handleChangeCategory}
                              id="penambahan"
                            />
                          }
                          label="Penambahan Fasilitas"
                        />
                      </FormGroup>
                      </FormControl>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </ClickAwayListener>
              {/* // </Paper> */}
              {/* </Grow> */}
              {/* )} */}
              {/* </Popper> */}
            </StyledBox>
          </SwipeableDrawer>
        </ClickAwayListener>
      </Root>
      {/* <Responsive displayIn={["Laptop"]}> */}

      {/* </Responsive> */}
      {/* <Responsive displayIn={["Mobile"]}>
        noooooooo
      </Responsive> */}
    </>
  );
}
