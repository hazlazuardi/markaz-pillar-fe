import React from "react";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const status_list = [
  "MENUNGGU_KONFIRMASI",
  "DONASI_DITOLAK",
  "DONASI_DITERIMA",
  "PENDAFTARAN_DITOLAK",
  "PENDAFTARAN_DITERIMA",
  "KEGIATAN_DIBUKA",
  "KEGIATAN_DITUTUP",
  "KEGIATAN_SELESAI",
];

const transaksi_status_list = [
  "MENUNGGU_KONFIRMASI",
  "DONASI_DITOLAK",
  "DONASI_DITERIMA",
];

const volunteer_status_list = [
  "MENUNGGU_KONFIRMASI",
  "PENDAFTARAN_DITOLAK",
  "PENDAFTARAN_DITERIMA",
];

const kegiatan_status_list = [
  "KEGIATAN_DIBUKA",
  "KEGIATAN_DITUTUP",
  "KEGIATAN_SELESAI",
];

const download_list = ["cvURL", "essayURL", "pictureURL"];

function SimpleDialog(props) {
  const {
    onClose,
    selectedValue,
    open,
    apiCall,
    id,
    mutate,
    dialogType,
    trxId,
    isStatus,
    isDownloadVolunteer,
    userdata,
  } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleChangeStatus = async (idF, statusF) => {
    apiCall(idF, statusF)
      .then((res) => {
        mutate();
      })
      .catch((e) => {
        if (e.response.data.status === 401) {
          localStorage.clear();
        }
      });
    onClose(true);
  };

  // const handleDownload = async (download) => {
  //   return router.push(`${userdata.download}`);
  // };

  function transaksiStatusConverter(field) {
    if (field === "DONASI_DITERIMA") {
      return "Donasi Diterima";
    } else if (field === "MENUNGGU_KONFIRMASI") {
      return "Menunggu Konfirmasi";
    } else if (field === "DONASI_DITOLAK") {
      return "Donasi Ditolak";
    }
  }

  function volunteerStatusConverter(field) {
    if (field === "MENUNGGU_KONFIRMASI") {
      return "Menunggu Konfirmasi";
    } else if (field === "PENDAFTARAN_DITOLAK") {
      return "Pendaftaran Ditolak";
    } else if (field === "PENDAFTARAN_DITERIMA") {
      return "Pendaftaran Diterima";
    }
  }

  function kegiatanStatusConverter(field) {
    if (field === "KEGIATAN_DIBUKA") {
      return "Kegiatan Dibuka";
    } else if (field === "KEGIATAN_DITUTUP") {
      return "Kegiatan Ditutup";
    } else if (field === "KEGIATAN_SELESAI") {
      return "Kegiatan Selesai";
    }
  }

  const DialogList = () => {
    if (dialogType === "statusVolunteer" && isStatus) {
      {
        return (
          <List sx={{ pt: 0 }}>
            {volunteer_status_list.map((statusL) => (
              <ListItem
                button
                id="statusChange"
                onClick={() => handleChangeStatus(id, statusL)}
              >
                <ListItemText primary={volunteerStatusConverter(statusL)} />
              </ListItem>
            ))}
          </List>
        );
      }
    } else if (dialogType === "statusTransaksi" && isStatus) {
      return (
        <List sx={{ pt: 0 }}>
          {transaksi_status_list.map((statusL) => (
            <ListItem button onClick={() => handleChangeStatus(trxId, statusL)}>
              <ListItemText primary={transaksiStatusConverter(statusL)} />
            </ListItem>
          ))}
        </List>
      );
    } else if (dialogType === "statusKegiatan" && isStatus) {
      return (
        <List sx={{ pt: 0 }}>
          {kegiatan_status_list.map((statusL) => (
            <ListItem button onClick={() => handleChangeStatus(id, statusL)}>
              <ListItemText primary={kegiatanStatusConverter(statusL)} />
            </ListItem>
          ))}
        </List>
      );
    } else if (dialogType === "statusVolunteer" && isDownloadVolunteer) {
      return (
        <List sx={{ pt: 0 }}>
          <Link href={userdata.cvURL} target="_blank" underline="none">
            <ListItem button>
              <ListItemText primary="CV" />
            </ListItem>
          </Link>
          <Link href={userdata.essayURL} target="_blank" underline="none">
            <ListItem button>
              <ListItemText primary="Essay" />
            </ListItem>
          </Link>
          <Link href={userdata.pictureURL} target="_blank" underline="none">
            <ListItem button>
              <ListItemText primary="Picture" />
            </ListItem>
          </Link>
        </List>
      );
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      {isStatus && <DialogTitle>Set Status</DialogTitle>}
      {isDownloadVolunteer && <DialogTitle>Download</DialogTitle>}
      {DialogList()}
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function DialogTrans(props) {
  const { dialogButtons, tooltip } = props;
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
      <Tooltip title={tooltip}>
        <IconButton aria-label="dialog-button" onClick={handleClickOpen}>
          {dialogButtons}
        </IconButton>
      </Tooltip>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        {...props}
      />
    </div>
  );
}
