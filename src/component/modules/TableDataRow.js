import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import Link from "@mui/material/Link";

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

const TableDataRow = (props) => {
  const {
    id,
    nama,
    markaz,
    domisili,
    kelamin,
    tanggal,
    santriormarkaz,
    detail,
  } = props;
  const router = useRouter();
  return (
    <StyledTableRow>
      <StyledTableCell component="th" scope="row">
        <Link data-testid='name-at-table-row' href={`/${detail}/` + id}>{nama}</Link>
      </StyledTableCell>
      <StyledTableCell align="left">{markaz}</StyledTableCell>
      <StyledTableCell align="left">{domisili}</StyledTableCell>
      <StyledTableCell align="left">{kelamin}</StyledTableCell>
      <StyledTableCell align="left">{tanggal}</StyledTableCell>
      <StyledTableCell align="center">
        <Button
          variant="outlined"
          onClick={() => router.push(`/admin/${santriormarkaz}/edit/${id}`)}
        >
          edit
        </Button>
        <Button
          variant="outlined"
          onClick={() => router.push(`/admin/${santriormarkaz}/delete/${id}`)}
        >
          delete
        </Button>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default TableDataRow;
