import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#004f5d',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const action = <Button variant="outlined">Primary</Button>;

export default function CustomizedTables(props) {

  const{children} = props;
  
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
          {children}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
