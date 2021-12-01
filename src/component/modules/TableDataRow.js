import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import Link from "next/link";
import Dialog from "./Dialog";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DownloadIcon from "@mui/icons-material/Download";
import ListIcon from "@mui/icons-material/List";
import Tooltip from "@mui/material/Tooltip";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#004f5d",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.white,
  },
  "&:nth-of-type(even)": {
    backgroundColor: "rgba(0,79,93,0.06)",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function TableDataRow(props) {
  const {
    id,
    nama,
    markaz,
    domisili,
    kelamin,
    tanggal,
    santriormarkaz,
    detail,
    iddonasi,
    paymenturl,
    handleDelete,
    mutate,
  } = props;
  const router = useRouter();

  function TableButtons() {
    if (
      santriormarkaz === "santri" ||
      santriormarkaz === "markaz" ||
      santriormarkaz === "pengguna"
    ) {
      return (
        <>
          <IconButton
            onClick={() => router.push(`/admin/${santriormarkaz}/${id}/edit`)}
          >
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(id)}>
            <DeleteIcon />
          </IconButton>
        </>
      );
    } else if (santriormarkaz === "donasi") {
      return (
        <>
          <Link
            href={{
              pathname: `donasi/${iddonasi}/transaksi`,
              query: { ...router.query },
            }}
            passHref
          >
            <IconButton>
              <ListIcon />
            </IconButton>
          </Link>
          <Link
            href={{
              pathname: `donasi/${iddonasi}/edit`,
              query: { ...router.query },
            }}
            passHref
          >
            <IconButton>
              <EditIcon />
            </IconButton>
          </Link>
        </>
      );
    } else if (santriormarkaz === "transaksi") {
      return (
        <>
          <Dialog
            mutate={mutate}
            isStatus
            dialogButtons={<MoreVertIcon />}
            {...props}
          />
          <IconButton
            passHref
            href={paymenturl}
            target="_blank"
            underline="none"
          >
            <DownloadIcon />
          </IconButton>
        </>
      );
    } else if (santriormarkaz === "kegiatan") {
      return (
        <>
          <Dialog
            mutate={mutate}
            isStatus
            dialogButtons={<MoreVertIcon />}
            {...props}
          />
          <IconButton onClick={() => router.push(`/admin/kegiatan/${id}/edit`)}>
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => router.push(`/admin/kegiatan/${id}/relawan`)}
          >
            <ListIcon />
          </IconButton>
        </>
      );
    } else if (santriormarkaz === "volunteer") {
      return (
        <>
          <Tooltip title="Change Status">
            <Dialog
              mutate={mutate}
              isStatus
              dialogButtons={<MoreVertIcon />}
              {...props}
            />
          </Tooltip>
          <Dialog
            mutate={mutate}
            isDownloadVolunteer
            dialogButtons={<DownloadIcon />}
            {...props}
          />
        </>
      );
    } else {
      return "buttons";
    }
  }

  return (
    <StyledTableRow>
      <StyledTableCell component="th" scope="row">
        <Link data-testid="name-at-table-row" href={`${detail}/` + id}>
          {nama}
        </Link>
      </StyledTableCell>
      <StyledTableCell align="left">{markaz}</StyledTableCell>
      <StyledTableCell align="left">{domisili}</StyledTableCell>
      <StyledTableCell align="left">{kelamin}</StyledTableCell>
      {!!tanggal && (
        <StyledTableCell id="tableCellFive" align="left">
          {tanggal}
        </StyledTableCell>
      )}
      {santriormarkaz === "santri" || santriormarkaz === "markaz" ? (
        <StyledTableCell align="left">
          <Button
            variant="outlined"
            onClick={() => router.push(`/admin/${santriormarkaz}/${id}/donasi`)}
          >
            Lihat Daftar
          </Button>
        </StyledTableCell>
      ) : null}
      <StyledTableCell align="center" width="auto">
        <TableButtons />
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default TableDataRow;
