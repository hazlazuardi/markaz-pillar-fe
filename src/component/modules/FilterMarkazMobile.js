import { FilterList } from "@mui/icons-material";
import { Chip } from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import { FormControl, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
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
  const {
    setNameFilter,
    setLocationFilter,
    setCategoryFilter,
    setCategoryFilter2,
    setCategoryFilter3,
    mutate,
  } = props;

  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState();
  const anchorRef = React.useRef(null);
  const [value, setValue] = React.useState();

  const { window } = props;
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleChangeName = (event) => {
    setNameFilter(event.target.value);
    setLocationFilter("");
    setCategoryFilter("");
    setCategoryFilter2("");
    setCategoryFilter3("");
    mutate();
  };

  const handleChangeLocation = (event) => {
    setLocationFilter(event.target.value);
    setNameFilter("");
    setCategoryFilter("");
    setCategoryFilter2("");
    setCategoryFilter3("");
    mutate();
  };

  const handleChangeCategory = (event) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      setCategoryFilter(event.target.name);
    } else {
      setCategoryFilter("");
    }

    setNameFilter("");
    setLocationFilter("");
    mutate();
  };

  const handleChangeCategory2 = (event) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      setCategoryFilter2(event.target.name);
    } else {
      setCategoryFilter2("");
    }

    setNameFilter("");
    setLocationFilter("");
    mutate();
  };

  const handleChangeCategory3 = (event) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      setCategoryFilter3(event.target.name);
    } else {
      setCategoryFilter3("");
    }
    setNameFilter("");
    setLocationFilter("");
    mutate();
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
        
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Chip
          data-testid="filterChipButton-at-admin-or-user-template"
          label="Filter"
          icon={<FilterList />}
        />
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
              keepMounted: false,
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
                            value="false"
                            label="Luar Jabodetabek"
                          />
                          <FormControlLabel
                            control={<Radio />}
                            value="true"
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
                      <Typography>Urutkan Nama</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <FormControl component="fieldset">
                        <RadioGroup value={value} onChange={handleChangeName}>
                          <FormControlLabel
                            control={<Radio />}
                            value="ASC"
                            label="A-Z"
                          />
                          <FormControlLabel
                            control={<Radio />}
                            value="DESC"
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
                                checked={checked}
                                onChange={handleChangeCategory}
                                name="PEMBANGUNAN_MARKAZ"
                              />
                            }
                            value="PEMBANGUNAN_MARKAZ"
                            label="Pembangunan Markaz"
                          />

                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checked}
                                onChange={handleChangeCategory2}
                                name="RENOVASI"
                              />
                            }
                            value="RENOVASI"
                            label="Renovasi"
                          />

                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checked}
                                onChange={handleChangeCategory3}
                                name="PENAMBAHAN_FASILITAS"
                              />
                            }
                            value="PENAMBAHAN_FASILITAS"
                            label="Penambahan Fasilitas"
                          />
                        </FormGroup>
                      </FormControl>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </ClickAwayListener>
            </StyledBox>
          </SwipeableDrawer>
        </ClickAwayListener>
      </Root>
    </>
  );
}
