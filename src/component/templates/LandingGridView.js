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
    variant,
    data,
    size,
    page,
    setPage,
    markazOrSantri,
    intr1Butt,
    detail,
    handleDelete,
    type,
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
      {type === "open" ? (
        <Typography>
          <b style={{ color: "#004F5D" }}>
            Daftar Program Relawan<br />
            <br />
          </b>
        </Typography>
      ) : (
        <Typography>
          <b style={{ color: "#004F5D" }}>
            Kegiatan Relawan Sebelumnya
            <br />
            <br />
          </b>
        </Typography>
      )}
      <Grid sx={{ p: 1 }}>
        <GridView {...props} data={data} />
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
