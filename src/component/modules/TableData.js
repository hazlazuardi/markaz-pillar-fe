import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#004f5d",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


export default function CustomizedTables(props) {
  const {
    children,
    tableTempatMarkaz,
    tableDomisili,
    tableJenisKelamin,
    tableTanggalLahir,
    santriormarkaz,
  } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Nama</StyledTableCell>
            <StyledTableCell align="left">{tableTempatMarkaz}</StyledTableCell>
            <StyledTableCell align="left">{tableDomisili}</StyledTableCell>
            <StyledTableCell align="left">{tableJenisKelamin}</StyledTableCell>
            <StyledTableCell align="left">{tableTanggalLahir}</StyledTableCell>
            <StyledTableCell align="left">
              {santriormarkaz === "markaz" || santriormarkaz === "santri"
                ? "Daftar Donasi"
                : null}
            </StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
}
