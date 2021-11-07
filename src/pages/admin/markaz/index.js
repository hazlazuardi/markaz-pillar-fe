import { useCallback, useEffect, useState } from "react";
import GridView from "../../../component/templates/admin/admin-grid";
import TableView from "../../../component/templates/admin/admin-table";
import FilterMarkaz from "../../../component/modules/FilterMarkaz";
import FilterMarkazMobile from "../../../component/modules/FilterMarkazMobile";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Link from "@mui/material/Link";
import { axiosMain } from "../../../axiosInstances";
import useSWR from "swr";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {
  AppBar,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Tab,
  useMediaQuery,
} from "@mui/material";
import { FilterList } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useTheme } from "@mui/material/styles";
import SwipeableViews from "react-swipeable-views";
import { SwipeableEnableScroll } from "../../../component/SwipeableEnableScroll";

const fetcher = (url) => axiosMain.get(url).then((res) => res.data);

export default function AdminMarkaz() {
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(10);
  const [doAnimateHeight, setDoAnimateHeight] = useState(true);
  const {
    data: markazs,
    error,
    mutate,
  } = useSWR(`/markaz/search?page=${page - 1}&n=${entries}`, fetcher);

  // *******************************************************
  // Filter
  // *******************************************************

  // const {
  //   data: allMarkaz,
  //   error,
  //   mutate,
  // } = useSWR(
  //   `/markaz/search?${!!locationFilter ? "address=" + locationFilter : ""}${
  //     !!nameFilter ? "sortedName=" + nameFilter : ""
  //   }${!!categoryFilter ? "category=" + categoryFilter : ""}${
  //     !!categoryFilter2 ? "&category=" + categoryFilter2 : ""
  //   }${!!categoryFilter3 ? "&category=" + categoryFilter3 : ""}`,
  //   fetcher
  // );

  // useEffect(() => {
  //   mutate();
  // }, [locationFilter, nameFilter]);

  // *******************************************************
  // Delete
  // *******************************************************
  const handleDelete = async (id) => {
    await axiosMain
      .delete(`/admin/markaz?id=${id}`)
      .then((response) => {
        mutate();
      })
      .catch((e) => {
        if (e.response.data.status === 401) {
          localStorage.clear();
        }
      });
  };

  // *******************************************************
  // Search
  // *******************************************************
  const handleSearch = ({ target }) => {
    const search = target.value;
    markazs.results &&
      markazs.result.filter((markaz) => {
        if (
          search === "" ||
          markaz.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return markaz;
        }
      });
  };

  // *******************************************************
  // Show Entries
  // *******************************************************
  const handleChangeEntries = useCallback((event) => {
    setEntries(event.target.value);
    setPage(1);
    // disable it until API Calls done
    setDoAnimateHeight(false);
  }, []);

  // *******************************************************
  // Pagination
  // *******************************************************
  const matchXs = useMediaQuery("(max-width:600px)");
  const handlePagination = (event, value) => {
    setPage(value);
    // disable it until API Calls done
    setDoAnimateHeight(false);
  };

  // *******************************************************
  // Tabs
  // *******************************************************
  const theme = useTheme();
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabIndex = (event, tab) => {
    setTabIndex(tab);
    setDoAnimateHeight(false);
  };
  const handleChangeTabIndex = (tab) => {
    setTabIndex(tab);
    setDoAnimateHeight(false);
  };

  useEffect(() => {
    return () => {
      setDoAnimateHeight(true);
    };
  }, [entries, page, tabIndex]);
  if (error) return "An error has occurred.";
  if (!markazs) return "Loading...";
  return (
    <>
      {/* Header */}
      <Typography variant="h4" color="initial">
        Daftar Markaz
      </Typography>
      <TextField
        data-testid="searchbar-at-admin-markaz"
        label="Cari Markaz"
        placeholder="Markaz Depok"
        onChange={handleSearch}
        margin="normal"
        fullWidth
        size="small"
      />
      <Chip
        data-testid="filterChipButton-at-admin-markaz"
        label="Filter"
        icon={
          <FilterMarkaz
            // locationFilter={locationFilter}
            // setLocationFilter={setLocationFilter}
            // nameFilter={nameFilter}
            // setNameFilter={setNameFilter}
            // categoryFilter={categoryFilter}
            // setCategoryFilter={setCategoryFilter}
            // categoryFilter2={categoryFilter2}
            // setCategoryFilter2={setCategoryFilter2}
            // categoryFilter3={categoryFilter3}
            // setCategoryFilter3={setCategoryFilter3}
            // mutate={mutate}
          />
        }
      />
      <TabContext value={tabIndex}>
        <AppBar position="relative" color="transparent" elevation={0}>
          <TabList onChange={handleTabIndex}>
            <Tab
              data-testid="tab-grid-at-admin-markaz"
              label="Grid"
              value={0}
            />
            <Tab
              data-testid="tab-table-at-admin-markaz"
              label="Table"
              value={1}
            />
          </TabList>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={tabIndex}
          onChangeIndex={handleChangeTabIndex}
          animateHeight={doAnimateHeight}
          ignoreNativeScroll
        >
          <TabPanel
            data-testid="gridView-at-admin-markaz"
            value={tabIndex}
            index={0}
            dir={theme.direction}
          >
            <GridView
              data={markazs}
              detail="admin/markaz"
              handleDelete={handleDelete}
            />
          </TabPanel>
          <TabPanel
            data-testid="tableView-at-admin-markaz"
            value={tabIndex}
            index={1}
            dir={theme.direction}
          >
            <SwipeableEnableScroll>
              <TableView
                data={markazs}
                detail="admin/markaz"
                handleDelete={handleDelete}
              />
            </SwipeableEnableScroll>
          </TabPanel>
        </SwipeableViews>
      </TabContext>
      {/* Pagination */}
      <Stack sx={{ bottom: "0em" }} spacing={2} alignItems="center">
        <FormControl fullWidth sx={{ m: "1em", maxWidth: 375 }}>
          <InputLabel id="entries-select-label">Show Entries</InputLabel>
          <Select
            data-testid="showEntries-at-admin-markaz"
            labelId="entries-select-label"
            id="entries-select"
            value={entries}
            label="Show Entries"
            onChange={handleChangeEntries}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
        <Pagination
          data-testid="pagination-at-admin-markaz"
          size={matchXs ? "small" : "medium"}
          boundaryCount={1}
          count={markazs.totalPage}
          page={page}
          onChange={handlePagination}
        />
      </Stack>
      <Link href="markaz/create" underline="none">
        <Fab
          data-testid="fab-at-admin-markaz"
          sx={{ position: "fixed", right: "2em", bottom: "3em" }}
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
      </Link>
    </>
  );
}
