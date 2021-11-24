import { Container, Typography } from "@mui/material";
import GridView from "./admin/GridView";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  style,
  Select,
  Stack,
  useMediaQuery,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

export default function LandingGridView(props) {
  const {
    data,
    size,
    page,
    setPage,
    markazOrSantri,
    intr1Butt,
    detail,
    handleDelete,
  } = props;

  // *******************************************************
  // Pagination
  // *******************************************************
  const matchXs = useMediaQuery("(max-width:600px)");
  const [doAnimateHeight, setDoAnimateHeight] = useState(false);

  const handlePagination = useCallback(
    (event, value) => {
      setPage(value);
      // disable it until API Calls done
      setDoAnimateHeight(false);
    },
    [setPage]
  );

  return (
    <Container>
      <Typography>
        <b style={{ color: "#004F5D" }}>
          Daftar Program Relawan <br />
          <br />
        </b>
      </Typography>
      <Grid sx={{ p: 1}}>
        <GridView data={data} />
      </Grid>
      {/* Pagination */}
      {!!data && data.totalElement !== 0 && (
        <Stack sx={{ bottom: "0em" }} spacing={2} alignItems="center">
          <Pagination
            data-testid="pagination-at-admin-or-user-template"
            size={size}
            boundaryCount={1}
            count={data.totalPage}
            page={page}
            onChange={handlePagination}
          />
        </Stack>
      )}
    </Container>
  );
}
