import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import Link from "@mui/material/Link";
import Popover from "./Dialog";

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
    uniqueid,
    iddonasi,
    transid,
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
          <Button
            variant="outlined"
            onClick={() => router.push(`/admin/${santriormarkaz}/edit/${id}`)}
          >
            edit
          </Button>
          <Button variant="outlined" onClick={() => handleDelete(id)}>
            delete
          </Button>
        </>
      );
    } else if (santriormarkaz === "donasi") {
      return (
        <>
          <Button
            variant="outlined"
            onClick={() => router.push(`${iddonasi}/transaksi/${uniqueid}`)}
          >
            manage
          </Button>
          <Button
            variant="outlined"
            onClick={() => router.push(`edit/${iddonasi}`)}
          >
            Edit
          </Button>
        </>
      );
    } else if (santriormarkaz === "transaksi") {
      return (
        <>
          <Popover transid={transid} mutate={mutate} isStatus />
          <Link href={paymenturl} target="_blank" underline="none">
            <Button variant="outlined">download</Button>
          </Link>
        </>
      );
    } else if (santriormarkaz === "kegiatan") {
      return (
        <>
          <Button variant="outlined" onClick={() => router.push(`edit/${id}`)}>
            edit
          </Button>
          <Button
            variant="outlined"
            onClick={() => router.push(`volunteer/${id}`)}
          >
            manage
          </Button>
        </>
      );
    } else if (santriormarkaz === "volunteer") {
      return (
        <>
          <Popover transid={transid} mutate={mutate} isStatus />
          <Popover transid={transid} mutate={mutate} isDownloadVolunteer />
        </>
      );
    } else {
      
      return "buttons";
    }
  }

  return (
    <StyledTableRow>
      <StyledTableCell component="th" scope="row">
        <Link data-testid="name-at-table-row" href={`/${detail}/` + id}>
          {nama}
        </Link>
      </StyledTableCell>
      <StyledTableCell align="left">{markaz}</StyledTableCell>
      <StyledTableCell align="left">{domisili}</StyledTableCell>
      <StyledTableCell align="left">{kelamin}</StyledTableCell>
      <StyledTableCell align="left">{tanggal}</StyledTableCell>
      <StyledTableCell align="left">
        {santriormarkaz === "santri" || santriormarkaz === "markaz" ? (
          <Button
            variant="outlined"
            onClick={() => router.push(`/admin/${santriormarkaz}/donasi/${id}`)}
          >
            Lihat Daftar
          </Button>
        ) : null}
      </StyledTableCell>
      <StyledTableCell align="center">
        <TableButtons />
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default TableDataRow;
