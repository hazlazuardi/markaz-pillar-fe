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
import Radio from "@mui/material/Radio";
import { Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RadioGroup from "@mui/material/RadioGroup";
import { Box } from "@mui/system";
import { FormControl } from "@mui/material";

export default function FilterSantri(props) {
  const { setSort, filter } = props;

  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(true);
  const anchorRef = React.useRef(null);
  const [value, setValue] = React.useState("");

  const handleChangeSort = (event) => {
    // setChecked(event.target.checked);
    setValue(event.target.value);
    if (value === "desc") {
      setSort(filter.sort[0]);
    } else if (value === "asc") {
      setSort(filter.sort[1]);
    }
  };

  const handleChangeAge = (event) => {
    // setChecked(event.target.checked);
    setValue(event.target.value);
    if (value === "desc") {
      setSort(filter.age[0]);
    } else if (value === "asc") {
      setSort(filter.age[1]);
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
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
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
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Urutkan Umur</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <FormControl component="fieldset">
                        <RadioGroup value={value} onChange={handleChangeAge}>
                          <FormControlLabel
                            control={<Radio />}
                            value="asc"
                            label="Termuda"
                          />
                          <FormControlLabel
                            control={<Radio />}
                            value="desc"
                            label="Tertua"
                          />
                        </RadioGroup>
                      </FormControl>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography>Urutkan Nama</Typography>
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
                </Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
