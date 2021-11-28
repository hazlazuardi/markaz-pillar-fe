import React, { useCallback, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
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
    setLocationFilter,
    setNameFilter,
    mutate,
    variant,
    size,
    FilterRadioObject,
  } = props;

  const [checked, setChecked] = React.useState();

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

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenDrawer(false);
    } else if (event.key === "Escape") {
      setOpenDrawer(false);
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
  const CategoryAccordionMarkaz = useCallback((event) => {
    return (
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
    );
  }, []);

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
            {variant === "kegiatan" || variant === "volunteer" ? (<FormControlLabel
              control={<Radio />}
              value={element.labels[2].value}
              label={element.labels[2].label}
            />) : (null)}
          </RadioGroup>
        </FormControl>
      </AccordionDetails>
    </Accordion>
  ));

  return (
    <>
      <Button
        variant="text"
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
      >
        <Chip
          data-testid="filterChipButton-at-admin-or-user-template"
          label="Filter"
          icon={<FilterList />}
          onClick={toggleDrawer(true)}
        />
      </Button>

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
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <Typography variant="h6" ml={2}>
                        Filter
                      </Typography>

                      {accordionFilter}
                      {variant === "markaz" && <CategoryAccordionMarkaz />}
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
            {variant === "markaz" && <CategoryAccordionMarkaz />}
          </Drawer>
        )
      }
    </>
  );
}
