import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { axiosMain } from "../../axiosInstances";
import Router from "next/router";

const status_list = [
  "MENUNGGU_KONFIRMASI",
  "DONASI_DITOLAK",
  "DONASI_DITERIMA",
];

function SimpleDialog(props) {
  const { onClose, selectedValue, open, idtrans } = props;

  const [loading, setLoading] = useState(true);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleChangeStatus = async (id, Status) => {
    setLoading(true);
    await axiosMain
      .post(`/admin/transaction/status?id=${id}`, {
        status: `${Status}`,
      })
      .then((res) => {
        setLoading(false);
      });
    onClose(true);
    Router.reload();
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
  const { transid } = props;
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
        Status
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        idtrans={transid}
      />
    </div>
  );
}