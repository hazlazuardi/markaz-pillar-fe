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
    setStatusFilter1,
    setStatusFilter2,
    setStatusFilter3,
    setStatusProfile1,
    setStatusProfile2,
    setStatusProfile3,
    locationFilter,
    setLocationFilter,
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

  const [status, setStatus] = React.useState({
    MENUNGGU_KONFIRMASI: false,
    PENDAFTARAN_DITERIMA: false,
    PENDAFTARAN_DITOLAK: false,
  });

  const [statusProfile, setStatusProfile] = React.useState({
    MENUNGGU_KONFIRMASI: false,
    DITERIMA: false,
    DITOLAK: false,
  });

  const handleChangeLocation = (event) => {
    setLocationFilter(event.target.value);
    mutate();
  };

  const handleChangeStatusProfile1 = (event) => {
    setStatus({
      ...status,
      [event.target.name]: event.target.checked,
    });
    if (event.target.checked) {
      setStatusProfile1(event.target.name);
    } else {
      setStatusProfile1("");
    }
    mutate();
  };

  const handleChangeStatusProfile2 = (event) => {
    setStatus({
      ...status,
      [event.target.name]: event.target.checked,
    });
    if (event.target.checked) {
      setStatusProfile2(event.target.name);
    } else {
      setStatusProfile2("");
    }
    mutate();
  };

  const handleChangeStatusProfile3 = (event) => {
    setStatus({
      ...status,
      [event.target.name]: event.target.checked,
    });
    if (event.target.checked) {
      setStatusProfile3(event.target.name);
    } else {
      setStatusProfile3("");
    }
    mutate();
  };

  const handleChangeStatus1 = (event) => {
    setStatus({
      ...status,
      [event.target.name]: event.target.checked,
    });
    if (event.target.checked) {
      setStatusFilter1(event.target.name);
    } else {
      setStatusFilter1("");
    }
    mutate();
  };

  const handleChangeStatus2 = (event) => {
    setStatus({
      ...status,
      [event.target.name]: event.target.checked,
    });
    if (event.target.checked) {
      setStatusFilter2(event.target.name);
    } else {
      setStatusFilter2("");
    }
    mutate();
  };

  const handleChangeStatus3 = (event) => {
    setStatus({
      ...status,
      [event.target.name]: event.target.checked,
    });
    if (event.target.checked) {
      setStatusFilter3(event.target.name);
    } else {
      setStatusFilter3("");
    }
    mutate();
  };

  const handleChangeCategory1 = (event) => {
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

  const handleChangeCategory2 = (event) => {
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

  const handleChangeCategory3 = (event) => {
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
  const { MENUNGGU_KONFIRMASI, PENDAFTARAN_DITERIMA, PENDAFTARAN_DITOLAK, DITERIMA, DITOLAK } =
    status;

  // const { MENUNGGU_KONFIRMASI, DITERIMA, DITOLAK } = statusProfile;

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
            {variant === "kegiatan" || variant === "santri" ? (
              <FormControlLabel
                control={<Radio />}
                value={element.labels[2].value}
                label={element.labels[2].label}
              />
            ) : null}
            {variant === "santri" ? (
              <FormControlLabel
                control={<Radio />}
                value={element.labels[3].value}
                label={element.labels[3].label}
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

                      {(variant === "relawan" || variant === "profile") ? (null):(accordionFilter)}
                      {variant === "markaz" && (
                        <>
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
                                  value={locationFilter}
                                  onChange={handleChangeLocation}
                                >
                                  <FormControlLabel
                                    control={<Radio />}
                                    value=""
                                    label="Semua Lokasi"
                                  />
                                  <FormControlLabel
                                    control={<Radio />}
                                    value="true"
                                    label="Jabodetabek"
                                  />
                                  <FormControlLabel
                                    control={<Radio />}
                                    value="false"
                                    label="Luar Jabodetabek"
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
                              <FormControl
                                component="fieldset"
                                variant="standard"
                              >
                                <FormGroup>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={PEMBANGUNAN_MARKAZ}
                                        onChange={handleChangeCategory1}
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
                                        onChange={handleChangeCategory2}
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
                                        onChange={handleChangeCategory3}
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
                        </>
                      )}
                      {variant === "relawan" && (
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography>Status</Typography>
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
                                      checked={MENUNGGU_KONFIRMASI}
                                      onChange={handleChangeStatus1}
                                      name="MENUNGGU_KONFIRMASI"
                                    />
                                  }
                                  // value="PEMBANGUNAN_MARKAZ"
                                  label="Menunggu Konfirmasi"
                                />

                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={PENDAFTARAN_DITERIMA}
                                      onChange={handleChangeStatus2}
                                      name="PENDAFTARAN_DITERIMA"
                                    />
                                  }
                                  // value="RENOVASI"
                                  label="Pendaftaran Diterima"
                                />

                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={PENDAFTARAN_DITOLAK}
                                      onChange={handleChangeStatus3}
                                      name="PENDAFTARAN_DITOLAK"
                                    />
                                  }
                                  // value="PENAMBAHAN_FASILITAS"
                                  label="Pendaftaran Ditolak"
                                />
                              </FormGroup>
                            </FormControl>
                          </AccordionDetails>
                        </Accordion>
                      )}
                      {variant === "profile" && (
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography>Status</Typography>
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
                                      checked={MENUNGGU_KONFIRMASI}
                                      onChange={handleChangeStatusProfile1}
                                      name="MENUNGGU_KONFIRMASI"
                                    />
                                  }
                                  // value="PEMBANGUNAN_MARKAZ"
                                  label="Menunggu Konfirmasi"
                                />

                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={DITERIMA}
                                      onChange={handleChangeStatusProfile2}
                                      name="DITERIMA"
                                    />
                                  }
                                  // value="RENOVASI"
                                  label="Diterima"
                                />

                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={DITOLAK}
                                      onChange={handleChangeStatusProfile3}
                                      name="DITOLAK"
                                    />
                                  }
                                  // value="PENAMBAHAN_FASILITAS"
                                  label="Ditolak"
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
            {(variant === "relawan" || variant === "profile") ? (null):(accordionFilter)}
            {variant === "markaz" && (
              <>
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
                        value={locationFilter}
                        onChange={handleChangeLocation}
                      >
                        <FormControlLabel
                          control={<Radio />}
                          value=""
                          label="Semua Lokasi"
                        />
                        <FormControlLabel
                          control={<Radio />}
                          value="true"
                          label="Jabodetabek"
                        />
                        <FormControlLabel
                          control={<Radio />}
                          value="false"
                          label="Luar Jabodetabek"
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
                    <FormControl component="fieldset" variant="standard">
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={PEMBANGUNAN_MARKAZ}
                              onChange={handleChangeCategory1}
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
                              onChange={handleChangeCategory2}
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
                              onChange={handleChangeCategory3}
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
              </>
            )}
            {variant === "relawan" && (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Status</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormControl component="fieldset" variant="standard">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={MENUNGGU_KONFIRMASI}
                            onChange={handleChangeStatus1}
                            name="MENUNGGU_KONFIRMASI"
                          />
                        }
                        // value="PEMBANGUNAN_MARKAZ"
                        label="Menunggu Konfirmasi"
                      />

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={PENDAFTARAN_DITERIMA}
                            onChange={handleChangeStatus2}
                            name="PENDAFTARAN_DITERIMA"
                          />
                        }
                        // value="RENOVASI"
                        label="Pendaftaran Diterima"
                      />

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={PENDAFTARAN_DITOLAK}
                            onChange={handleChangeStatus3}
                            name="PENDAFTARAN_DITOLAK"
                          />
                        }
                        // value="PENAMBAHAN_FASILITAS"
                        label="Pendaftaran Ditolak"
                      />
                    </FormGroup>
                  </FormControl>
                </AccordionDetails>
              </Accordion>
            )}
            {variant === "profile" && (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Status</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormControl component="fieldset" variant="standard">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={MENUNGGU_KONFIRMASI}
                            onChange={handleChangeStatusProfile1}
                            name="MENUNGGU_KONFIRMASI"
                          />
                        }
                        // value="PEMBANGUNAN_MARKAZ"
                        label="Menunggu Konfirmasi"
                      />

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={DITERIMA}
                            onChange={handleChangeStatusProfile2}
                            name="DITERIMA"
                          />
                        }
                        // value="RENOVASI"
                        label="Diterima"
                      />

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={DITOLAK}
                            onChange={handleChangeStatusProfile3}
                            name="DITOLAK"
                          />
                        }
                        // value="PENAMBAHAN_FASILITAS"
                        label="Ditolak"
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
