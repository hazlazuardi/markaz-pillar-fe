import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import Link from 'next/link'
import Dialog from "./Dialog";
import ButtonGroup from "@mui/material/ButtonGroup";

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
          <Button
            variant="outlined"
            onClick={() => router.push(`/admin/${santriormarkaz}/${id}/edit`)}
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
          <Link href={{
            pathname: `donasi/${iddonasi}/transaksi`,
            query: { ...router.query }
          }} passHref >
            <Button
              variant="outlined"
            // onClick={() => router.push(`${iddonasi}/transaksi/${uniqueid}`)}
            >
              manage
            </Button>
          </Link>
          <Link href={{
            pathname: `donasi/${iddonasi}/edit`,
            query: { ...router.query }
          }} passHref >
            <Button
              variant="outlined"
            // onClick={() => router.push(`donasi/${iddonasi}/edit`)} {`donasi/${donasi_id}/edit`} 
            >
              Edit
            </Button>
          </Link>
        </>
      );
    } else if (santriormarkaz === "transaksi") {
      return (
        <>
          <Dialog mutate={mutate} isStatus {...props} />
          <Link passHref href={paymenturl} target="_blank" underline="none">
            <Button variant="outlined">download</Button>
          </Link>
        </>
      );
    } else if (santriormarkaz === "kegiatan") {
      return (
        <>
          <Button variant="outlined" onClick={() => router.push(`/admin/kegiatan/${id}/edit`)}>
            edit
          </Button>
          <Button
            variant="outlined"
            onClick={() => router.push(`/admin/kegiatan/${id}/relawan`)}
          >
            manage
          </Button>
        </>
      );
    } else if (santriormarkaz === "volunteer") {
      return (
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Dialog mutate={mutate} isStatus {...props} />
          <Dialog mutate={mutate} isDownloadVolunteer {...props} />
        </ButtonGroup>
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
      {!!tanggal && <StyledTableCell align="left">{tanggal}</StyledTableCell>}
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
      <StyledTableCell align="center">
        <TableButtons />
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default TableDataRow;
