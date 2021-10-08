import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#004f5d',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.white,
  },
  '&:nth-of-type(even)': {
    backgroundColor: 'rgba(0,79,93,0.06)',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein, action) {
  return { name, calories, fat, carbs, protein, action};
}

const action = 'edit'+' delete';

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, action),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, action),
  createData('Eclair', 262, 16.0, 24, 6.0, action),
  createData('Cupcake', 305, 3.7, 67, 4.3, action),
  createData('Gingerbread', 356, 16.0, 49, 3.9, action),
];

export default function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Nama</StyledTableCell>
            <StyledTableCell align="left">Tempat Markaz</StyledTableCell>
            <StyledTableCell align="left">Domisili</StyledTableCell>
            <StyledTableCell align="left">Jenis Kelamin</StyledTableCell>
            <StyledTableCell align="left">Tanggal Lahir</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
              <StyledTableCell align="left">{row.calories}</StyledTableCell>
              <StyledTableCell align="left">{row.fat}</StyledTableCell>
              <StyledTableCell align="left">{row.carbs}</StyledTableCell>
              <StyledTableCell align="left">{row.protein}</StyledTableCell>
              <StyledTableCell align="center">{row.action}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
