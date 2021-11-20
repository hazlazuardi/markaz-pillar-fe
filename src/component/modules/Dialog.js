import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { axiosMain } from "../../axiosInstances";
import Router from "next/router";

const status_list = [
  "MENUNGGU_KONFIRMASI",
  "DONASI_DITOLAK",
  "DONASI_DITERIMA",
];

function SimpleDialog(props) {
  const { onClose, selectedValue, open, idtrans, apiCall, id, status, mutate } =
    props;

  const [loading, setLoading] = useState(true);

  const handleClose = () => {
    onClose(selectedValue);
  };

  // console.log(status, "id uwu");
  const handleChangeStatus = async () => {
    setLoading(true);
    apiCall(id, status)
      .then((res) => {
        setLoading(false);
      })
      .catch((e) => {
        if (e.response.data.status === 401) {
          localStorage.clear();
        }
      });
    onClose(true);
    Router.reload();
    // mutate();
  };

  function statusConverter(status) {
    if (status === "DONASI_DITERIMA") {
      return "Donasi Diterima";
    } else if (status === "MENUNGGU_KONFIRMASI") {
      return "Menunggu Konfirmasi";
    } else if (status === "DONASI_DITOLAK") {
      return "Donasi Ditolak";
    }
  }

  useEffect(() => {
    setLoading(false);
  }, [handleChangeStatus, loading]);
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set Status</DialogTitle>
      <List sx={{ pt: 0 }}>
        {status_list.map((status) => (
          <ListItem
            button
            onClick={() => handleChangeStatus(idtrans, status)}
            // key={email}
          >
            <ListItemText primary={statusConverter(status)} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function DialogTrans(props) {
  const { transid, isStatus, isDownloadVolunteer } = props;
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(status_list[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {isStatus && "Status"}
        {isDownloadVolunteer && "Download"}
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        idtrans={transid}
        {...props}
      />
    </div>
  );
}
