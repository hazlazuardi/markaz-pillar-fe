import React, { useCallback, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Checkbox,
  ClickAwayListener,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grow,
  Paper,
  Popper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FilterList } from "@mui/icons-material";
import { Box } from "@mui/system";
import Drawer from "./Drawer.js";

export default function FilterComponent(props) {
  const {
    setCategoryFilter,
    setCategoryFilter2,
    setCategoryFilter3,
    mutate,
    variant,
    size,
    FilterRadioObject,
  } = props;

  const [state, setState] = React.useState({
    PEMBANGUNAN_MARKAZ: false,
    RENOVASI: false,
    PENAMBAHAN_FASILITAS: false,
  });

  const handleChange1 = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
    if (event.target.checked) {
      setCategoryFilter(event.target.name);
    } else {
      setCategoryFilter("");
    }
    mutate();
  };

  const handleChange2 = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
    if (event.target.checked) {
      setCategoryFilter2(event.target.name);
    } else {
      setCategoryFilter2("");
    }
    mutate();
  };

  const handleChange3 = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
    if (event.target.checked) {
      setCategoryFilter3(event.target.name);
    } else {
      setCategoryFilter3("");
    }
    mutate();
  };

  const { PEMBANGUNAN_MARKAZ, RENOVASI, PENAMBAHAN_FASILITAS } = state;

  // *******************************************************
  // MenuList Composition
  // *******************************************************

  let open = false;
  const anchorRef = React.useRef(null);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenDrawer(false);
  };

  // *******************************************************
  // Drawer
  // *******************************************************

  const [openDrawer, setOpenDrawer] = useState({
    bottom: false,
  });

  const toggleDrawer = (isOpenDrawer) => (event) => {
    setOpenDrawer({ ...openDrawer, bottom: isOpenDrawer });
  };

  // *******************************************************
  // Accordions
  // *******************************************************
  
  const accordionFilter = FilterRadioObject.map((element, index) => (
    <Accordion key={index}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{element.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormControl component="fieldset">
          <RadioGroup value={element.value} onChange={element.onChange}>
            <FormControlLabel
              control={<Radio />}
              value={element.labels[0].value}
              label={element.labels[0].label}
            />
            <FormControlLabel
              control={<Radio />}
              value={element.labels[1].value}
              label={element.labels[1].label}
            />
            {variant === "kegiatan" || variant === "relawan" ? (
              <FormControlLabel
                control={<Radio />}
                value={element.labels[2].value}
                label={element.labels[2].label}
              />
            ) : null}
          </RadioGroup>
        </FormControl>
      </AccordionDetails>
    </Accordion>
  ));

  return (
    <>
      <Chip
        data-testid="filterChipButton-at-admin-or-user-template"
        label="Filter"
        icon={<FilterList />}
        onClick={toggleDrawer(true)}
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        color="primary"
      />

      {
        // desktop view
        size == "medium" ? (
          <Popper
            open={openDrawer.bottom}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
            style={{ zIndex: "1000" }}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom-start" ? "left top" : "left bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <Box
                      id="composition-menu"
                      aria-labelledby="composition-button"
                    >
                      <Typography variant="h6" ml={2}>
                        Filter
                      </Typography>

                      {accordionFilter}
                      {variant === "markaz" && (
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography>Kategori</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <FormControl
                              component="fieldset"
                              variant="standard"
                            >
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={PEMBANGUNAN_MARKAZ}
                                      onChange={handleChange1}
                                      name="PEMBANGUNAN_MARKAZ"
                                    />
                                  }
                                  // value="PEMBANGUNAN_MARKAZ"
                                  label="Pembangunan Markaz"
                                />

                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={RENOVASI}
                                      onChange={handleChange2}
                                      name="RENOVASI"
                                    />
                                  }
                                  // value="RENOVASI"
                                  label="Renovasi"
                                />

                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={PENAMBAHAN_FASILITAS}
                                      onChange={handleChange3}
                                      name="PENAMBAHAN_FASILITAS"
                                    />
                                  }
                                  // value="PENAMBAHAN_FASILITAS"
                                  label="Penambahan Fasilitas"
                                />
                              </FormGroup>
                            </FormControl>
                          </AccordionDetails>
                        </Accordion>
                      )}
                    </Box>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        ) : (
          // mobile view
          <Drawer open={openDrawer} toggleDrawer={toggleDrawer}>
            {accordionFilter}
            {variant === "markaz" && (
              <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Kategori</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormControl
                  component="fieldset"
                  variant="standard"
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={PEMBANGUNAN_MARKAZ}
                          onChange={handleChange1}
                          name="PEMBANGUNAN_MARKAZ"
                        />
                      }
                      // value="PEMBANGUNAN_MARKAZ"
                      label="Pembangunan Markaz"
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={RENOVASI}
                          onChange={handleChange2}
                          name="RENOVASI"
                        />
                      }
                      // value="RENOVASI"
                      label="Renovasi"
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={PENAMBAHAN_FASILITAS}
                          onChange={handleChange3}
                          name="PENAMBAHAN_FASILITAS"
                        />
                      }
                      // value="PENAMBAHAN_FASILITAS"
                      label="Penambahan Fasilitas"
                    />
                  </FormGroup>
                </FormControl>
              </AccordionDetails>
            </Accordion>
            )}
          </Drawer>
        )
      }
    </>
  );
}
